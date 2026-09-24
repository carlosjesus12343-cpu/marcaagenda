
const SB_URL = "https://xdbnwojiwrjsoxmzuosu.supabase.co";
const SB_KEY = "sb_publishable_MS66GND3YbXJ-31KUwdDmA_DDviTf4F";
const headers = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type':'application/json' };

const state = { business:null, services:[], professionals:[], links:[], hours:[], service:null, professional:null, date:null, time:null };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = cents => cents == null ? 'Consultar' : new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
const slug = new URLSearchParams(location.search).get('b') || 'studio-aurora';
const api = async (path, options={}) => {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, {...options, headers:{...headers,...(options.headers||{})}});
  if(!r.ok) throw new Error((await r.text()) || 'Erro de comunicação.');
  const txt = await r.text(); return txt ? JSON.parse(txt) : null;
};
function alertMsg(msg){ const a=$('#alert'); a.textContent=msg; a.classList.remove('hidden'); setTimeout(()=>a.classList.add('hidden'),5500); }
function show(n){ $$('.panel').forEach(p=>p.classList.toggle('hidden',p.dataset.panel!=n)); $$('.step').forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===Math.min(n,4))); }
function esc(s){ return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function localToUtcISO(dateStr,timeStr,timeZone){
  let guess = new Date(`${dateStr}T${timeStr}:00Z`);
  const fmt = new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
  for(let i=0;i<3;i++){
    const p=Object.fromEntries(fmt.formatToParts(guess).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
    const wall=Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);
    const target=Date.UTC(...dateStr.split('-').map((x,i)=> i===1?+x-1:+x), ...timeStr.split(':').map(Number),0);
    guess = new Date(guess.getTime() + (target-wall));
  }
  return guess.toISOString();
}
function addMinutes(hm,min){ const [h,m]=hm.split(':').map(Number); const t=h*60+m+min; return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`; }
function hmToMin(hm){ const [h,m]=hm.slice(0,5).split(':').map(Number); return h*60+m; }

async function load(){
  try{
    const b = await api(`businesses?slug=eq.${encodeURIComponent(slug)}&active=eq.true&select=*`);
    if(!b?.length) throw new Error('Estabelecimento não encontrado.');
    state.business=b[0];
    document.documentElement.style.setProperty('--accent',state.business.theme_primary||'#49433f');
    document.documentElement.style.setProperty('--bg',state.business.theme_surface||'#f5f2ed');
    $('#businessName').textContent=state.business.name;
    $('#businessDescription').textContent=state.business.description||'Escolha o serviço, profissional e horário.';
    document.title=`${state.business.name} — Agendamento`;
    const id=state.business.id;
    [state.services,state.professionals,state.links,state.hours]=await Promise.all([
      api(`services?business_id=eq.${id}&active=eq.true&select=*&order=sort_order.asc`),
      api(`professionals?business_id=eq.${id}&active=eq.true&select=*&order=sort_order.asc`),
      api(`professional_services?business_id=eq.${id}&select=*`),
      api(`working_hours?business_id=eq.${id}&active=eq.true&select=*`)
    ]);
    renderServices();
  }catch(e){ alertMsg(e.message||'Não foi possível carregar a agenda.'); }
}
function renderServices(){
  $('#services').classList.remove('skeleton-grid');
  $('#services').innerHTML=state.services.map(s=>`<button class="option" data-service="${s.id}"><strong>${esc(s.name)}</strong><div class="meta">${s.duration_minutes} min · ${esc(s.description||'')}</div><div class="price">${money(s.price_cents)}</div></button>`).join('');
  $$('[data-service]').forEach(b=>b.onclick=()=>{state.service=state.services.find(s=>s.id===b.dataset.service);renderProfessionals();show(2);});
}
function renderProfessionals(){
  const allowed=new Set(state.links.filter(x=>x.service_id===state.service.id).map(x=>x.professional_id));
  const list=state.professionals.filter(p=>allowed.has(p.id));
  $('#professionals').innerHTML=list.map(p=>`<button class="option" data-pro="${p.id}"><strong>${esc(p.name)}</strong><div class="meta">${esc(p.bio||'Profissional disponível')}</div></button>`).join('');
  $$('[data-pro]').forEach(b=>b.onclick=()=>{state.professional=state.professionals.find(p=>p.id===b.dataset.pro);prepareDate();show(3);});
}
function prepareDate(){
  const d=$('#dateInput'); const now=new Date(); const local=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
  d.min=local; d.value=state.date||local; state.date=d.value; d.onchange=()=>{state.date=d.value;state.time=null;renderTimes();}; renderTimes();
}
async function renderTimes(){
  const box=$('#times'); box.innerHTML='<span class="muted">Consultando disponibilidade...</span>';
  try{
    const weekday=new Date(`${state.date}T12:00:00Z`).getUTCDay();
    const ranges=state.hours.filter(h=>h.professional_id===state.professional.id && h.weekday===weekday);
    if(!ranges.length){box.innerHTML='<span class="muted">Sem atendimento nesta data.</span>';return;}
    const busy=await api('rpc/get_busy_times',{method:'POST',body:JSON.stringify({p_business_slug:slug,p_professional_id:state.professional.id,p_date:state.date})});
    const intervals=(busy?.busy||[]).map(x=>[new Date(x.starts_at).getTime(),new Date(x.ends_at).getTime()]);
    const slots=[];
    for(const r of ranges){
      let cur=hmToMin(r.starts_at), end=hmToMin(r.ends_at);
      while(cur+state.service.duration_minutes<=end){
        const hm=`${String(Math.floor(cur/60)).padStart(2,'0')}:${String(cur%60).padStart(2,'0')}`;
        const iso=localToUtcISO(state.date,hm,state.business.timezone||'America/Sao_Paulo');
        const a=new Date(iso).getTime(), z=a+state.service.duration_minutes*60000;
        const clash=intervals.some(([x,y])=>a<y&&z>x);
        if(!clash && a>Date.now()+10*60000) slots.push({hm,iso});
        cur+=30;
      }
    }
    if(!slots.length){
      box.innerHTML='<span class="muted">Nenhum horário livre nesta data.</span>';
    } else {
      const morning=slots.filter(x=>Number(x.hm.slice(0,2))<12);
      const afternoon=slots.filter(x=>Number(x.hm.slice(0,2))>=12);
      const group=(title,list)=>list.length?`<div class="slot-group"><h3>${title}</h3><div class="time-grid">${list.map(x=>`<button class="time" data-time="${x.iso}">${x.hm}</button>`).join('')}</div></div>`:'';
      box.innerHTML=group('Manhã',morning)+group('Tarde',afternoon);
    }
    $$('[data-time]').forEach(b=>b.onclick=()=>{state.time=b.dataset.time;$$('[data-time]').forEach(x=>x.classList.toggle('selected',x===b));setTimeout(()=>show(4),180);});
  }catch(e){box.innerHTML='<span class="muted">Não foi possível consultar os horários.</span>';}
}
$('#bookingForm').addEventListener('submit',async e=>{
  e.preventDefault(); if(!state.time) return alertMsg('Escolha um horário.');
  const btn=$('#confirmButton'); btn.disabled=true; btn.textContent='Confirmando...';
  try{
    const payload={p_business_slug:slug,p_professional_id:state.professional.id,p_service_id:state.service.id,p_starts_at:state.time,p_client_name:$('#clientName').value.trim(),p_client_phone:$('#clientPhone').value.trim(),p_client_email:$('#clientEmail').value.trim()||null,p_client_note:$('#clientNote').value.trim()||null,p_marketing_opt_in:$('#marketingOptIn').checked};
    const res=await api('rpc/create_public_booking',{method:'POST',body:JSON.stringify(payload)});
    const when=new Intl.DateTimeFormat('pt-BR',{dateStyle:'full',timeStyle:'short',timeZone:state.business.timezone||'America/Sao_Paulo'}).format(new Date(res.starts_at));
    $('#confirmation').innerHTML=`<strong>${esc(state.service.name)}</strong><br>${esc(state.professional.name)}<br>${esc(when)}`;
    show(5);
  }catch(e){ const t=String(e.message||''); alertMsg(t.includes('slot_unavailable')?'Esse horário acabou de ser ocupado. Escolha outro.':'Não foi possível confirmar. Revise os dados e tente novamente.'); if(t.includes('slot_unavailable')){show(3);renderTimes();} }
  finally{btn.disabled=false;btn.textContent='Confirmar agendamento';}
});
$$('[data-back]').forEach(b=>b.onclick=()=>show(Number(b.dataset.back)));
$('#year').textContent=new Date().getFullYear();
load();
