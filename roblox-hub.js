"use strict";
document.addEventListener("DOMContentLoaded",()=>{
  const catalogue={
    games:[],
    modules:[
      {title:"Bnum",desc:"Big number module for incremental games",link:"https://create.roblox.com/store/asset/133072011264214/Bnum"},
      {title:"NetStream",desc:"Network handler system",link:"https://github.com/SillyDev2026/NetStream"},
      {title:"Benchmark Tool",desc:"Generate a Luau benchmarking script",link:"tools/bench.html"},
      {title:"Promise",desc:"Asynchronous workflows and event chains",link:"docs/promise.html"},
      {title:"Signal",desc:"Event and connection utility",link:"docs/Signal.html"}
    ]
  };
  const categoryInput=document.getElementById("categorySelect");
  const limitInput=document.getElementById("limitInput");
  const queryInput=document.getElementById("hubSearch");
  const error=document.getElementById("hubError");
  const grid=document.getElementById("grid");
  const pageInfo=document.getElementById("pageInfo");
  const next=document.getElementById("nextBtn");
  const back=document.getElementById("backBtn");
  let page=1,limit=6;
  function filtered(){
    const q=queryInput.value.trim().toLowerCase();
    return (catalogue[categoryInput.value]||[]).filter(item=>(item.title+" "+item.desc).toLowerCase().includes(q));
  }
  function render(){
    const items=filtered(), max=Math.max(1,Math.ceil(items.length/limit));
    page=Math.min(max,Math.max(1,page));
    grid.replaceChildren();
    if (!items.length){
      const empty=document.createElement("div");
      empty.className="card";
      const heading=document.createElement("h2");
      heading.textContent=categoryInput.value==="games"&&!queryInput.value.trim()?"No games listed yet":"No matching results";
      const msg=document.createElement("p");
      msg.textContent=categoryInput.value==="games"&&!queryInput.value.trim()?"Published games will appear here when they are added. Browse modules in the meantime.":"Try another search or category.";
      empty.append(heading,msg);grid.append(empty);
    }else{
      for(const item of items.slice((page-1)*limit,page*limit)){
        const card=document.createElement("article");card.className="card";
        const heading=document.createElement("h3");heading.textContent=item.title;
        const desc=document.createElement("p");desc.textContent=item.desc;
        const link=document.createElement("a");link.className="btn primary";link.textContent="Open";
        link.href=item.link;
        if (/^https:\/\//.test(item.link)) {link.target="_blank";link.rel="noopener noreferrer";}
        card.append(heading,desc,link);grid.append(card);
      }
    }
    pageInfo.textContent=items.length?`Page ${page} / ${max} · ${items.length} items`:"0 items";
    back.disabled=page<=1;next.disabled=page>=max;
  }
  categoryInput.addEventListener("change",()=>{page=1;render();});
  queryInput.addEventListener("input",()=>{page=1;render();});
  document.getElementById("applyBtn").addEventListener("click",()=>{
    const n=Number(limitInput.value);
    if(!Number.isInteger(n)||n<5||n>25){error.textContent="Enter a whole number from 5 to 25.";limitInput.focus();return;}
    error.textContent="";limit=n;page=1;render();
  });
  back.addEventListener("click",()=>{page--;render();});
  next.addEventListener("click",()=>{page++;render();});
  render();
});
