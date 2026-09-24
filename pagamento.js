const SB_URL='https://xdbnwojiwrjsoxmzuosu.supabase.co';
const SB_KEY='sb_publishable_MS66GND3YbXJ-31KUwdDmA_DDviTf4F';

const PIX_DATA={
  essential:{name:'Essencial',price_cents:3999,payload:'00020101021126580014BR.GOV.BCB.PIX01367c92d620-194f-43f8-82ce-eb62ffd9a155520400005303986540539.995802BR5911MARCAAGENDA6006ITAQUI62070503***63044B2C',qr:'./pix-essential.png'},
  professional:{name:'Profissional',price_cents:7999,payload:'00020101021126580014BR.GOV.BCB.PIX01367c92d620-194f-43f8-82ce-eb62ffd9a155520400005303986540579.995802BR5911MARCAAGENDA6006ITAQUI62070503***63044AC1',qr:'./pix-professional.png'},
  premium:{name:'Premium',price_cents:9999,payload:'00020101021126580014BR.GOV.BCB.PIX01367c92d620-194f-43f8-82ce-eb62ffd9a155520400005303986540599.995802BR5911MARCAAGENDA6006ITAQUI62070503***6304C010',qr:'./pix-premium.png'}
};

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
  const t=await r.text();
  if(!r.ok) throw new Error(t||'Erro ao criar pedido');
  return t?JSON.parse(t):null;
}

function showError(msg){const e=$('#errorBox');e.textContent=msg;e.classList.remove('hidden')}

function load(){
  currentPlan=PIX_DATA[wantedPlan]||PIX_DATA.essential;
  currentPlan.id=wantedPlan in PIX_DATA?wantedPlan:'essential';
  $('#planName').textContent=currentPlan.name;
  $('#price').textContent=money(currentPlan.price_cents);
}

$('#buyerForm').addEventListener('submit',async e=>{
  e.preventDefault();
  $('#errorBox').classList.add('hidden');
  try{
    const rows=await rpc('create_pix_order_v2',{
      p_plan_id:currentPlan.id,
      p_buyer_name:$('#buyerName').value.trim(),
      p_buyer_phone:$('#buyerPhone').value.trim(),
      p_buyer_email:$('#buyerEmail').value.trim()
    });
    const order=rows[0];

    $('#pixCode').value=currentPlan.payload;
    $('#qrImage').src=currentPlan.qr;
    $('#qrImage').alt=`QR Code Pix ${currentPlan.name} - ${money(currentPlan.price_cents)}`;
    $('#orderRef').textContent=`Referência da compra: ${order.external_reference}`;

    const activation=`./ativar.html?order=${encodeURIComponent(order.order_id)}&ref=${encodeURIComponent(order.external_reference)}`;
    $('#activationLink').href=activation;
    $('#activationLink').classList.remove('hidden');

    localStorage.setItem('ma_last_order',JSON.stringify({
      order_id:order.order_id,
      external_reference:order.external_reference,
      plan_id:order.plan_id
    }));

    $('#pixArea').classList.remove('hidden');
    $('#pixArea').scrollIntoView({behavior:'smooth'});
  }catch(err){
    console.error(err);
    showError('Não foi possível gerar a cobrança Pix. Atualize a página e tente novamente.');
  }
});

$('#copyPix').onclick=async()=>{
  try{
    await navigator.clipboard.writeText($('#pixCode').value);
    $('#copyPix').textContent='Copiado!';
    setTimeout(()=>$('#copyPix').textContent='Copiar código',1500);
  }catch{
    $('#pixCode').select();
    document.execCommand('copy');
  }
};
load();
