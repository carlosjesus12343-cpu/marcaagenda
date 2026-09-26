const SB_URL='https://xdbnwojiwrjsoxmzuosu.supabase.co';
const SB_KEY='sb_publishable_MS66GND3YbXJ-31KUwdDmA_DDviTf4F';

const PIX_DATA={
  essential:{name:'Essencial',price_cents:3999,payload:'00020101021126580014BR.GOV.BCB.PIX01367c92d620-194f-43f8-82ce-eb62ffd9a155520400005303986540539.995802BR5911MARCAAGENDA6006ITAQUI62070503***63044B2C',qr:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhIAAAISAQAAAACxRhsSAAAFG0lEQVR4nO2dXWrkOhCFT10b+lGGLCBLkXcwSxpmSdmBvJReQMB6DMjUfVCVZCeTwGU6nr7N0YPb7ZY/JBCl+lO1KP60Lf/8MQIggwwyyCCDDDLIIIOMzhBrI4Bsd/UyYxOZgXpXO8/Z+883HgcZZHzJiKqqugJYngsQV0CT99GETfSXXBTLtIkmDKqqqkfGLcZBBhm/baN95gmILwDi9aKC8CZAWKHIE6R3j+tWbwQYyg3HQQYZ/40R3gSLjKjiFcHEpvxcNxGZAJlPGQcZZHzBWCbf1BfXQhG1mBoQr+MHxP3OhYyHYaCuSdNPB0X0i6qWqrjWfikUAMH67V5L9zIXMh6eUWXntP9F5nxRII9AXAeVn9eLIl7dByAicmTcYhxkkPHbVrfxHjzVZYJUo9+MKbtT4E3qrwjHYOu9zIWMx2W0fb9AEwYFgumi3S9Vd/sUmhoQSn2tNu77ZHw7wxZcqnfuaYpa4Pppgaagpq6afmqrmOuUjFMZMgOo3qiEQfeiFGhW/qCaPCi1e+3O5kLGIzJcP81PBQivo0QFsPxYVYBBAQwqAMS65IsKgkKibu6iupe5kPG4DNNP9/6mAvdL+R5fVdjjrynQL0XGaYxm72+jG/ivUORNFHkCang0T6hG/zIDbv5vo95uHGSQ8WVzYQn0ixtOWvd9TW7gu5tKtSejUJ6S8f0MX38AujFfg1LmjeoOKFui7pcqtPfJOJdRVdOUR4g8qwLYRHXdRGZsgmUCarQqrptoyheVOY+Q+cbjIIOMT1r3n5qcXAH3kA4W2q8GVr001+nKfZ+M0xhtnfY1CVNSbcXaD4gtLcWyqAfa+2Scxaj2vvnuw+soCAosEwBgKFjmwaP/eaoXBbS+QXufjJMYHqh/LzbLoVNoyX0ud+szylMyzmdEd0QB2O/s9jWoytyTUdBSVe5xLmQ8FsNjn+FNgPxUsEyr7+fh1Z7Fl7EIIE0DeCqgn5+M0xl2JDoUANgEi1hO9O4ZguquX1yZh0LGaQy390NP6WsWfXtmumgBmlbgqX/UT8k4g9HsKMCW49q0Ug9PHUJWnpiKFqjiOiXjJIbMoUBTFtEU3gTAJojrJtVwQvb801qKYvqucZBBxietx6NqLL9a+avt+/ouqT+FQzIK5SkZ5zA+6KcAXPlsx5/bman6ht0xHkXGyQyZAbg7f1D9JSNEpk1kziK76H8KpXben0C5r7mQ8YgMy5NefgwqyALEBEhcn4rEBGB5LqMgAKimfr7szkTTf0rG32C4zWTGVB7tq16t4CTiugmWaZOaVP1N4yCDjPetx/etbo+WXY0emBpaWulJS6AGmM9PxnmMnR1lxjx6kamWiRq6vX+oR8F1SsY5DIvvxxUq8drO5oc30WUaigCAIAwKZIEijxCEV9Hlx03HQQYZX7buP7WQaX3gJ6B26dCHen126I/ylIxTGJYnXatG5Keii7gdb8UmvCp/Fbkv9g1N2t7PXMh4XMa+oNnOp+8npXquKXrc1OQu9VMyTmMckkxaaalu9MfmA7BUFX/GeBQZJzI+rye9O7jXO7dqPYzvk3Em41gPxZ2oH5oXlELPU11BO4qMv8UQOfxDVD+wLzP8h3RIS7nfuZDxOIwP8jShlUcJetAAVuxcVzxvSsaZjPf6qaqvSfOf9uW4q5bCeBQZ5zLe2/v7YmguaM3Ux3AQpazbQ8Z5jA//d1I//B9NtD7Zfe2Xlll9L3MhgwwyyCCDDDLIIOP/z/gXMCGutRljHjwAAAAASUVORK5CYII='},
  professional:{name:'Profissional',price_cents:7999,payload:'00020101021126580014BR.GOV.BCB.PIX01367c92d620-194f-43f8-82ce-eb62ffd9a155520400005303986540579.995802BR5911MARCAAGENDA6006ITAQUI62070503***63044AC1',qr:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhIAAAISAQAAAACxRhsSAAAE8ElEQVR4nO2dQY7bOBBFX40M9JICcgAfRb5BHynIkXID6Sh9gADSsgEJNQuyKNrpdAaIrfQ0fi0Mi5IfKKBQZP0iaXP+1KZ//hgBYoghhhhiiCGGGGKIsTOs2In4MIPFzKwHs37L35h6sMsSz1/u3A8xxPiFubs7g7u7z50zzJ37mFbcfcVHOgc6Z/AVBl9xnztvfjZ+lHcR4/MzloiOU7/lb/kSgGEGH5cT/q0vTWZ2ekQ/xBDjLTvdXPv0POcvTAYGmzmsMD07DPOGDd/v3w8xxHjPbv3UhhfDp+cfJ4b5y2oARpqB5ZQvH9IPMcR4z8JPkwMLOKy5zae+g2EEyx/zF0pRID93136IIcZ/YEwWuf1leXL7+vLk9nUGWE7xAdhlOWEXNiuSwL37IYYYb5vf2tyVzL9k+V6+1ctbU74vxsMZVZday/UwQxanirMSapS7Q1qB5F6ek5+KcSwjVNNv57XI+dYT+ulSCgDuLzXxSu63jHv0Qwwx3rIST7PET9FK83ie3CG5+wiE9u/uIxFtFU/FOIbRjPs+puKEcWNtHyHt9agSaDU/FeMgRuOEETbrZSp1Ux9TeOwYo332YsVTMY5hRL5fR/Fa5M9Dfg6q4bHFMYlH5KdiHMMoadF06YDly2rQAenVfHreTgzfexw2jPQjC6Y2+GbOspnfrx9iiPGuteulauz0mIbm3KpY53lqeq2uKp6KcRhj6jfLZadhjsVQ09nbwX/wFbOzO7DZG4x79EMMMd62m+JSo4v+pO5Xib9J/xVPxTiCUfMoShVqXxidtX/KjeLAOfPv4hfyUzEOYTT5foj4hP+FYFosVe0f6VJiHMu4qj0Be9i8qe9HzT9+N8hPxTiaYRfIXsfwYubjcsIu6dXKXDSv64vsqW27bz/EEOM9ho9Evl9zpn0JClMPQOdM55V4LiYJH+xdxPiMjKs8yv2qztTk9h7SaYz2oPq+GMcxGl2qNKTWCXNTTqZSrDqtz8lPxTiIURXSKufP9cYMu5y66wJIlxLjaMaVn87tMtPI/KtWNZf1UvlurQLIT8V4PKOp7+9F/tI272L/9SrqWfFUjL/BKOec5L2lT26XfPbJZj6mV7Ov/mrsm/ng6rSUD/YuYnxGRhZBDU5rEZ3Sik/nFYbskZ0bS4+z1B+VSv89+yGGGO9a1KNqCpXq9tM6U22PQKtT2Fm6lBiHM3aJn83KbhNieJ/6MuSbnb2cQmHntdz9cO8ixudjXK+Xgl0Xjap+adu3UO03FE/FOIjR7uMrqX64Y9Wl2l3TuySl/VFiHMdo61GlZFpqTyH7d41j7rXUxuSnYjycUY+OoGRKY26uqmlta9b1pbVR/OWnYjyecZXRz1FxatJ/oN13Ql2TOiOdX4yjGD/tj8oz0BnYz+urhap2f5T2m4pxNGP/v5Oy4PRc42ldfzrZkzdtw7zp/FMxDmYMVZya+tBPv0V5Ksb4FVjMYgbwiH6IIcbbFqk+kdvXo0/L8E7VSvcl0oDGfTH+JmM6v1reGpXPngiJH5Ynz/G0bJOu4sCHfRcxPg3jNp7ulSmv50rua/ybzF/7TcX4C4wUImres5fczSJx8jFHUaDqUj4uTzpPWoyjGHFeX87dO2zY/3En/TCmvluBbrWyL3o7MYwbBui8PjGOYpj//pnf2PRR3kUMMcQQQwwxxBBDjP8/41/G59wYf+UR4gAAAABJRU5ErkJggg=='},
  premium:{name:'Premium',price_cents:9999,payload:'00020101021126580014BR.GOV.BCB.PIX01367c92d620-194f-43f8-82ce-eb62ffd9a155520400005303986540599.995802BR5911MARCAAGENDA6006ITAQUI62070503***6304C010',qr:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhIAAAISAQAAAACxRhsSAAAFA0lEQVR4nO2dW27rOAyGf44N9FEGsoAuRd7BLKlr6g7spWQBBezHADI4D6QuSXoGMzipJhP8enAd1fkgAwTFmxhR/O5Y//htBEAGGWSQQQYZZJBBBhmVIT5GALuIzDgEq4yQGYfIDNidPTzv+fn5wesgg4zvx2h/4gIA+ylP76fGv1LgGHWVQbH++TUq9iEBAORx6yCDjH/C2LN2XKdBgZAAhARd9hGuaAEgbn7TzD3du5DxeozxdiLqIVhlSGIyGdTUpsRtEiB8QeLn49dBBhn/irFOg6rqRbBmKxRRE3QBgHi+E+wnfhcyXoYBVVVFVFXVbbA7296jJthHANDFbAF/rvna8izvQsbLM0x3TgCwjwAwKLC/qX2M26DycX5TxHOOAYiIPH4dZJDx7bBtvDr3ur5fBOv7RYBwkexRXUSBi+g6QYBwnWx9lnch43UZZd9P0AWD2s6+AG6Q2giqtu+bGRCSfc0G930yfpzhArfYXZW/ZB9dgIPPZfvUpZhySkZ/hswWKxXBOl095F7+oLrkpJR/4yfWQQYZd8PsU4nbKQFII+JyjIIwqJgzhUEFgCj2UwL2NxUEhUQ9cojqWd6FjNdl5L07qCLmeFONPNkebyaszSVz//0b3PfJ6MIoYftjVOAiQPga3cHfJwAYEuwuXETXGcju/zHq49ZBBhl/O7KyBFQ3mLL0sL+F+FvdmcNUqrogq1zqUzJ+nJEd/A2oySagRqhCDUC5iOa4VKK/T0YvBrLaRBM/BTBYTNWLprJ0NnFWT61STsnowWjk1PXkBg+YmtgCcLfKLiV0unHfJ6Mbo8T5q0zCy0zdZvV/NGUpccvKl/qUjD4Mj58Ch7n6gqDAOg0J2IeEdR5y9n+f7KKA16TS3yejE6NJ1DeTteDURrg2Ycsc9SkZfRitnHrkqdzlnb16/u1/SyCAckpGN8Y++iWeR+iCQ3QJF6lzMu8iHr+yEtWD9adk9GWITEeuNc1Hor36pMwhqPrpvZDMy5L5wesgg4xfDN+7TRzRuvp1znf7BACt+899n4xOjNt8lEejqgW6fRNirZWolFMyOjJktrP64tv7vIsgbofIHBLqmSmT55vq1Cd7FzJekXGVNw2eFPW7cF/UXzOo1KdkdGQ056PgFfuD1lRUtgDacGq+Yz6KjG6MVk5r1LSO4lHlxL/7Vt52gnJKRhdGORc9qGA/JcTlECBskLgAWN+TH0OJn0PyM/15MG9KRidG2w+lqM0cnBryQdStVkldqVfap2T0YTT1/ChVp9mPuqpEjRa/aktUKadkdGJcnTup9mmNpG5oxDY3oBjaZhOUUzJ+nHFVh7IhV5iq6k1tVN33c40/5ZSM3oxVPMQPoESewkWaMyYICSLvqqrnN5UP64j24HWQQca3I/eZ0GME9lPSVXKjc+spUbryxw0q8dM/YZ2GxL7nZHRitA3NSiQ19zpt+5+i5k1jeY77Phl9GFdFJjeSuKEc50+NaWpzzEeR0Z/hQSeYBQrsItlITbBf6JGpdfXbXOqTvQsZL8ho46clsH8/clMU3NSpUp+S8Z8w5GMD4BZAe2BfZhzSVlP97DrIIONq3OvTcgnepc/zUVubZOV5UzJ6Mm5/78Rd+NJBylugZYPUsvob81Fk9GXc+vvNWaji9De90RpVyr49ZPRj3P3eiV9yGx+bCan8o17KKb9neRcyyCCDDDLIIIMMMv7/jL8AR+LU3F02Cg0AAAAASUVORK5CYII='}
};

const $=s=>document.querySelector(s);
const qs=new URLSearchParams(location.search);
const wantedPlan=qs.get('plano')||'essential';
let currentPlan=null;

const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(c/100);

async function rpc(fn,body={}){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),15000);
  let r;
  try{r=await fetch(`${SB_URL}/rest/v1/rpc/${fn}`,{
    method:'POST',
    headers:{apikey:SB_KEY,Authorization:`Bearer ${SB_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify(body),signal:controller.signal
  })}finally{clearTimeout(timer)}
  const t=await r.text();
  if(!r.ok){
    let detail='';
    try{const data=JSON.parse(t);detail=data.message||data.details||''}catch{}
    throw new Error(detail||`Falha ao registrar o pedido (${r.status}).`);
  }
  return t?JSON.parse(t):null;
}

function showError(msg){const e=$('#errorBox');e.textContent=msg;e.classList.remove('hidden')}

async function showQr(plan){
  const img=$('#qrImage');
  // A imagem incorporada funciona sem rede; o PNG local é um segundo caminho.
  const sources=[plan.qr,`./pix-${plan.id}.png?v=12`];
  for(const source of sources){
    try{
      await new Promise((resolve,reject)=>{
        img.onload=()=>resolve(); img.onerror=()=>reject(new Error('Imagem Pix inválida'));
        img.src=source;
        if(img.complete && img.naturalWidth>0) resolve();
      });
      return;
    }catch{}
  }
  throw new Error('Não foi possível exibir o QR Code. Use o Pix Copia e Cola abaixo.');
}

function load(){
  currentPlan=PIX_DATA[wantedPlan]||PIX_DATA.essential;
  currentPlan.id=wantedPlan in PIX_DATA?wantedPlan:'essential';
  $('#planName').textContent=currentPlan.name;
  $('#price').textContent=money(currentPlan.price_cents);
}

$('#buyerForm').addEventListener('submit',async e=>{
  e.preventDefault();
  $('#errorBox').classList.add('hidden');
  const button=$('#buyerForm button[type="submit"]');
  button.disabled=true;button.textContent='Registrando pedido...';
  try{
    const rows=await rpc('create_pix_order_v2',{
      p_plan_id:currentPlan.id,
      p_buyer_name:$('#buyerName').value.trim(),
      p_buyer_phone:$('#buyerPhone').value.trim(),
      p_buyer_email:$('#buyerEmail').value.trim()
    });
    const order=Array.isArray(rows)?rows[0]:rows;
    if(!order?.order_id||!order?.external_reference) throw new Error('O pedido não retornou uma referência válida. Nenhum Pix foi liberado.');
    if(Number(order.amount_cents)!==currentPlan.price_cents||order.plan_id!==currentPlan.id)
      throw new Error('O valor do pedido não corresponde ao plano. Nenhum Pix foi liberado.');

    $('#pixCode').value=currentPlan.payload;
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
    try{await showQr(currentPlan)}catch(qrError){
      $('#qrImage').style.display='none';
      showError(qrError.message);
    }
    $('#pixArea').scrollIntoView({behavior:'smooth'});
  }catch(err){
    console.error(err);
    $('#pixArea').classList.add('hidden');
    showError(err.name==='AbortError'?'O registro demorou demais. Confira sua conexão e tente novamente.':`Não foi possível registrar o pedido: ${err.message||'verifique sua conexão e tente novamente.'}`);
  }finally{
    button.disabled=false;button.textContent='Gerar cobrança Pix';
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
