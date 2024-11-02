(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[797],{1794:function(e,t,a){Promise.resolve().then(a.bind(a,7826))},7938:function(e,t,a){"use strict";a.d(t,{Z:function(){return l}});/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(1418).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},7313:function(e,t,a){"use strict";a.d(t,{Z:function(){return l}});/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(1418).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},5845:function(e,t,a){"use strict";a.d(t,{default:function(){return n.a}});var l=a(198),n=a.n(l)},4970:function(e,t,a){"use strict";var l=a(4085);a.o(l,"usePathname")&&a.d(t,{usePathname:function(){return l.usePathname}}),a.o(l,"useSearchParams")&&a.d(t,{useSearchParams:function(){return l.useSearchParams}})},198:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{default:function(){return i},getImageProps:function(){return c}});let l=a(8871),n=a(8968),s=a(5969),r=l._(a(6289));function c(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:r.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/next-blog/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let i=s.Image},7826:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return N}});var l=a(6943),n=a(5676),s=a(8625),r=a(1003),c=a(7879),i=a(518);let u=async e=>{await new Promise(t=>{setTimeout(()=>{t()},e)})},d=async(e,t)=>{await u(e),t()};var o=a(5845),h={src:"/next-blog/_next/static/media/pepe-sad.83ae5666.png",height:1037,width:1092,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAYFBMVEVZiz+KZjRHbTVVhzxQgjYCO+JSgDlMaXFZiThTf0AnXplJci54azMAIrsDOtVpYydzjGSGUC5OXEdhfTiouZ5jc1tNeTRdkD5ThUQSR7pjfTmHXjBei0pLfldBZy9nd17+xCvLAAAAHXRSTlP9/ne1/fuRAO/b7ib+PO5N/pT7n/z2of///////ja1kmcAAAAJcEhZcwAACxMAAAsTAQCanBgAAABESURBVHicBcGHAYAgEASwA4EHe7+nqPtvaQIZUrxTEEhHB+csArHu53chku1tagGUQvBA5FirMRv6R1XTIvA+5zxP8gN2RwOaEF0R0gAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8},f=a(7938),m=a(7313);let x=(0,c.forwardRef)((e,t)=>{let{onChangeSearch:a,onClearSearch:n,value:s,placeholder:r,defaultValue:c,className:u,...d}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("label",{className:"relative flex-1",children:[(0,l.jsx)(f.Z,{size:20,className:"absolute left-3 top-1/2 -translate-y-1/2"}),(0,l.jsx)("input",{type:"search",placeholder:r,ref:t,className:(0,i.cx)("peer","w-full h-full rounded-lg text-md bg-white caret-primary pl-10 pr-10","duration-200","border-2 focus:outline-none border-primary-500 focus:ring-4 focus:ring-primary-200","focus-visible:outline-none focus-visible:border-primary",u),value:s,onChange:e=>{let t=e.currentTarget.value;null==a||a(t)},...d}),(0,l.jsx)("button",{id:"search-cancel-btn",className:(0,i.cx)("peer-placeholder-shown:hidden absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex justify-center place-items-center"),type:"button",onClick:()=>{null==a||a("")},children:(0,l.jsx)(m.Z,{size:20})})]})})});x.displayName="SearchInput";var p=a(830),g=a(7658),j=a(8067),A=a(4970),b=a(885),v=a(9205);let y="/next-blog";function N(){return(0,l.jsx)(c.Suspense,{children:(0,l.jsx)(w,{})})}let w=()=>{let e=(0,A.useSearchParams)().get("q"),t=(0,p.k)(e)||""===e,[a,u]=(0,c.useState)([]),f=(0,c.useMemo)(()=>!e||a.length<=0?null:(0,s.yC)(e,a,{keys:["data.title","data.tags","data.summary","content"]}),[e,a]),m=(0,c.useRef)(null),[v,N]=(0,c.useState)(null!=e?e:""),w=async()=>{let e=await (0,s.Fc)();(0,g.g)(e)||u(e.value)},P=[...a.map(e=>e.data.tags).flat().reduce((e,t)=>{var a;return e.set(t,(null!==(a=e.get(t))&&void 0!==a?a:0)+1)},new Map).entries()];return(0,n.b)(()=>{d(200,()=>{var e;null===(e=m.current)||void 0===e||e.focus()}),w()}),(0,l.jsxs)("search",{className:(0,i.cx)("rounded-md flex flex-col items-center"),children:[(0,l.jsxs)("fieldset",{className:"rounded-lg w-full pt-20 pb-6 flex flex-col place-items-center",children:[(0,l.jsx)("h2",{className:"text-5xl font-bold mb-8",children:"Search"}),(0,l.jsx)("form",{className:"w-full max-w-[568px] flex flex-col gap-4",action:"".concat(y,"/search?q=").concat(v),method:"get",children:(0,l.jsx)(x,{className:"flex-1 h-11",placeholder:"Type to search",value:v,onChangeSearch:e=>{N(null!=e?e:"")},onClearSearch:()=>{N("")},ref:m,name:"q"})})]}),t&&(0,l.jsx)("ul",{className:"flex flex-row gap-3 flex-wrap justify-center",children:P.map(e=>{let[t,a]=e;return(0,l.jsx)("li",{children:(0,l.jsx)(r.default,{href:"".concat(y,"/tags/").concat(t),className:"rounded-full",children:(0,l.jsx)(j.V,{children:"".concat(t," (").concat(a,")")})})},t)})}),(0,l.jsx)("div",{className:"text-left w-full mt-16",children:!t&&(0,l.jsxs)(l.Fragment,{children:[(0,p.k)(f)&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(b.Od,{className:"",children:(0,l.jsx)("strong",{className:"block text-3xl font-bold",children:"loading..."})}),(0,l.jsx)(b.Od,{className:"mt-4 block h-32"})]}),!(0,p.k)(f)&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("strong",{className:"block text-3xl font-bold mb-12",children:[(0,l.jsxs)(S,{children:['"',e,'"']})," 검색 결과:"," ",(0,l.jsx)(S,{children:null==f?void 0:f.length}),"개의 포스트"]}),f.length<=0&&(0,l.jsxs)("div",{className:"flex flex-col place-items-center mt-16",children:[(0,l.jsx)(o.default,{src:h,alt:"pepe-sad",width:192,height:0}),(0,l.jsx)("p",{className:"text-lg mt-8",children:"검색 결과가 없습니다요..."})]}),f.length>0&&(0,l.jsx)("ul",{className:"mt-4",children:f.map(e=>(0,l.jsx)("li",{className:"mb-4 last:mb-0 border-b first:border-t",children:(0,l.jsx)(k,{result:e})},e.refIndex))})]})]})})]})},k=e=>{let{result:t,className:a,...n}=e,{item:s,matches:c}=t,u=null==c?void 0:c.find(e=>"data.title"===e.key),d=null==c?void 0:c.find(e=>"data.summary"===e.key);return(0,l.jsxs)(v.sv,{className:(0,i.cx)("rounded-md p-4",a),...n,children:[(0,l.jsx)(r.default,{href:"/posts/".concat(s.data.slug),className:"hover:underline",children:(0,l.jsx)(v.Rz,{children:u&&u.value&&u.indices?P(u.value,u.indices).map((e,t)=>t%2==1?(0,l.jsx)(S,{children:e},t):e):s.data.title})}),(0,l.jsx)(v.Q_,{children:d&&d.value&&d.indices?P(d.value,d.indices).map((e,t)=>t%2==1?(0,l.jsx)(S,{children:e},t):e):s.data.summary}),(0,l.jsx)("div",{className:"mt-2 flex flex-row flex-wrap gap-2.5",children:s.data.tags.map(e=>(0,l.jsx)(r.default,{href:"/tags/".concat(e),children:(0,l.jsx)(j.V,{theme:"primary",children:e})},e))})]})},S=e=>{let{children:t}=e;return(0,l.jsx)("span",{className:"text-primary",children:t})};function P(e,t){let a=[],l=0;return t.forEach(t=>{let[n,s]=t;a.push(e.slice(l,n)),a.push(e.slice(n,s+1)),l=s+1}),a.push(e.slice(l)),a}}},function(e){e.O(0,[973,618,176,83,673,556,922,465,744],function(){return e(e.s=1794)}),_N_E=e.O()}]);