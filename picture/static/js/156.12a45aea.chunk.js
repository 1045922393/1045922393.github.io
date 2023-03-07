"use strict";(self.webpackChunkhi_react=self.webpackChunkhi_react||[]).push([[156],{156:function(t,i,e){e.r(i),e.d(i,{default:function(){return l}});var s=e(310),n=n||{json:null,screen:null,pointer:null,camera:null,loadJS:function(t,i,e){"string"==typeof t&&(t=[t]);for(var s=function(t){var s=document.createElement("script");i&&(s.readyState?s.onreadystatechange=function(){"loaded"!=s.readyState&&"complete"!=s.readyState||(s.onreadystatechange=null,0===--h&&i(e||!1))}:s.onload=function(){0===--h&&i(e||!1)}),s.src=t,document.getElementsByTagName("head")[0].appendChild(s)},n=0,h=t.length;n<h;n++)s(t[n])}};n.Screen=function(t){n.screen=this,this.elem=document.getElementById(t.container)||t.container,this.ctx="CANVAS"==this.elem.tagName&&this.elem.getContext("2d"),this.style=this.elem.style,this.left=0,this.top=0,this.width=0,this.height=0,this.cursor="default",this.setup=t,this.resize=function(){var t=this.elem;for(this.width=t.offsetWidth,this.height=t.offsetHeight,this.left=0,this.top=0;null!=t;t=t.offsetParent)this.left+=t.offsetLeft,this.top+=t.offsetTop;this.ctx&&(this.elem.width=this.width,this.elem.height=this.height),this.setup.resize&&this.setup.resize()},this.setCursor=function(t){t!==this.cursor&&"ontouchstart"in window===!1&&(this.cursor=t,this.style.cursor=t)},window.addEventListener("resize",(function(){n.screen.resize()}),!1),!this.setup.resize&&this.resize()},n.Pointer=function(t){n.pointer=this;var i=this,e=document.body,s=document.documentElement;this.setup=t,this.screen=n.screen,this.elem=this.screen.elem,this.X=0,this.Y=0,this.Xi=0,this.Yi=0,this.bXi=0,this.bYi=0,this.Xr=0,this.Yr=0,this.startX=0,this.startY=0,this.scale=0,this.wheelDelta=0,this.isDraging=!1,this.hasMoved=!1,this.isDown=!1,this.evt=!1;var h=0,r=0;if(t.tap&&(this.elem.onclick=function(){return!1}),t.documentMove||(document.ontouchmove=function(t){t.preventDefault()}),document.addEventListener("MSHoldVisual",(function(t){t.preventDefault()}),!1),"undefined"!=typeof this.elem.style.msTouchAction&&(this.elem.style.msTouchAction="none"),this.pointerDown=function(t){this.isDown||(this.elem.setCapture&&this.elem.setCapture(),this.isDraging=!1,this.hasMoved=!1,this.isDown=!0,this.evt=t,this.Xr=void 0!==t.clientX?t.clientX:t.touches[0].clientX,this.Yr=void 0!==t.clientY?t.clientY:t.touches[0].clientY,this.X=h=this.Xr-this.screen.left,this.Y=r=this.Yr-this.screen.top+(s&&s.scrollTop||e.scrollTop),this.setup.down&&this.setup.down(t))},this.pointerMove=function(t){this.Xr=void 0!==t.clientX?t.clientX:t.touches[0].clientX,this.Yr=void 0!==t.clientY?t.clientY:t.touches[0].clientY,this.X=this.Xr-this.screen.left,this.Y=this.Yr-this.screen.top+(s&&s.scrollTop||e.scrollTop),this.isDown&&(this.Xi=this.bXi+(this.X-h),this.Yi=this.bYi-(this.Y-r)),(Math.abs(this.X-h)>11||Math.abs(this.Y-r)>11)&&(this.hasMoved=!0,this.isDown?this.isDraging?this.setup.drag&&this.setup.drag(t):(this.startX=h,this.startY=r,this.setup.startDrag&&this.setup.startDrag(t),this.isDraging=!0):(h=this.X,r=this.Y)),this.setup.move&&this.setup.move(t)},this.pointerUp=function(t){this.bXi=this.Xi,this.bYi=this.Yi,this.hasMoved?this.setup.up&&this.setup.up(this.evt):(this.X=h,this.Y=r,this.setup.tap&&this.setup.tap(this.evt)),this.isDraging=!1,this.isDown=!1,this.hasMoved=!1,this.setup.up&&this.setup.up(this.evt),this.elem.releaseCapture&&this.elem.releaseCapture(),this.evt=!1},this.pointerCancel=function(t){this.elem.releaseCapture&&this.elem.releaseCapture(),this.isDraging=!1,this.hasMoved=!1,this.isDown=!1,this.bXi=this.Xi,this.bYi=this.Yi,h=0,r=0},"ontouchstart"in window&&(this.elem.ontouchstart=function(t){return i.pointerDown(t),!1},this.elem.ontouchmove=function(t){return i.pointerMove(t),!1},this.elem.ontouchend=function(t){return i.pointerUp(t),!1},this.elem.ontouchcancel=function(t){return i.pointerCancel(t),!1}),document.addEventListener("mousedown",(function(t){(t.target===i.elem||t.target.parentNode&&t.target.parentNode===i.elem||t.target.parentNode.parentNode&&t.target.parentNode.parentNode===i.elem)&&("undefined"!=typeof t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,t.preventDefault(),i.pointerDown(t))}),!1),document.addEventListener("mousemove",(function(t){i.pointerMove(t)}),!1),document.addEventListener("mouseup",(function(t){i.pointerUp(t)}),!1),document.addEventListener("gesturechange",(function(t){return t.preventDefault(),t.scale>1?i.scale=.1:t.scale<1?i.scale=-.1:i.scale=0,i.setup.scale&&i.setup.scale(t),!1}),!1),window.navigator.msPointerEnabled){var o=0,a=new window.MSGesture;a.target=this.elem,this.elem.addEventListener("MSPointerDown",(function(t){t.pointerType==t.MSPOINTER_TYPE_TOUCH&&(a.addPointer(t.pointerId),o++)}),!1),this.elem.addEventListener("MSPointerOut",(function(t){t.pointerType==t.MSPOINTER_TYPE_TOUCH&&o--}),!1),this.elem.addEventListener("MSGestureHold",(function(t){t.preventDefault()}),!1),this.elem.addEventListener("MSGestureChange",(function(t){return o>1&&(t.preventDefault&&t.preventDefault(),i.scale=t.velocityExpansion,i.setup.scale&&i.setup.scale(t)),!1}),!1)}window.addEventListener&&this.elem.addEventListener("DOMMouseScroll",(function(t){return t.preventDefault&&t.preventDefault(),i.wheelDelta=10*t.detail,i.setup.wheel&&i.setup.wheel(t),!1}),!1),this.elem.onmousewheel=function(t){return i.wheelDelta=.25*-t.wheelDelta,i.setup.wheel&&i.setup.wheel(t),!1}},n.transform3D={},n.transform3D.drawPoly=function(){this.ctx.beginPath(),this.ctx.moveTo(this.points[0].X,this.points[0].Y),this.ctx.lineTo(this.points[1].X,this.points[1].Y),this.ctx.lineTo(this.points[2].X,this.points[2].Y),this.ctx.lineTo(this.points[3].X,this.points[3].Y),this.ctx.closePath()},n.transform3D.Camera=function(t,i){n.camera=this,this.x=0,this.y=0,this.z=0,this.rx=0,this.ry=0,this.rz=0,this.focalLength=t.focalLength||500,this.easeTranslation=t.easeTranslation||.1,this.easeRotation=t.easeRotation||.025,this.enableRx=!t.disableRx,this.enableRy=!t.disableRy,this.enableRz=!t.disableRz,this.cmov=!1,this.cosX=1,this.sinX=0,this.cosY=1,this.sinY=0,this.cosZ=1,this.sinZ=0,this.target={over:!1,elem:!1,x:0,y:0,z:0,rx:0,ry:0,rz:0},i&&i.move&&(this.cmov=i.move)},n.transform3D.Camera.prototype.ease=function(t,i){for(;Math.abs(t-i)>Math.PI;)t<i?i-=2*Math.PI:i+=2*Math.PI;return(t-i)*this.easeRotation},n.transform3D.Camera.prototype.move=function(){this.cmov&&this.cmov(),this.x+=(this.target.x-this.x)*this.easeTranslation,this.y+=(this.target.y-this.y)*this.easeTranslation,this.z+=(this.target.z-this.z)*this.easeTranslation,this.enableRx&&(this.rx+=this.ease(this.target.rx,this.rx),this.cosX=Math.cos(this.rx),this.sinX=Math.sin(this.rx)),this.enableRy&&(this.ry+=this.ease(this.target.ry,this.ry),this.cosY=Math.cos(this.ry),this.sinY=Math.sin(this.ry)),this.enableRz&&(this.rz+=this.ease(this.target.rz,this.rz),this.cosZ=Math.cos(this.rz),this.sinZ=Math.sin(this.rz))},n.transform3D.Point=function(t,i,e,s,n){this.x=t,this.y=i,this.z=e,this.tx=s||0,this.ty=n||0,this.visible=!1,this.scale=0,this.X=0,this.Y=0,this.Z=0,this.next=!0},n.transform3D.Point.prototype.projection=function(){var t=this.scr.width>>1,i=this.scr.height>>1,e=this.x-this.camera.x,s=this.y-this.camera.y,n=this.z-this.camera.z;if(this.camera.enableRz)var h=this.camera.sinZ*s+this.camera.cosZ*e,r=this.camera.cosZ*s-this.camera.sinZ*e;else h=e,r=s;var o=this.camera.cosY*n+this.camera.sinY*h;return this.Z=this.camera.cosX*o-this.camera.sinX*r,this.scale=this.camera.focalLength/Math.max(1,this.Z),this.X=t+(this.camera.cosY*h-this.camera.sinY*n)*this.scale,this.Y=-(this.camera.y>>1)+i-(this.camera.sinX*o+this.camera.cosX*r)*this.scale,this.visible=this.X>.5*-t&&this.X<2.5*t&&this.Y>.5*-i&&this.Y<2.5*i,this.next},n.transform3D.Triangle=function(t,i,e,s){this.ctx=t.ctx,this.texture=t.texture,this.p0=i,this.p1=e,this.p2=s,this.d=i.tx*(s.ty-e.ty)-e.tx*s.ty+s.tx*e.ty+(e.tx-s.tx)*i.ty,this.pmy=e.ty-s.ty,this.pmx=e.tx-s.tx,this.pxy=s.tx*e.ty-e.tx*s.ty,t.t&&(t.t.next=!0)},n.transform3D.Triangle.prototype.draw=function(){if(this.p0.visible||this.p1.visible||this.p2.visible){var t,i,e,s=(this.p0.X+this.p1.X+this.p2.X)/3,n=(this.p0.Y+this.p1.Y+this.p2.Y)/3;this.ctx.save(),this.ctx.beginPath(),t=s-this.p0.X,i=n-this.p0.Y,e=Math.max(Math.abs(t),Math.abs(i)),this.ctx.moveTo(this.p0.X-t/e*2,this.p0.Y-i/e*2),t=s-this.p1.X,i=n-this.p1.Y,e=Math.max(Math.abs(t),Math.abs(i)),this.ctx.lineTo(this.p1.X-t/e*2,this.p1.Y-i/e*2),t=s-this.p2.X,i=n-this.p2.Y,e=Math.max(Math.abs(t),Math.abs(i)),this.ctx.lineTo(this.p2.X-t/e*2,this.p2.Y-i/e*2),this.ctx.closePath(),this.ctx.clip();var h=this.p2.X-this.p1.X,r=this.p1.Y-this.p2.Y,o=this.p2.ty*this.p1.X,a=this.p1.tx*this.p2.X,l=this.p2.ty*this.p1.Y,c=this.p1.ty*this.p2.X,p=this.p1.ty*this.p2.Y,u=this.p2.tx*this.p1.X,m=this.p1.tx*this.p2.Y,f=this.p2.tx*this.p1.Y;this.ctx.transform(-(this.p0.ty*h-c+o+this.pmy*this.p0.X)/this.d,(p+this.p0.ty*r-l-this.pmy*this.p0.Y)/this.d,(this.p0.tx*h-a+u+this.pmx*this.p0.X)/this.d,-(m+this.p0.tx*r-f-this.pmx*this.p0.Y)/this.d,(this.p0.tx*(o-c)+this.p0.ty*(a-u)+this.pxy*this.p0.X)/this.d,(this.p0.tx*(l-p)+this.p0.ty*(m-f)+this.pxy*this.p0.Y)/this.d),this.ctx.drawImage(this.texture,0,0),this.ctx.restore()}return this.next},n.transform3D.Image=function(t,i,e,s){this.parent=t,this.points=[],this.triangles=[],this.ctx=n.screen.ctx,this.pointer=n.pointer,this.texture=new Image,this.texture.src=i,this.isLoading=!0,this.callback=s,this.textureWidth=0,this.textureHeight=0,this.level=e||1,this.visible=!1,this.t=!1,this.dir=void 0,n.transform3D.Point.prototype.scr||(n.transform3D.Point.prototype.scr=n.screen,n.transform3D.Point.prototype.camera=n.camera)},n.transform3D.Image.prototype.drawPoly=n.transform3D.drawPoly,n.transform3D.Image.prototype.setLevel=function(t){this.points.length=0,this.triangles.length=0,this.level=t,this.loading()},n.transform3D.Image.prototype.loading=function(){if(this.texture.complete){this.isLoading=!1;var t=this.texture.width,i=this.texture.height;this.dir=this.dir||[0,t,t,0,0,0,i,i];var e=t/i;this.texture.width=700,this.texture.height=700/e,this.textureWidth=this.texture.width,this.textureHeight=this.texture.height,this.callback&&this.callback.isLoaded&&this.callback.isLoaded(this);for(var s,n=-1;s=this.points[++n];)s.tx=this.dir[n],s.ty=this.dir[n+4];this.triangulate(this.points[0],this.points[1],this.points[2],this.level),this.triangulate(this.points[0],this.points[2],this.points[3],this.level),this.points[this.points.length-1].next=!1}},n.transform3D.Image.prototype.subdivise=function(t,i){return{x:.5*(i.x+t.x),y:.5*(i.y+t.y),z:.5*(i.z+t.z),tx:.5*(i.tx+t.tx),ty:.5*(i.ty+t.ty)}},n.transform3D.Image.prototype.triangulate=function(t,i,e,s){if(0===--s)this.t=new n.transform3D.Triangle(this,t,i,e),this.triangles.push(this.t);else{var h=this.subdivise(t,i),r=this.subdivise(i,e),o=this.subdivise(e,t);this.points.push(h=new n.transform3D.Point(h.x,h.y,h.z,h.tx,h.ty)),this.points.push(r=new n.transform3D.Point(r.x,r.y,r.z,r.tx,r.ty)),this.points.push(o=new n.transform3D.Point(o.x,o.y,o.z,o.tx,o.ty)),this.triangulate(t,h,o,s),this.triangulate(h,i,r,s),this.triangulate(o,r,e,s),this.triangulate(h,r,o,s)}},n.transform3D.Image.prototype.transform3D=function(t){if(this.isLoading)return this.loading(),!1;for(var i=0;this.points[i++].projection(););if(t){var e=this.points[0],s=this.points[1],n=this.points[2];return(s.Y-e.Y)/(s.X-e.X)-(n.Y-e.Y)/(n.X-e.X)<0^e.X<=s.X==e.X>n.X}return!0},n.transform3D.Image.prototype.draw=function(){if(!this.isLoading)for(var t=0;this.triangles[t++].draw(););},n.transform3D.Image.prototype.isPointerInside=function(t,i){return this.drawPoly(this.points),this.ctx.isPointInPath(t,i)},window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,16)};var h=n;function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"html",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"add",e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";document.querySelector(t).classList[i](e)}var o=e(750),a=e(388);var l=function(){var t=(0,o.eb)(),i=window.pictureConfig.data;t&&t.endsWith("1")&&(!0,i=window.pPictureConfig.data);for(var e=[],n=function(){var t=Math.random()*i.length|0;e.push(i.find((function(i,e){return e===t})).path)},l=0;l<12;l++)n();return(0,s.useEffect)((function(){return r("html","add","html_photoWall_extends"),r("body","add","body_photoWall_extends"),function(){var t,i,e,s,n,r=[],o=[],a=0,l=[1,2],c=function(i,e){if(this.parent=i,this.ctx=t,this.color=e.fill||!1,this.points=[],!e.img){for(var s=0;s<4;s++)this.points[s]=new h.transform3D.Point(i.pc.x+e.x[s]*i.normalZ+e.z[s]*i.normalX,i.pc.y+e.y[s],i.pc.z+e.x[s]*i.normalX+-e.z[s]*i.normalZ);this.points[3].next=!1}},p=function(t,i,e){this.img=new h.transform3D.Image(this,t+i.img,1,{isLoaded:function(t){t.parent.isLoaded=!0,t.parent.loaded(t)}}),this.visible=!1,this.normalX=i.nx,this.normalZ=i.nz,this.pc=new h.transform3D.Point(i.x,i.y,i.z),this.tx=i.x+i.nx*Math.sqrt(s.focalLength)*20,this.tz=i.z-i.nz*Math.sqrt(s.focalLength)*20,this.poly=[];for(var n,r=-1;n=e[++r];)o[r]=!0===n.img?1:2,this.poly.push(new c(this,n))},u=function h(){t.clearRect(0,0,e.width,e.height),s.move();for(var l,c=-1;l=o[++c];){n=!1;for(var p,u=0;p=r[u++];)1===l&&p.draw()||p.visible&&p.poly[c].draw()}s.over&&!i.isDraging?e.setCursor("pointer"):e.setCursor("move"),a++,window.requestAnimFrame(h)};return c.prototype.draw=function(){var i=this.color;if(i.light||!n){var e=i.light?this.parent.light:1;n="rgba("+Math.round(i.r*e)+","+Math.round(i.g*e)+","+Math.round(i.b*e)+","+(i.a||1)+")",t.fillStyle=n}if(!i.light||this.parent.light<1){for(var s=0;this.points[s++].projection(););this.drawPoly(),t.fill()}},p.prototype.loaded=function(t){for(var i=[-1,1,1,-1,1,1,-1,-1],e=.5*t.texture.width,s=.5*t.texture.height,n=0;n<4;n++)t.points[n]=new h.transform3D.Point(this.pc.x+e*this.normalZ*i[n],this.pc.y+s*i[n+4],this.pc.z+e*this.normalX*i[n])},p.prototype.draw=function(){return this.pc.projection(),this.pc.Z>-(s.focalLength>>1)&&this.img.transform3D(!0)?(this.light=.5+.6*Math.abs(this.normalZ*s.cosY-this.normalX*s.sinY),this.visible=!0,this.img.draw(),(i.hasMoved||i.isDown)&&this.img.isPointerInside(i.X,i.Y)&&(s.over=this)):this.visible=!1,!0},{load:function(n){setTimeout((function(){!function(n){c.prototype.drawPoly=h.transform3D.drawPoly,e=new h.Screen({container:"canvas"}),t=e.ctx,e.resize(),i=new h.Pointer({tap:function(){if(s.over)if(s.over===s.target.elem)s.target.x=0,s.target.z=0,s.target.elem=!1;else{s.target.elem=s.over,s.target.x=s.over.tx,s.target.z=s.over.tz;for(var t,i=0;t=r[i++];){var e=s.target.x-t.pc.x,n=s.target.z-t.pc.z,h=Math.sqrt(e*e+n*n)>1500?l[0]:l[1];t.img.setLevel(h)}}}}),(s=new h.transform3D.Camera({focalLength:10*Math.sqrt(e.width),easeTranslation:.025,easeRotation:.06,disableRz:!0},{move:function(){this.over=!1,i.isDraging?(this.target.elem=!1,this.target.ry=.01*-i.Xi,this.target.rx=(i.Y-.5*e.height)/(.5*e.height)):this.target.elem&&(this.target.ry=Math.atan2(this.target.elem.pc.x-this.x,this.target.elem.pc.z-this.z)),this.target.rx*=.9}})).z=-1e4,s.py=0;for(var o,m=0;o=n.imgdata[m++];)r.push(new p(n.options.imagesPath,o,n.structure));setInterval((function(){l=a>50?[2,3]:[1,2],a=0}),1e3),u()}(n)}),500)}}}().load({imgdata:[{img:e[1],x:-1e3,y:0,z:1500,nx:0,nz:1},{img:e[2],x:0,y:0,z:1500,nx:0,nz:1},{img:e[3],x:1e3,y:0,z:1500,nx:0,nz:1},{img:e[4],x:1500,y:0,z:1e3,nx:-1,nz:0},{img:e[5],x:1500,y:0,z:0,nx:-1,nz:0},{img:e[6],x:1500,y:0,z:-1e3,nx:-1,nz:0},{img:e[7],x:1e3,y:0,z:-1500,nx:0,nz:-1},{img:e[8],x:0,y:0,z:-1500,nx:0,nz:-1},{img:e[9],x:-1e3,y:0,z:-1500,nx:0,nz:-1},{img:e[10],x:-1500,y:0,z:-1e3,nx:1,nz:0},{img:e[11],x:-1500,y:0,z:0,nx:1,nz:0},{img:e[0],x:-1500,y:0,z:1e3,nx:1,nz:0}],structure:[{fill:{r:255,g:255,b:255,light:1},x:[-1001,-490,-490,-1001],z:[-500,-500,-500,-500],y:[500,500,-500,-500]},{fill:{r:255,g:255,b:255,light:1},x:[-501,2,2,-500],z:[-500,-500,-500,-500],y:[500,500,-500,-500]},{fill:{r:255,g:255,b:255,light:1},x:[0,502,502,0],z:[-500,-500,-500,-500],y:[500,500,-500,-500]},{fill:{r:255,g:255,b:255,light:1},x:[490,1002,1002,490],z:[-500,-500,-500,-500],y:[500,500,-500,-500]},{fill:{r:0,g:0,b:0,a:.2},x:[-420,420,420,-420],z:[-500,-500,-500,-500],y:[150,150,-320,-320]},{fill:{r:0,g:0,b:0,a:.2},x:[-20,20,20,-20],z:[-500,-500,-500,-500],y:[250,250,150,150]},{fill:{r:0,g:0,b:0,a:.2},x:[-20,20,20,-20],z:[-500,-500,-500,-500],y:[-320,-320,-500,-500]},{fill:{r:0,g:0,b:0,a:.2},x:[-20,20,10,-10],z:[-500,-500,-100,-100],y:[-500,-500,-500,-500]},{fill:{r:32,g:32,b:32},x:[-50,50,50,-50],z:[-150,-150,-50,-50],y:[-500,-500,-500,-500]},{fill:{r:16,g:16,b:16},x:[-10,10,10,-10],z:[-100,-100,-100,-100],y:[300,300,-500,-500]},{fill:{r:255,g:255,b:255},x:[-320,-320,-320,-320],z:[0,-20,-20,0],y:[-190,-190,190,190]},{fill:{r:255,g:255,b:255},x:[320,320,320,320],z:[0,-20,-20,0],y:[-190,-190,190,190]},{img:!0},{fill:{r:255,g:128,b:0},x:[-50,50,50,-50],z:[450,450,550,550],y:[500,500,500,500]},{fill:{r:255,g:128,b:0},x:[-50,50,50,-50],z:[450,450,550,550],y:[-500,-500,-500,-500]}],options:{imagesPath:""}}),function(){r("html","remove","html_photoWall_extends"),r("body","remove","body_photoWall_extends")}})),(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("canvas",{id:"canvas",children:"\u4f60\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301HTML5\u753b\u5e03\u6280\u672f\uff0c\u8bf7\u4f7f\u7528\u8c37\u6b4c\u6d4f\u89c8\u5668\u3002"})})}},750:function(t,i,e){e.d(i,{EN:function(){return c},W1:function(){return l},eb:function(){return a}});var s=e(896),n=e(398),h=e(698),r=e(302),o=e(388);function a(){var t=(0,h.lr)(),i=(0,n.Z)(t,2),e=i[0];i[1];return e.get("p")||void 0}function l(){var t=(0,h.lr)(),i=(0,n.Z)(t,2),e=i[0];i[1];return e.get("page")||void 0}function c(t){return function(i){var e=(0,r.TH)(),n=(0,r.s0)(),a=(0,r.UO)(),l=(0,h.lr)();return(0,o.jsx)(t,(0,s.Z)((0,s.Z)({},i),{},{router:{location:e,navigate:n,params:a,search:l}}))}}},896:function(t,i,e){e.d(i,{Z:function(){return r}});var s=e(958);function n(t,i,e){return(i=(0,s.Z)(i))in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function h(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);i&&(s=s.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,s)}return e}function r(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?h(Object(e),!0).forEach((function(i){n(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):h(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}}}]);