"use strict";(self.webpackChunkhi_react=self.webpackChunkhi_react||[]).push([[292],{703:function(e,t,a){a.d(t,{Z:function(){return n}});var s=a(302),r=a(388);var n=function(e){var t=(0,s.s0)();return(0,r.jsx)("div",{className:"back_btn",style:e.style,onClick:function(){t(e.path||"/")},children:e.text||"B"})}},292:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var s=a(691),r=a(398),n=a(302),i=a(599),c=a(310),l=a(703),o=a(388);var d=function(){var e,t,a,d,u,v,m=(0,n.s0)(),x=(0,c.useState)([]),p=(0,r.Z)(x,2),h=p[0],g=p[1],f=(0,c.useState)(0),y=(0,r.Z)(f,2),j=y[0],_=y[1],N=window,L=N.gsap,S=N.imagesLoaded;return(0,c.useEffect)((function(){g(window.pictureConfig.data);var e=document.querySelector("body");e.classList.add("body_extend");var t={prev:document.querySelector(".btn--left"),next:document.querySelector(".btn--right")},a=document.querySelector(".cards__wrapper"),r=document.querySelector(".app__bg"),n=document.querySelector(".info__wrapper");function i(e){var s=a.querySelector(".current--card"),i=a.querySelector(".previous--card"),o=a.querySelector(".next--card"),d=r.querySelector(".current--image"),u=r.querySelector(".previous--image"),v=r.querySelector(".next--image");!function(e){var a=n.querySelector(".current--info"),s=n.querySelector(".previous--info"),r=n.querySelector(".next--info");function i(){a.classList.remove("current--info"),s.classList.remove("previous--info"),r.classList.remove("next--info"),"right"===e?(a.classList.add("previous--info"),r.classList.add("current--info"),s.classList.add("next--info")):"left"===e&&(a.classList.add("next--info"),r.classList.add("previous--info"),s.classList.add("current--info"))}L.timeline().to([t.prev,t.next],{duration:.2,opacity:.5,pointerEvents:"none"}).to(a.querySelectorAll(".text"),{duration:.4,stagger:.1,translateY:"-120px",opacity:0},"-=").call((function(){i(e)})).call((function(){return l()})).fromTo("right"===e?r.querySelectorAll(".text"):s.querySelectorAll(".text"),{opacity:0,translateY:"40px"},{duration:.4,stagger:.1,translateY:"0px",opacity:1}).to([t.prev,t.next],{duration:.2,opacity:1,pointerEvents:"all"})}(e),s.classList.remove("current--card"),i.classList.remove("previous--card"),o.classList.remove("next--card"),d.classList.remove("current--image"),u.classList.remove("previous--image"),v.classList.remove("next--image"),s.style.zIndex="50",d.style.zIndex="-2","right"===e?(i.style.zIndex="20",o.style.zIndex="30",v.style.zIndex="-1",s.classList.add("previous--card"),i.classList.add("next--card"),o.classList.add("current--card"),d.classList.add("previous--image"),u.classList.add("next--image"),v.classList.add("current--image")):"left"===e&&(i.style.zIndex="30",o.style.zIndex="20",u.style.zIndex="-1",s.classList.add("next--card"),i.classList.add("current--card"),o.classList.add("previous--card"),d.classList.add("next--image"),u.classList.add("current--image"),v.classList.add("previous--image")),s.removeEventListener("pointermove",c)}function c(e){var t=e.currentTarget,a=t.getBoundingClientRect(),s=a.left+a.width/2,r=(a.top,a.height,Math.atan2(e.pageX-s,0)*(35/Math.PI));L.set(t,{"--current-card-rotation-offset":"".concat(r,"deg")});var i=n.querySelector(".current--info");L.set(i,{rotateY:"".concat(r,"deg")})}function l(){var e=a.querySelector(".current--card");e.addEventListener("pointermove",c),e.addEventListener("pointerout",(function(e){!function(e){var t=e.currentTarget,a=n.querySelector(".current--info");L.set(t,{"--current-card-rotation-offset":0}),L.set(a,{rotateY:0})}(e)}))}t.next.addEventListener("click",(function(){return i("right")})),t.prev.addEventListener("click",(function(){return i("left")})),l();return function(){var e=(0,s.Z)(document.querySelectorAll("img")),r=e.length,i=0,c=document.querySelector(".loader span");L.set(a.children,{"--card-translateY-offset":"100vh"}),L.set(n.querySelector(".current--info").querySelectorAll(".text"),{translateY:"40px",opacity:0}),L.set([t.prev,t.next],{pointerEvents:"none",opacity:"0"}),e.forEach((function(e){S(e,(function(e){if(e.isComplete){var s=++i/r;L.to(c,{duration:1,scaleX:s,backgroundColor:"hsl(".concat(120*s,", 100%, 50%")}),r==i&&L.timeline().to(".loading__wrapper",{duration:.8,opacity:0,pointerEvents:"none"}).call((function(){L.timeline().to(a.children,{delay:.15,duration:.5,stagger:{ease:"power4.inOut",from:"right",amount:.1},"--card-translateY-offset":"0%"}).to(n.querySelector(".current--info").querySelectorAll(".text"),{delay:.5,duration:.4,stagger:.1,opacity:1,translateY:0}).to([t.prev,t.next],{duration:.4,opacity:1,pointerEvents:"all"},"-=0.4")}))}}))}))}(),function(){console.log("Content Component is going"),e.classList.remove("body_extend")}})),(0,c.useEffect)((function(){var e=new Date("2022-05-14 00:00:00"),t=new Date,a=Math.ceil((t-e)/864e5);_(a)})),window.addEventListener("click",(function(e){var t,a,s,r,n,c,l,o;"link_img"===(null===(t=e.target.childNodes[0])||void 0===t||null===(a=t.childNodes[0])||void 0===a?void 0:a.className)&&null!==(s=e.target.childNodes[0])&&void 0!==s&&null!==(r=s.childNodes[0])&&void 0!==r&&null!==(n=r.dataset)&&void 0!==n&&n.contents&&m("".concat(i.v.homepage).concat(null===(c=e.target.childNodes[0])||void 0===c||null===(l=c.childNodes[0])||void 0===l||null===(o=l.dataset)||void 0===o?void 0:o.contents," "))})),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"app contents",children:[(0,o.jsx)(l.Z,{text:(j+"").slice(-3,-2),path:"/album3d",style:{right:"150px"}}),(0,o.jsx)(l.Z,{text:(j+"").slice(-2,-1),path:"/albumWall",style:{right:"100px"}}),(0,o.jsx)(l.Z,{text:(j+"").slice(-1),style:{right:"50px"},path:"/message"}),(0,o.jsxs)("div",{className:"cardList",children:[(0,o.jsx)("button",{className:"cardList__btn btn btn--left",children:(0,o.jsx)("div",{className:"icon"})}),(0,o.jsxs)("div",{className:"cards__wrapper",children:[(0,o.jsx)("div",{className:"card current--card",children:(0,o.jsx)("div",{className:"card__image",children:(0,o.jsx)("img",{className:"link_img","data-contents":"/photoWall",src:null===(e=h[0])||void 0===e?void 0:e.path,alt:""})})}),(0,o.jsx)("div",{className:"card next--card",children:(0,o.jsx)("div",{className:"card__image",children:(0,o.jsx)("img",{className:"link_img","data-contents":"/picture",src:null===(t=h[1])||void 0===t?void 0:t.path,alt:""})})}),(0,o.jsx)("div",{className:"card previous--card",children:(0,o.jsx)("div",{className:"card__image",children:(0,o.jsx)("img",{className:"link_img","data-contents":"/photo",src:null===(a=h[2])||void 0===a?void 0:a.path,alt:""})})})]}),(0,o.jsx)("button",{className:"cardList__btn btn btn--right",children:(0,o.jsx)("div",{className:"icon"})})]}),(0,o.jsx)("div",{className:"infoList",children:(0,o.jsxs)("div",{className:"info__wrapper",children:[(0,o.jsxs)("div",{className:"info current--info",children:[(0,o.jsxs)("h1",{className:"text name",children:["\u4eba\u751f\u82e5\u53ea\u5982\u521d\u89c1\uff0c"," ",(0,o.jsx)("br",{}),"\u4f55\u4e8b\u79cb\u98ce\u60b2\u753b\u6247\u3002"]}),(0,o.jsx)("h4",{className:"text location",children:"\u7eb3\u5170\u6027\u5fb7"}),(0,o.jsx)("p",{className:"text description",children:"\u6728\u5170\u8bcd"})]}),(0,o.jsxs)("div",{className:"info next--info",children:[(0,o.jsxs)("h1",{className:"text name",children:["\u6267\u5b50\u4e4b\u624b\uff0c",(0,o.jsx)("br",{}),"\u4e0e\u5b50\u5055\u8001\u3002"]}),(0,o.jsx)("h4",{className:"text location",children:"\u5148\u79e6"}),(0,o.jsx)("p",{className:"text description",children:"\u8bd7\u7ecf\xb7\u51fb\u9f13"})]}),(0,o.jsxs)("div",{className:"info previous--info",children:[(0,o.jsxs)("h1",{className:"text name",children:["\u4eba\u9762\u4e0d\u77e5\u4f55\u5904\u53bb\uff0c",(0,o.jsx)("br",{}),"\u6843\u82b1\u4f9d\u65e7\u7b11\u6625\u98ce\u3002"]}),(0,o.jsx)("h4",{className:"text location",children:"\u5d14\u62a4"}),(0,o.jsx)("p",{className:"text description",children:"\u9898\u90fd\u57ce\u5357\u5e84"})]})]})}),(0,o.jsxs)("div",{className:"app__bg",children:[(0,o.jsx)("div",{className:"app__bg__image current--image",children:(0,o.jsx)("img",{src:null===(d=h[0])||void 0===d?void 0:d.path,alt:""})}),(0,o.jsx)("div",{className:"app__bg__image next--image",children:(0,o.jsx)("img",{src:null===(u=h[1])||void 0===u?void 0:u.path,alt:""})}),(0,o.jsx)("div",{className:"app__bg__image previous--image",children:(0,o.jsx)("img",{src:null===(v=h[2])||void 0===v?void 0:v.path,alt:""})})]}),(0,o.jsxs)("div",{className:"loading__wrapper",children:[(0,o.jsx)("div",{className:"loader--text",children:"Loading..."}),(0,o.jsx)("div",{className:"loader",children:(0,o.jsx)("span",{})})]})]})})}}}]);