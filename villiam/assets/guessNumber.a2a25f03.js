import{d as h,r as a,o as b,b as m,e as s,w as f,v as x,h as g,t as c,i as B,f as F,p as y,j as N,u as k,_ as C}from"./index.6ac86003.js";const i=o=>(y("data-v-76105dc9"),o=o(),N(),o),V={class:"guessNumber"},w={class:"control",for:"input"},D=B(" \u70B9\u51FB\u8F93\u5165 "),I=["onKeyup"],M=i(()=>s("div",{class:"line_break_10"},null,-1)),S=i(()=>s("div",{class:"line_break_10"},null,-1)),E={class:"outline"},K={class:"box left-box"},$=i(()=>s("div",{class:"line"},null,-1)),T={class:"box right-box"},j=h({__name:"guessNumber",setup(o){k(r=>({"526dbac8":n.value}));const l=a(),t=a(0),u=a(100),n=a(0),e=a(0);b(()=>{_()});function v(){if(e.value<t.value||e.value>u.value){alert(`\u8303\u56F4${t.value}-${u.value}`);return}if(e.value==l.value){alert(`\u5623!!!\u4F60${Math.random()<.5?"\u8F93":"\u8D62"}\u4E86!`),n.value=1;return}e.value<l.value?t.value=e.value:u.value=e.value}function _(){e.value=0,t.value=0,u.value=100,n.value=0,l.value=Math.random()*100|0}return(r,d)=>(F(),m("div",V,[s("label",w,[D,f(s("input",{id:"input",type:"number",class:"input_box","onUpdate:modelValue":d[0]||(d[0]=p=>e.value=p),onKeyup:g(v,["enter"])},null,40,I),[[x,e.value]])]),M,s("div",{class:"target",onClick:_},"\u70B9\u51FB\u91CD\u65B0\u5F00\u59CB\u6E38\u620F: "+c(l.value),1),S,s("div",E,[s("div",K,c(t.value),1),$,s("div",T,c(u.value),1)])]))}});const R=C(j,[["__scopeId","data-v-76105dc9"]]);export{R as default};