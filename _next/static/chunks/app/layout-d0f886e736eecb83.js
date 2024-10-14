(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{7617:function(e,t,n){Promise.resolve().then(n.t.bind(n,9618,23)),Promise.resolve().then(n.t.bind(n,2046,23)),Promise.resolve().then(n.t.bind(n,6863,23)),Promise.resolve().then(n.t.bind(n,1670,23)),Promise.resolve().then(n.t.bind(n,2896,23)),Promise.resolve().then(n.bind(n,2724)),Promise.resolve().then(n.bind(n,4358)),Promise.resolve().then(n.bind(n,874))},7938:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(1418).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},5845:function(e,t,n){"use strict";n.d(t,{default:function(){return a.a}});var r=n(198),a=n.n(r)},4970:function(e,t,n){"use strict";var r=n(4085);n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}}),n.o(r,"useSearchParams")&&n.d(t,{useSearchParams:function(){return r.useSearchParams}})},198:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return o},getImageProps:function(){return l}});let r=n(8871),a=n(8968),s=n(5969),i=r._(n(6289));function l(e){let{props:t}=(0,a.getImgProps)(e,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/next-blog/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,n]of Object.entries(t))void 0===n&&delete t[e];return{props:t}}let o=s.Image},2724:function(e,t,n){"use strict";n.d(t,{BrandLogo:function(){return i}});var r=n(6943);n(7879);var a={src:"/next-blog/_next/static/media/logo-full.a2c57f51.svg",height:48,width:258,blurWidth:0,blurHeight:0},s=n(5845);function i(e){let{className:t,...n}=e;return(0,r.jsx)(s.default,{src:a,alt:"".concat("Terra","'s Devlog logo"),priority:!1,...n})}},4358:function(e,t,n){"use strict";n.d(t,{GlobalNavigationBar:function(){return b}});var r=n(6943),a=n(518),s=n(1003),i=n(4970),l=n(7879);let o=e=>{let[t,n]=(0,l.useState)(!1);return(0,l.useEffect)(()=>{let t=window.matchMedia(e),r=e=>{n(e.matches)};return n(t.matches),t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}},[e]),t},c=()=>{let e=o("(min-width: 1023px)"),t=o("(min-width: 601px)"),n=!t;return{isMobile:n,isTablet:t&&!e,isDesktop:e,isLargerThanTablet:e,isLargerThanMobile:t,isSmallerThanDesktop:!e,isSmallerThanTablet:n}};var d=n(885);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let u=(0,n(1418).Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);var f=n(7313),h=n(2724),m=n(6321);let x=[{href:"/posts",label:"Posts",disabled:!1},{href:"/tags",label:"Tags",disabled:!1},{href:"/about",label:"About Me",disabled:!0},{href:"/contact",label:"Contact",disabled:!0}];function b(e){let{className:t,...n}=e,{isSmallerThanDesktop:l}=c(),o=(0,i.usePathname)(),b=(0,m.q)(!1);return l?(0,r.jsxs)(d.dy.Root,{open:b.isOpen,onInteractOutside:b.close,onEscapeKeyDown:b.close,children:[(0,r.jsx)(d.dy.Trigger,{asChild:!0,children:(0,r.jsx)(d.hU,{variant:"ghost",className:(0,a.cx)(t),onClick:b.open,children:(0,r.jsx)(u,{})})}),(0,r.jsxs)(d.dy.Content,{className:"w-svw max-w-96 flex flex-col",children:[(0,r.jsxs)(d.dy.Title,{className:"w-full mt-4 self-start px-4 flex flex-row justify-between items-center",children:[(0,r.jsx)(h.BrandLogo,{}),(0,r.jsx)(d.dy.CloseTrigger,{asChild:!0,onClick:b.close,children:(0,r.jsx)(d.hU,{variant:"ghost",children:(0,r.jsx)(f.Z,{strokeWidth:1,size:24})})})]}),(0,r.jsx)(d.dy.Body,{className:"mt-8",children:(0,r.jsx)("nav",{children:(0,r.jsx)("menu",{className:"flex flex-col divide-y",children:x.map(e=>(0,r.jsx)("li",{className:(0,a.cx)(!e.disabled&&"hover:bg-black/5 duration-200"),children:(0,r.jsx)(s.default,{href:e.disabled?"":e.href,"aria-disabled":e.disabled,onClick:b.close,children:(0,r.jsx)(v,{active:o.startsWith(e.href),disabled:e.disabled,className:"h-12 leading-[48px] px-2 text-center",children:e.label})})},e.href))})})})]})]}):(0,r.jsx)("nav",{className:(0,a.cx)(t),...n,children:(0,r.jsx)("menu",{className:"flex flex-row gap-8",children:x.map(e=>(0,r.jsx)("li",{children:(0,r.jsx)(s.default,{href:e.disabled?"":e.href,"aria-disabled":e.disabled,children:(0,r.jsx)(v,{active:o.startsWith(e.href),disabled:e.disabled,children:e.label})})},e.href))})})}let v=e=>{let{active:t,disabled:n,children:s,className:i,...l}=e;return(0,r.jsx)("div",{className:(0,a.cx)("cursor-pointer","text-neutral-500 hover:text-neutral-900 duration-200 font-medium",t&&"text-primary hover:text-primary",n&&"cursor-not-allowed text-muted hover:text-muted",i),...l,children:s})}},874:function(e,t,n){"use strict";n.d(t,{SearchButton:function(){return l}});var r=n(6943),a=n(885),s=n(7938),i=n(518);function l(e){let{className:t,...n}=e;return(0,r.jsx)(a.hU,{size:"md",variant:"ghost",className:(0,i.cx)(t),...n,children:(0,r.jsx)(s.Z,{})})}},6321:function(e,t,n){"use strict";n.d(t,{q:function(){return a}});var r=n(7879);let a=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],[t,n]=(0,r.useState)(e);return{isOpen:t,close:()=>{n(!1)},open:()=>{n(!0)}}}},518:function(e,t,n){"use strict";n.d(t,{cx:function(){return s}});var r=n(689),a=n(1488);function s(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,r.m6)((0,a.Z)(...t))}},1670:function(){},2896:function(){},6863:function(e){e.exports={style:{fontFamily:"'__monospaceNeon_7691e4', '__monospaceNeon_Fallback_7691e4'"},className:"__className_7691e4",variable:"__variable_7691e4"}},2046:function(e){e.exports={style:{fontFamily:"'__pretendard_fa65fd', '__pretendard_Fallback_fa65fd'"},className:"__className_fa65fd",variable:"__variable_fa65fd"}}},function(e){e.O(0,[838,761,973,618,825,922,465,744],function(){return e(e.s=7617)}),_N_E=e.O()}]);