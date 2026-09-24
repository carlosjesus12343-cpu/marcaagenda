const SB_URL='https://xdbnwojiwrjsoxmzuosu.supabase.co',SB_KEY='sb_publishable_MS66GND3YbXJ-31KUwdDmA_DDviTf4F';
const $=s=>document.querySelector(s); const qs=new URLSearchParams(location.search); const order=qs.get('order'), ref=qs.get('ref'); let token=localStorage.getItem('ma_token');
const headers=()=>({apikey:SB_KEY,Authorization:`Bearer ${token||SB_KEY}`,'Content-Type':'application/json'});
async function rpc(fn,body={},auth=false){const r=await fetch(`${SB_URL}/rest/v1/rpc/${fn}`,{method:'POST',headers:headers(),body:JSON.stringify(body)});const t=await r.text();if(!r.ok)throw new Error(t||'Erro');return t?JSON.parse(t):null}
function err(m){$('#err').textContent=m;$('#err').classList.remove('hidden')}
async function auth(path,body){const r=await fetch(`${SB_URL}/auth/v1/${path}`,{method:'POST',headers:{apikey:SB_KEY,'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();if(!r.ok)throw new Error(d?.msg||d?.error_description||'Não foi possível entrar.');if(d.access_token){token=d.access_token;localStorage.setItem('ma_token',token)}return d}
async function check(){
  if(!order||!ref){$('#orderStatus').textContent='Link de ativação inválido.';return}
  try{
    const rows=await rpc('get_order_status',{p_order_id:order,p_external_reference:ref});
    const s=rows?.[0];
    if(!s){$('#orderStatus').textContent='Compra não encontrada.';return}
    if(s.claimed){$('#orderStatus').className='status ok';$('#orderStatus').textContent='Esta compra já foi ativada.';return}
    if(s.status!=='paid'){
      $('#orderStatus').className='status warn';
      $('#orderStatus').innerHTML='Pagamento ainda não confirmado.<br><small>Depois que o administrador confirmar o Pix, atualize esta página.</small>';
      return;
    }
    $('#orderStatus').className='status ok';$('#orderStatus').textContent='Pagamento confirmado. Agora crie seu acesso.';
    if(token) $('#businessArea').classList.remove('hidden'); else $('#accountArea').classList.remove('hidden');
  }catch(e){$('#orderStatus').textContent='Não foi possível consultar o pagamento.'}
}
$('#signupForm').onsubmit=async e=>{e.preventDefault();$('#err').classList.add('hidden');try{
  const d=await auth('signup',{email:$('#email').value.trim(),password:$('#password').value});
  if(d.access_token){$('#accountArea').classList.add('hidden');$('#businessArea').classList.remove('hidden')}
  else {err('Conta criada. Confirme seu e-mail e depois entre abaixo para continuar.')}
}catch(e){err(e.message)}};
$('#loginForm').onsubmit=async e=>{e.preventDefault();$('#err').classList.add('hidden');try{
  await auth('token?grant_type=password',{email:$('#loginEmail').value.trim(),password:$('#loginPassword').value});
  $('#accountArea').classList.add('hidden');$('#businessArea').classList.remove('hidden');
}catch(e){err(e.message)}};
$('#businessName').addEventListener('input',()=>{if(!$('#businessSlug').dataset.touched){$('#businessSlug').value=$('#businessName').value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50)}});$('#businessSlug').addEventListener('input',()=>$('#businessSlug').dataset.touched='1');
$('#claimForm').onsubmit=async e=>{e.preventDefault();$('#err').classList.add('hidden');try{
  const rows=await rpc('claim_paid_order',{p_order_id:order,p_external_reference:ref,p_business_name:$('#businessName').value.trim(),p_slug:$('#businessSlug').value.trim()},true);
  const b=rows[0];
  $('#businessArea').classList.add('hidden');$('#done').classList.remove('hidden');
  $('#done').innerHTML=`Acesso ativado com sucesso.<br><br><a class="primary" style="display:inline-flex;text-decoration:none" href="./admin.html">Abrir meu painel</a><br><br><a href="./agendar.html?b=${encodeURIComponent(b.business_slug)}">Ver meu link de agendamento</a>`;
}catch(e){err(String(e.message).includes('Pagamento ainda')?'O pagamento ainda não foi confirmado.': 'Não foi possível ativar. Verifique os dados ou tente outro endereço para seu link.')}};
check();