import{d as J,r as h,h as O,i as x,o as z,c as G,a as s,t as k,y as l,C as P,f as V,p as $,g as j,_ as q}from"./index.bf43678d.js";const C=v=>($("data-v-9de3db6c"),v=v(),j(),v),H={class:"snake_container"},K=C(()=>s("div",{style:{height:"10px"}},null,-1)),Q=C(()=>s("div",{style:{height:"10px"}},null,-1)),W=C(()=>s("div",{style:{height:"10px"}},null,-1)),X=["width","height"],Y=J({__name:"snake",setup(v){function I(e,n,o){e.fillStyle=n,e.fillRect(...o)}function D(e){return I.bind(null,e)}let t={snake:[[0,100],[10,100],[20,100],[30,100],[40,100]],headColor:"#ff5732",bodyColor:"#3cb056",foodColor:"#ff5732",time:15,w:400,h:300},c,w=null,p=null,_=h("ArrowRight"),u=h(0),m=O(()=>u.value<=0?1:u.value>=10?10:u.value);const i=10;let r=h("unStart"),a=[],d=h([0,0]),A=()=>{};const R=()=>{p||(w=document.getElementById("ctx"),p=w==null?void 0:w.getContext("2d")),c=D(p),c("#eee",[0,0,t.w,t.h])},L=new Map([["ArrowRight",["ArrowUp","ArrowDown"]],["ArrowLeft",["ArrowUp","ArrowDown"]],["ArrowUp",["ArrowLeft","ArrowRight"]],["ArrowDown",["ArrowLeft","ArrowRight"]]]);document.addEventListener("keydown",e=>{e.preventDefault();const n=e.code;B(n)});function B(e){var n;["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(e)&&r.value==="start"&&((n=L.get(_.value))==null?void 0:n.includes(e))&&(_.value=e)}function E(){c(t.foodColor,[...d.value,i,i])}function M(){a.forEach((e,n)=>{c(n===a.length-1?t.headColor:t.bodyColor,[...e,i,i])})}function y(){d.value[0]=(Math.random()*(t.w-9)/10|0)*10,d.value[1]=(Math.random()*(t.h-9)/10|0)*10}function T(){if(r.value!=="start")return;const e=_.value,n=a[a.length-1],o=[n[0],n[1]];if(e==="ArrowRight"||e==="ArrowLeft"?o[0]=o[0]+10*(e==="ArrowRight"?1:-1):o[1]=o[1]+10*(e==="ArrowDown"?1:-1),o[0]<0&&(o[0]=t.w-10),o[1]<0&&(o[1]=t.h-10),o[0]>t.w-10&&(o[0]=0),o[1]>t.h-10&&(o[1]=0),a.push(o),!U(o)){const b=a.shift();c("#eee",[b[0],b[1],i,i])}}function U(e){return e[0]===d.value[0]&&e[1]===d.value[1]?(u.value++,f.value+=m.value<=5?10-m.value:5,A(),A=F(),y(),!0):!1}function F(){const e=setInterval(()=>{r.value==="start"&&(T(),E(),M())},110-m.value*10);return()=>{clearInterval(e)}}let f=h(10),g=()=>{};function N(){const e=setInterval(()=>{f.value--},1e3);return()=>{clearInterval(e)}}x(()=>f.value,e=>{e<=0&&(r.value="unStart",alert("\u6E38\u620F\u7ED3\u675F,\u4F60\u7684\u5F97\u5206\u662F"+u.value),p.clearRect(0,0,t.w,t.h),R())}),x(()=>r.value,e=>{switch(e){case"start":g=N();break;case"unStart":g(),S();break;case"pause":g();break}});function S(){a=JSON.parse(JSON.stringify(t.snake)),f.value=t.time,y(),u.value=0,_.value="ArrowRight",A(),A=F()}return z(()=>{R(),S()}),(e,n)=>(V(),G("div",H,[s("button",{onClick:n[0]||(n[0]=o=>P(r)?r.value=l(r)==="start"?"pause":"start":r=l(r)==="start"?"pause":"start")},k(l(r)==="start"?"\u6682\u505C":"\u5F00\u59CB")+"\u6E38\u620F ",1),K,s("div",null,"\u5F97\u5206: "+k(l(u)),1),Q,s("div",null,"\u6E38\u620F\u89C4\u5219: \u522B\u8BA9\u98DF\u7269\u66B4\u9732\u5728\u7A7A\u6C14"+k(l(f))+"\u79D2!!!",1),W,s("canvas",{id:"ctx",width:l(t).w,height:l(t).h},null,8,X)]))}});const ee=q(Y,[["__scopeId","data-v-9de3db6c"]]);export{ee as default};
