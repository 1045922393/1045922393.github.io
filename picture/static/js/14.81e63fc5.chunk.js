"use strict";(self.webpackChunkhi_react=self.webpackChunkhi_react||[]).push([[14],{9014:function(e,n,t){t.r(n),t.d(n,{default:function(){return r}});var l=t(2398),u=t(2310),a=t(2388),c=(0,u.forwardRef)((function(e,n){return(0,a.jsx)("input",{ref:n,onChange:function(n){e.emitChange(n.target.value)},placeholder:"please input value!",type:"text",value:e.value})}));function i(e){return(0,a.jsx)("select",{value:e.defaultValue,onChange:function(n){e.emitChange(n.target.value)},children:e.options.map((function(e){return(0,a.jsx)("option",{value:e.value,children:e.label},e.value)}))})}var r=function(){var e=(0,u.useRef)(null),n=(0,u.useState)("Default"),t=(0,l.Z)(n,2),r=t[0],o=t[1];(0,u.useEffect)((function(){e.current.focus()}),[]);var s=(0,u.useState)(2),h=(0,l.Z)(s,2),d=h[0],f=h[1],v=(0,u.useState)(1),x=(0,l.Z)(v,2),j=x[0],g=x[1],C=(0,u.useCallback)((function(){console.log("currentPage:",j)}),[]),b=function(e){g(j+e)};return(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{children:"ReactDemo"}),(0,a.jsx)("h2",{children:"Input \u8f93\u5165\u6846"}),(0,a.jsx)(c,{ref:e,value:r,emitChange:function(e){o(e)}}),(0,a.jsx)("h2",{children:"select \u9009\u62e9\u6846"}),"\u6027\u522b:",(0,a.jsx)(i,{defaultValue:d,emitChange:function(e){console.log("Debugger ~ file: index.js:15 ~ handleChangeSelect ~ val:",e),f(e)},options:[{value:1,label:"\u7537"},{value:2,label:"\u5973"}]}),(0,a.jsx)("h2",{children:"useCallback"}),(0,a.jsxs)("div",{children:["Page value is ",j]}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:function(){return b(1)},children:"Add"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:function(){return C()},children:"useCallbackBtn"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:function(){console.log("currentPage:",j)},children:"normalBtn"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:function(){return b(-1)},children:"Reduce"})})]})}}}]);