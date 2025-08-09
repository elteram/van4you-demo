const EUR_TO_BGN = 1.95583;
let state = {currency:'EUR',listings:[]};

function formatPrice(eur){
  if(state.currency==='BGN') return Math.round(eur*EUR_TO_BGN)+' лв.';
  return eur+' €';
}

function render(list){
  const grid=document.getElementById('grid');
  grid.innerHTML='';
  const tpl=document.getElementById('cardTpl');
  list.forEach(it=>{
    const node=tpl.content.cloneNode(true);
    if(it.is_vip) node.querySelector('.vip').hidden=false;
    node.querySelector('.cover').src=it.cover_url;
    node.querySelector('.title').textContent=it.title;
    node.querySelector('.price').textContent=formatPrice(it.price_eur);
    node.querySelector('.year').textContent=it.year;
    node.querySelector('.km').textContent=it.mileage_km+' km';
    node.querySelector('.city').textContent=it.location;
    grid.appendChild(node);
  });
}

function filter(){
  const t=document.getElementById('type').value;
  let res=state.listings;
  if(t) res=res.filter(x=>x.type===t);
  render(res);
}

document.getElementById('searchBtn').onclick=filter;
document.getElementById('clearBtn').onclick=()=>render(state.listings);
document.getElementById('currencySelect').onchange=e=>{state.currency=e.target.value;render(state.listings)};

fetch('data.json').then(r=>r.json()).then(d=>{state.listings=d;render(d)});
