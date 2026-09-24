const SB_URL='https://xdbnwojiwrjsoxmzuosu.supabase.co';
const SB_KEY='sb_publishable_MS66GND3YbXJ-31KUwdDmA_DDviTf4F';

// CONFIGURE ESTES 3 CAMPOS PARA GERAR UM PIX REAL.
const PIX_KEY='7c92d620-194f-43f8-82ce-eb62ffd9a155';
const MERCHANT_NAME='MARCAAGENDA';
const MERCHANT_CITY='ITAQUI';

const $=s=>document.querySelector(s);
const qs=new URLSearchParams(location.search);
const wantedPlan=qs.get('plano')||'essential';
let currentPlan=null;

const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(c/100);

async function rpc(fn,body={}){
  const r=await fetch(`${SB_URL}/rest/v1/rpc/${fn}`,{
    method:'POST',
    headers:{apikey:SB_KEY,Authorization:`Bearer ${SB_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify(body)
  });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}

function crc16(str){
  let crc=0xFFFF;
  for(let c=0;c<str.length;c++){
    crc ^= str.charCodeAt(c)<<8;
    for(let i=0;i<8;i++) crc=(crc&0x8000)?((crc<<1)^0x1021):(crc<<1);
    crc &= 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4,'0');
}
const field=(id,val)=>id+String(val.length).padStart(2,'0')+val;
function clean(s,max){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9 $%*+\-./:]/g,'').toUpperCase().slice(0,max);}
function makePixPayload(key,name,city,amount,txid){
  const gui=field('00','BR.GOV.BCB.PIX');
  const keyField=field('01',key);
  const merchantAccount=field('26',gui+keyField);
  const addData=field('62',field('05',txid.slice(0,25)));
  const base=
    field('00','01')+
    field('01','12')+
    merchantAccount+
    field('52','0000')+
    field('53','986')+
    field('54',amount.toFixed(2))+
    field('58','BR')+
    field('59',clean(name,25))+
    field('60',clean(city,15))+
    addData+
    '6304';
  return base+crc16(base);
}

async function load(){
  try{
    const plans=await rpc('get_sale_plans');
    currentPlan=plans.find(p=>p.id===wantedPlan)||plans[0];
    $('#planName').textContent=currentPlan.name;
    $('#price').textContent=money(currentPlan.price_cents);
  }catch(e){showError('Não foi possível carregar os planos.');}
}
function showError(msg){const e=$('#errorBox');e.textContent=msg;e.classList.remove('hidden')}

$('#buyerForm').addEventListener('submit',async e=>{
  e.preventDefault();
  $('#errorBox').classList.add('hidden');
  if(PIX_KEY==='SUA_CHAVE_PIX_AQUI'){
    showError('A estrutura está pronta, mas falta configurar sua chave Pix para gerar uma cobrança real.');
    return;
  }
  try{
    const rows=await rpc('create_pix_order',{
      p_plan_id:currentPlan.id,
      p_buyer_name:$('#buyerName').value.trim(),
      p_buyer_phone:$('#buyerPhone').value.trim()
    });
    const order=rows[0];
    const txid=order.external_reference.slice(0,25);
    const payload=makePixPayload(PIX_KEY,MERCHANT_NAME,MERCHANT_CITY,order.amount_cents/100,txid);
    $('#pixCode').value=payload;
    $('#orderRef').textContent=`Referência da cobrança: ${order.external_reference}`;
    $('#pixArea').classList.remove('hidden');
    $('#qrcode').innerHTML='';
    new QRCode($('#qrcode'),{text:payload,width:240,height:240,correctLevel:QRCode.CorrectLevel.M});
    $('#pixArea').scrollIntoView({behavior:'smooth'});
  }catch(err){showError('Não foi possível gerar a cobrança Pix. Atualize a página e tente novamente. Se continuar, fale com o suporte.');}
});
$('#copyPix').onclick=async()=>{await navigator.clipboard.writeText($('#pixCode').value);$('#copyPix').textContent='Copiado!';setTimeout(()=>$('#copyPix').textContent='Copiar código',1500)};
load();
