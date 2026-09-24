const SB_URL='https://xdbnwojiwrjsoxmzuosu.supabase.co', SB_KEY='sb_publishable_MS66GND3YbXJ-31KUwdDmA_DDviTf4F';
const $=s=>document.querySelector(s); let token=localStorage.getItem('ma_token');
const h=()=>({apikey:SB_KEY,Authorization:`Bearer ${token||SB_KEY}`,'Content-Type':'application/json'});
async function req(path,opt={}){const r=await fetch(`${SB_URL}/${path}`,{...opt,headers:{...h(),...(opt.headers||{})}});if(!r.ok)throw new Error(await r.text());const t=await r.text();return t?JSON.parse(t):null}
async function login(email,password){const r=await fetch(`${SB_URL}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:SB_KEY,'Content-Type':'application/json'},body:JSON.stringify({email,password})});if(!r.ok)throw new Error('E-mail ou senha inválidos.');const d=await r.json();token=d.access_token;localStorage.setItem('ma_token',token);return d}
const brl=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format((c||0)/100);
function renderEntitlements(plan, license){
  const active=license?.status==='active' && license?.lifetime_access===true;
  $('#planName').textContent=plan?.name||'Sem plano';
  $('#licenseBadge').textContent=active?'PLANO ATIVO':'LICENÇA PENDENTE';
  $('#licenseBadge').className=active?'badge-ok':'badge-warn';
  $('#planPayment').textContent=active?`Pagamento único confirmado${license.amount_paid_cents!=null?' · '+brl(license.amount_paid_cents):''}`:'Aguardando ativação após pagamento único.';
  const items=[
    ['Profissionais', plan?.max_professionals==null?'Ilimitados':String(plan?.max_professionals??0), true],
    ['Identidade personalizada', plan?.custom_branding?'Liberado':'Não incluído', !!plan?.custom_branding],
    ['Domínio próprio', plan?.custom_domain?'Liberado':'Não incluído', !!plan?.custom_domain],
    ['Painel avançado', plan?.advanced_dashboard?'Liberado':'Não incluído', !!plan?.advanced_dashboard],
    ['Suporte prioritário', plan?.priority_support?'Liberado':'Não incluído', !!plan?.priority_support],
    ['Acesso', active?'Liberado':'Pendente', active]
  ];
  $('#entitlements').innerHTML=items.map(([a,b,on])=>`<div class="ent ${on?'':'lock'}"><b>${a}</b>${b}</div>`).join('');
}
async function loadDashboard(){
  try{
    const memberships=await req('rest/v1/memberships?select=business_id,role,businesses(name)&limit=1');
    if(!memberships?.length)throw new Error('Usuário sem acesso a estabelecimento.');
    const m=memberships[0], bid=m.business_id; $('#dashBusiness').textContent=m.businesses?.name||'Minha agenda';
    const [licenses, plans] = await Promise.all([
      req(`rest/v1/business_licenses?business_id=eq.${bid}&select=*`),
      req('rest/v1/plans?active=eq.true&select=*')
    ]);
    const license=licenses?.[0]||null; const plan=plans.find(p=>p.id===license?.plan_id);
    renderEntitlements(plan,license);

    const today=new Date(); const start=new Date(today.getFullYear(),today.getMonth(),today.getDate()).toISOString(); const end=new Date(today.getFullYear(),today.getMonth(),today.getDate()+1).toISOString();
    const [apps,clients,todays]=await Promise.all([
      req(`rest/v1/appointments?business_id=eq.${bid}&starts_at=gte.${encodeURIComponent(new Date().toISOString())}&status=in.(pending,confirmed)&select=starts_at,status,clients(name),services(name),professionals(name)&order=starts_at.asc&limit=50`),
      req(`rest/v1/clients?business_id=eq.${bid}&select=id`),
      req(`rest/v1/appointments?business_id=eq.${bid}&starts_at=gte.${encodeURIComponent(start)}&starts_at=lt.${encodeURIComponent(end)}&select=id`)
    ]);
    $('#todayCount').textContent=todays.length; $('#futureCount').textContent=apps.length; $('#clientCount').textContent=clients.length;
    $('#appointments').innerHTML=apps.map(a=>`<tr><td>${new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date(a.starts_at))}</td><td>${a.clients?.name||'-'}</td><td>${a.services?.name||'-'}</td><td>${a.professionals?.name||'-'}</td><td>${a.status}</td></tr>`).join('')||'<tr><td colspan="5">Nenhum agendamento próximo.</td></tr>';
    $('#loginCard').classList.add('hidden');$('#dashboard').classList.remove('hidden');
  }catch(e){localStorage.removeItem('ma_token');token=null;$('#loginCard').classList.remove('hidden');$('#dashboard').classList.add('hidden');}
}
$('#loginForm').onsubmit=async e=>{e.preventDefault();try{await login($('#email').value,$('#password').value);await loadDashboard();}catch(err){const a=$('#loginError');a.textContent=err.message;a.classList.remove('hidden')}};
$('#logout').onclick=()=>{localStorage.removeItem('ma_token');token=null;location.reload()};
if(token)loadDashboard();
