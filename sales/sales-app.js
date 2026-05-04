const SUPABASE_URL='https://vuzwljbxwwlgegwzlxuc.supabase.co';
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1endsamJ4d3dsZ2Vnd3pseHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMzMyOTAsImV4cCI6MjA4MjcwOTI5MH0.FK7-h-PLlSv1JIpXcCONRiFZZmBEUEmc8tHXWLOBpYk';
let sb;

const DEFAULT_MENU_ITEMS=[
  '한우사골','얼큰해물','명란맑은','마파두부','짬뽕순두부','두부구이','수육추가','모두부','순두부','콩비지스프레드','솥밥추가','두유크림제철과일','따듯한모두부반모','한우차돌박이100G','버크셔K목살100G','코스','반찬'
];
const DEFAULT_DRINK_ITEMS=[
  '지평막걸리','복순도가','소주','맥주','시드르','디노쇼','레쉐생트앙투안','파조세뇨랑스','무칸테이','아마구치','카오리란만','미야칸바이','콜키지','음료수'
];

async function initSupabase(){
  const{createClient}=supabase;
  sb=createClient(SUPABASE_URL,SUPABASE_KEY);
}

const SalesApp={
  fmt(n){return n==null?'-':Number(n).toLocaleString('ko-KR')+'원'},
  fmtNum(n){return n==null?'-':Number(n).toLocaleString('ko-KR')},
  dayName(d){return['일','월','화','수','목','금','토'][new Date(d).getDay()]+'요일'},
  localDate(date=new Date()){
    const y=date.getFullYear();
    const m=String(date.getMonth()+1).padStart(2,'0');
    const d=String(date.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  },
  today(){return this.localDate()},
  currentMonth(){return this.localDate().slice(0,7)},
  nextMonth(month){
    const [y,m]=month.split('-').map(Number);
    const d=new Date(y,m,1);
    const yy=d.getFullYear();
    const mm=String(d.getMonth()+1).padStart(2,'0');
    return `${yy}-${mm}-01`;
  },
  toast(msg){
    let t=document.getElementById('toast');
    if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}
    t.textContent=msg;t.style.display='block';
    setTimeout(()=>t.style.display='none',2000);
  },
  nav(active){
    const items=[
      {href:'index.html',label:'대시보드',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>'},
      {href:'report.html',label:'보고서',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5"/><path d="M4 19h16"/><rect x="7" y="11" width="3" height="5"/><rect x="12" y="7" width="3" height="9"/><rect x="17" y="9" width="3" height="7"/></svg>'},
      {href:'register.html',label:'매출등록',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'},
      {href:'bank.html',label:'통장입력',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>'},
      {href:'stores.html',label:'매장관리',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>'},
      {href:'help.html',label:'도움말',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 115.8 1c-.6 1-1.9 1.4-2.4 2.4"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'}
    ];
    const nav=document.createElement('nav');nav.className='nav';
    items.forEach(i=>{
      const a=document.createElement('a');
      a.href=i.href;a.innerHTML=i.icon+'<span>'+i.label+'</span>';
      if(i.href===active)a.className='active';
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
  },
  async getStores(){
    const{data}=await sb.from('stores').select('*').order('id');
    return data||[];
  },
  async getLatestSaleMonth(storeId){
    if(!storeId)return '';
    const{data,error}=await sb.from('daily_sales')
      .select('sale_date')
      .eq('store_id',storeId)
      .order('sale_date',{ascending:false})
      .limit(1)
      .maybeSingle();
    if(error||!data||!data.sale_date)return '';
    return data.sale_date.slice(0,7);
  },
  profile(store){
    const name=store&&store.name?store.name:'세모두부';
    if(name.includes('세모두부')){
      return {
        name:'세모두부',
        kicker:'세상의 모든 두부',
        address:'서울 마포구 삼개로5길 4-3 1층',
        description:'매일 갓 만든 두부와 솥밥 중심의 매출 정산',
        mapUrl:'https://map.naver.com/p/search/%EC%84%B8%EB%AA%A8%EB%91%90%EB%B6%80',
        imageUrl:'assets/semodubu-hero.png',
        tags:['두부요리','마포역','솥밥','정산']
      };
    }
    return {
      name,
      kicker:'매장 정산',
      address:'등록된 매장',
      description:'매출, 비용, 통장 대조를 한 곳에서 관리',
      mapUrl:'',
      imageUrl:'assets/semodubu-hero.png',
      tags:['매출','비용','대조','관리']
    };
  },
  preferredStoreId(stores){
    const saved=localStorage.getItem('sales.storeId');
    if(saved&&stores.some(s=>String(s.id)===saved))return saved;
    const semo=stores.find(s=>s.name&&s.name.includes('세모두부'));
    return semo?String(semo.id):(stores[0]?String(stores[0].id):'');
  },
  fillStoreSelect(select,stores){
    select.innerHTML=stores.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
    select.value=this.preferredStoreId(stores);
  },
  saveStore(storeId){
    if(storeId)localStorage.setItem('sales.storeId',String(storeId));
  },
  defaultItems(type){
    const names=type==='drink'?DEFAULT_DRINK_ITEMS:DEFAULT_MENU_ITEMS;
    return names.map((name,idx)=>({id:null,name,item_type:type,sort_order:idx+1,is_default:true}));
  },
  async getSalesItems(storeId,type){
    const fallback=this.defaultItems(type);
    const{data,error}=await sb.from('sales_items')
      .select('*')
      .eq('store_id',storeId)
      .eq('item_type',type)
      .eq('is_active',true)
      .order('sort_order',{ascending:true})
      .order('name',{ascending:true});
    if(error)return fallback;
    return data&&data.length?data:fallback;
  },
  async addSalesItem(storeId,type,name){
    const clean=name.trim();
    if(!clean)return{error:{message:'항목명을 입력하세요'}};
    return sb.from('sales_items').insert({
      store_id:parseInt(storeId),
      item_type:type,
      name:clean,
      sort_order:999,
      is_active:true
    });
  },
  async archiveSalesItem(id){
    return sb.from('sales_items').update({is_active:false}).eq('id',id);
  },
  async seedDefaultSalesItems(storeId){
    const rows=[...this.defaultItems('menu'),...this.defaultItems('drink')].map(i=>({
      store_id:parseInt(storeId),
      item_type:i.item_type,
      name:i.name,
      sort_order:i.sort_order,
      is_active:true
    }));
    return sb.from('sales_items').upsert(rows,{onConflict:'store_id,item_type,name'});
  },
  parseMoney(v){return parseInt(String(v).replace(/[^0-9]/g,''))||0},
  moneyInput(el){
    el.addEventListener('input',function(){
      let v=this.value.replace(/[^0-9]/g,'');
      if(v)this.value=Number(v).toLocaleString('ko-KR');
    });
  }
};
