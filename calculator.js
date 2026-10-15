"use strict";
document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("calcForm");
  const result=document.getElementById("result");
  const raw=document.getElementById("raw");
  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    try {
      const a=Bnum.fromString(document.getElementById("num1").value.trim()||"0");
      const b=Bnum.fromString(document.getElementById("num2").value.trim()||"0");
      const ops={add:Bnum.add,sub:Bnum.sub,mul:Bnum.mul,div:Bnum.div,pow:Bnum.pow,log:Bnum.log};
      const op=document.getElementById("op").value;
      if (!Object.hasOwn(ops,op)) throw new Error("Unknown operation");
      const n=ops[op](a,b);
      result.textContent=Bnum.format(n);
      raw.textContent=n.toString();
      result.classList.remove("error");
    }catch(err){
      result.textContent="Cannot calculate";
      raw.textContent=err.message||"Invalid input";
      result.classList.add("error");
    }
  });
});
