const SB_URL='https://xdbnwojiwrjsoxmzuosu.supabase.co',SB_KEY='sb_publishable_MS66GND3YbXJ-31KUwdDmA_DDviTf4F';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let token=localStorage.getItem('ma_token'), business=null, businessId=null, plan=null, license=null, services=[], professionals=[];
const hdr=()=>({apikey:SB_KEY,Authorization:`Bearer ${token||SB_KEY}`,'Content-Type':'application/json'});
async function req(path,opt={}){const r=await fetch(`${SB_URL}/${path}`,{...opt,headers:{...hdr(),...(opt.headers||{})}});const t=await r.text();if(!r.ok)throw new Error(t||'Erro');return t?JSON.parse(t):null}
async function login(email,password){const r=await fetch(`${SB_URL}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:SB_KEY,'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok)throw new Error('E-mail ou senha inválidos.');token=d.access_token;localStorage.setItem('ma_token',token)}
const cents=v=>{const n=Number(String(v||'').replace('.','').replace(',','.'));return Number.isFinite(n)?Math.round(n*100):null};
const brl=c=>c==null?'—':new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(c/100);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function note(sel,msg){$(sel).textContent=msg;$(sel).classList.remove('hidden');setTimeout(()=>$(sel).classList.add('hidden'),2200)}
function showTab(name){$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));$$('.tabpane').forEach(p=>p.classList.add('hidden'));$('#tab-'+name).classList.remove('hidden')}
$$('.tab').forEach(b=>b.onclick=()=>showTab(b.dataset.tab));

async function refreshBase(){
 const ms=await req('rest/v1/memberships?select=business_id,role,businesses(*)&limit=1'); if(!ms?.length)throw new Error('Usuário sem negócio.');
 businessId=ms[0].business_id;business=ms[0].businesses;
 const [licenses,plans]=await Promise.all([req(`rest/v1/business_licenses?business_id=eq.${businessId}&select=*`),req('rest/v1/plans?active=eq.true&select=*')]);
 license=licenses?.[0];plan=plans.find(p=>p.id===license?.plan_id);
 $('#businessTitle').textContent=business.name;$('#planName').textContent=plan?.name||'Sem plano';$('#planStatus').textContent=license?.status==='active'?'PLANO ATIVO':'PENDENTE';$('#planStatus').className='badge '+(license?.status==='active'?'ok':'');
 const max=plan?.max_professionals==null?'Ilimitados':plan.max_professionals;
 $('#planSummary').textContent=`Pagamento único confirmado. Profissionais: ${max}. Personalização visual: ${plan?.custom_branding?'incluída':'não incluída'}. Painel avançado: ${plan?.advanced_dashboard?'incluído':'não incluído'}.`;
 const pub=new URL('./agendar.html',location.href);pub.searchParams.set('b',business.slug);$('#publicBookingLink').value=pub.href;$('#openLink').href=pub.href;
 $('#copyLink').onclick=async()=>{await navigator.clipboard.writeText(pub.href);$('#copyLink').textContent='Copiado!';setTimeout(()=>$('#copyLink').textContent='Copiar',1100)};
 $('#bizName').value=business.name||'';$('#bizWhatsapp').value=business.whatsapp||'';$('#bizPrivacy').value=business.privacy_email||'';$('#bizCity').value=business.city||'';$('#bizState').value=business.state||'';
 $('#logoUrl').value=business.logo_url||'';$('#themePrimary').value=business.theme_primary||'#4A4541';$('#themeSurface').value=business.theme_surface||'#F7F4EF';
 $('#brandingCard').classList.toggle('hidden',!plan?.custom_branding);$('#brandingLocked').classList.toggle('hidden',!!plan?.custom_branding);$('#advancedBox').classList.toggle('hidden',!plan?.advanced_dashboard);
}

async function refreshData(){
 [services,professionals]=await Promise.all([
   req(`rest/v1/services?business_id=eq.${businessId}&select=*&order=sort_order.asc,created_at.asc`),
   req(`rest/v1/professionals?business_id=eq.${businessId}&select=*&order=sort_order.asc,created_at.asc`)
 ]);
 renderServices();renderProfessionals();renderScheduleSelect();await refreshOverview();
}

function renderServices(){
 $('#servicesList').innerHTML=services.map(s=>`<div class="row"><div><strong>${esc(s.name)}</strong><small>${s.duration_minutes} min · ${brl(s.price_cents)}</small></div><div class="actions"><span class="badge ${s.active?'ok':''}">${s.active?'Ativo':'Inativo'}</span><button class="secondary" data-service-toggle="${s.id}" data-active="${s.active}">${s.active?'Desativar':'Ativar'}</button></div></div>`).join('')||'<span class="muted">Nenhum serviço.</span>';
 $$('[data-service-toggle]').forEach(b=>b.onclick=async()=>{await req(`rest/v1/services?id=eq.${b.dataset.serviceToggle}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({active:b.dataset.active!=='true'})});await refreshData()});
}

function renderProfessionals(){
 const active=professionals.filter(p=>p.active).length,max=plan?.max_professionals;
 $('#proLimitText').textContent=max==null?`${active} profissionais ativos · seu plano não tem limite.`:`${active} de ${max} profissionais ativos no seu plano.`;
 $('#professionalsList').innerHTML=professionals.map(p=>`<div class="row"><div><strong>${esc(p.name)}</strong><small>${esc(p.bio||'')}</small></div><div class="actions"><span class="badge ${p.active?'ok':''}">${p.active?'Ativo':'Inativo'}</span><button class="secondary" data-pro-toggle="${p.id}" data-active="${p.active}">${p.active?'Desativar':'Ativar'}</button></div></div>`).join('')||'<span class="muted">Nenhum profissional.</span>';
 $$('[data-pro-toggle]').forEach(b=>b.onclick=async()=>{try{await req(`rest/v1/professionals?id=eq.${b.dataset.proToggle}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({active:b.dataset.active!=='true'})});await refreshData()}catch(e){$('#proError').textContent='Seu plano atingiu o limite de profissionais.';$('#proError').classList.remove('hidden')}})
}

function renderScheduleSelect(){const sel=$('#scheduleProfessional');sel.innerHTML=professionals.filter(p=>p.active).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');if(sel.value)loadSchedule(sel.value)}
async function loadSchedule(pid){if(!pid)return;const wh=await req(`rest/v1/working_hours?professional_id=eq.${pid}&select=*&order=weekday.asc`);$$('.weekday').forEach(c=>c.checked=wh.some(x=>x.weekday===Number(c.value)));if(wh[0]){$('#scheduleStart').value=wh[0].starts_at.slice(0,5);$('#scheduleEnd').value=wh[0].ends_at.slice(0,5)}}
$('#scheduleProfessional').onchange=e=>loadSchedule(e.target.value);

async function refreshOverview(){
 const now=new Date(), startToday=new Date(now.getFullYear(),now.getMonth(),now.getDate()).toISOString(), endToday=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1).toISOString(), start30=new Date(Date.now()-30*86400000).toISOString();
 const [apps,clients,today,month]=await Promise.all([
 req(`rest/v1/appointments?business_id=eq.${businessId}&starts_at=gte.${encodeURIComponent(now.toISOString())}&status=in.(pending,confirmed)&select=starts_at,status,clients(name),services(name),professionals(name)&order=starts_at.asc&limit=50`),
 req(`rest/v1/clients?business_id=eq.${businessId}&select=id`),
 req(`rest/v1/appointments?business_id=eq.${businessId}&starts_at=gte.${encodeURIComponent(startToday)}&starts_at=lt.${encodeURIComponent(endToday)}&select=id`),
 req(`rest/v1/appointments?business_id=eq.${businessId}&starts_at=gte.${encodeURIComponent(start30)}&select=id`)
 ]);
 $('#todayCount').textContent=today.length;$('#futureCount').textContent=apps.length;$('#clientCount').textContent=clients.length;$('#monthCount').textContent=month.length;$('#serviceCount').textContent=services.filter(s=>s.active).length;$('#proCount').textContent=professionals.filter(p=>p.active).length;
 $('#appointments').innerHTML=apps.map(a=>`<tr><td>${new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date(a.starts_at))}</td><td>${esc(a.clients?.name||'-')}</td><td>${esc(a.services?.name||'-')}</td><td>${esc(a.professionals?.name||'-')}</td><td>${esc(a.status)}</td></tr>`).join('')||'<tr><td colspan="5">Nenhum agendamento próximo.</td></tr>';
}

$('#businessForm').onsubmit=async e=>{e.preventDefault();await req(`rest/v1/businesses?id=eq.${businessId}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({name:$('#bizName').value.trim(),whatsapp:$('#bizWhatsapp').value.trim()||null,phone:$('#bizWhatsapp').value.trim()||null,privacy_email:$('#bizPrivacy').value.trim()||null,city:$('#bizCity').value.trim()||null,state:$('#bizState').value.trim().toUpperCase()||null})});note('#businessMsg','Informações salvas.');await refreshBase()};
$('#brandingForm').onsubmit=async e=>{e.preventDefault();try{await req(`rest/v1/businesses?id=eq.${businessId}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({logo_url:$('#logoUrl').value.trim()||null,theme_primary:$('#themePrimary').value,theme_surface:$('#themeSurface').value})});note('#brandingMsg','Visual atualizado.');await refreshBase()}catch(e){note('#brandingMsg','Seu plano não inclui personalização visual.')}};

$('#serviceForm').onsubmit=async e=>{e.preventDefault();const body={business_id:businessId,name:$('#serviceName').value.trim(),duration_minutes:Number($('#serviceDuration').value),price_cents:cents($('#servicePrice').value),active:true};const created=await req('rest/v1/services',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(body)});for(const p of professionals.filter(p=>p.active)){await req('rest/v1/professional_services',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({business_id:businessId,professional_id:p.id,service_id:created[0].id})})}e.target.reset();$('#serviceDuration').value=60;await refreshData()};

$('#professionalForm').onsubmit=async e=>{e.preventDefault();$('#proError').classList.add('hidden');try{const created=await req('rest/v1/professionals',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({business_id:businessId,name:$('#professionalName').value.trim(),bio:$('#professionalBio').value.trim()||null,active:true})});const pid=created[0].id;for(const s of services.filter(s=>s.active)){await req('rest/v1/professional_services',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({business_id:businessId,professional_id:pid,service_id:s.id})})}const hours=[1,2,3,4,5].map(weekday=>({business_id:businessId,professional_id:pid,weekday,starts_at:'08:00',ends_at:'18:00',active:true}));await req('rest/v1/working_hours',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(hours)});e.target.reset();await refreshData()}catch(err){$('#proError').textContent=String(err.message).includes('professional_limit_reached')?'Seu plano atingiu o limite de profissionais.':'Não foi possível adicionar o profissional.';$('#proError').classList.remove('hidden')}};

$('#saveSchedule').onclick=async()=>{const pid=$('#scheduleProfessional').value;if(!pid)return;await req(`rest/v1/working_hours?professional_id=eq.${pid}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});const days=$$('.weekday:checked').map(c=>Number(c.value));if(days.length){const rows=days.map(weekday=>({business_id:businessId,professional_id:pid,weekday,starts_at:$('#scheduleStart').value,ends_at:$('#scheduleEnd').value,active:true}));await req('rest/v1/working_hours',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(rows)})}note('#scheduleMsg','Horários salvos.')};

$('#loginForm').onsubmit=async e=>{e.preventDefault();try{await login($('#email').value,$('#password').value);await load()}catch(err){$('#loginError').textContent=err.message;$('#loginError').classList.remove('hidden')}};
$('#logout').onclick=()=>{localStorage.removeItem('ma_token');location.reload()};
async function load(){try{await refreshBase();await refreshData();$('#loginCard').classList.add('hidden');$('#dashboard').classList.remove('hidden')}catch(e){localStorage.removeItem('ma_token');token=null;$('#loginCard').classList.remove('hidden');$('#dashboard').classList.add('hidden')}}
if(token)load();
