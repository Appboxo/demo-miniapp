(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{11:function(e,t,n){e.exports=function(){"use strict";var e=function(){return(e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function t(e,t,n,r){return new(n=n||Promise)((function(a,o){function i(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?a(e.value):new n((function(t){t(e.value)})).then(i,s)}c((r=r.apply(e,t||[])).next())}))}function n(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=0<(a=i.trys).length&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(s){o=[6,s],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}var r,a=(function(e,t){var n;n=function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(r){function a(){}function o(t,n,o){if("undefined"!=typeof document){"number"==typeof(o=e({path:"/"},a.defaults,o)).expires&&(o.expires=new Date(1*new Date+864e5*o.expires)),o.expires=o.expires?o.expires.toUTCString():"";try{var i=JSON.stringify(n);/^[\{\[]/.test(i)&&(n=i)}catch(t){}n=r.write?r.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var s="";for(var c in o)o[c]&&(s+="; "+c,!0!==o[c]&&(s+="="+o[c].split(";")[0]));return document.cookie=t+"="+n+s}}function i(e,n){if("undefined"!=typeof document){for(var a={},o=document.cookie?document.cookie.split("; "):[],i=0;i<o.length;i++){var s=o[i].split("="),c=s.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var l=t(s[0]);if(c=(r.read||r)(c,l)||t(c),n)try{c=JSON.parse(c)}catch(e){}if(a[l]=c,e===l)break}catch(e){}}return e?a[e]:a}}return a.set=o,a.get=function(e){return i(e,!1)},a.getJSON=function(e){return i(e,!0)},a.remove=function(t,n){o(t,"",e(n,{expires:-1}))},a.defaults={},a.withConverter=n,a}((function(){}))},e.exports=n()}(r={exports:{}}),r.exports),o="URLSearchParams"in self,i="Symbol"in self&&"iterator"in Symbol,s="FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(r){return!1}}(),c="FormData"in self,l="ArrayBuffer"in self;if(l)var u=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],p=ArrayBuffer.isView||function(e){return e&&-1<u.indexOf(Object.prototype.toString.call(e))};function f(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function d(e){return"string"!=typeof e&&(e=String(e)),e}function b(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return i&&(t[Symbol.iterator]=function(){return t}),t}function h(e){this.map={},e instanceof h?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function m(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function g(e){return new Promise((function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function y(e){var t=new FileReader,n=g(t);return t.readAsArrayBuffer(e),n}function v(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function E(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:s&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:c&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:o&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():l&&s&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=v(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):l&&(ArrayBuffer.prototype.isPrototypeOf(e)||p(e))?this._bodyArrayBuffer=v(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):o&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s&&(this.blob=function(){var e=m(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?m(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(y)}),this.text=function(){var e=m(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,n=g(t);return t.readAsText(e),n}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},c&&(this.formData=function(){return this.text().then(k)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(e,t){e=f(e),t=d(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},h.prototype.delete=function(e){delete this.map[f(e)]},h.prototype.get=function(e){return e=f(e),this.has(e)?this.map[e]:null},h.prototype.has=function(e){return this.map.hasOwnProperty(f(e))},h.prototype.set=function(e,t){this.map[f(e)]=d(t)},h.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},h.prototype.keys=function(){var e=[];return this.forEach((function(t,n){e.push(n)})),b(e)},h.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),b(e)},h.prototype.entries=function(){var e=[];return this.forEach((function(t,n){e.push([n,t])})),b(e)},i&&(h.prototype[Symbol.iterator]=h.prototype.entries);var w=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function A(e,t){var n=(t=t||{}).body;if(e instanceof A){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new h(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new h(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<w.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function k(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),a=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(a))}})),t}function x(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new h(t.headers),this.url=t.url||"",this._initBody(e)}A.prototype.clone=function(){return new A(this,{body:this._bodyInit})},E.call(A.prototype),E.call(x.prototype),x.prototype.clone=function(){return new x(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},x.error=function(){var e=new x(null,{status:0,statusText:""});return e.type="error",e};var O=[301,302,303,307,308];x.redirect=function(e,t){if(-1===O.indexOf(t))throw new RangeError("Invalid status code");return new x(null,{status:t,headers:{location:e}})};var B=self.DOMException;try{new B}catch(r){(B=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack}).prototype=Object.create(Error.prototype),B.prototype.constructor=B}function S(e,t){return new Promise((function(n,r){var a=new A(e,t);if(a.signal&&a.signal.aborted)return r(new B("Aborted","AbortError"));var o=new XMLHttpRequest;function i(){o.abort()}o.onload=function(){var e={status:o.status,statusText:o.statusText,headers:function(e){var t=new h;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var n=e.split(":"),r=n.shift().trim();if(r){var a=n.join(":").trim();t.append(r,a)}})),t}(o.getAllResponseHeaders()||"")};e.url="responseURL"in o?o.responseURL:e.headers.get("X-Request-URL");var t="response"in o?o.response:o.responseText;n(new x(t,e))},o.onerror=function(){r(new TypeError("Network request failed"))},o.ontimeout=function(){r(new TypeError("Network request failed"))},o.onabort=function(){r(new B("Aborted","AbortError"))},o.open(a.method,a.url,!0),"include"===a.credentials?o.withCredentials=!0:"omit"===a.credentials&&(o.withCredentials=!1),"responseType"in o&&s&&(o.responseType="blob"),a.headers.forEach((function(e,t){o.setRequestHeader(t,e)})),a.signal&&(a.signal.addEventListener("abort",i),o.onreadystatechange=function(){4===o.readyState&&a.signal.removeEventListener("abort",i)}),o.send(void 0===a._bodyInit?null:a._bodyInit)}))}S.polyfill=!0,self.fetch||(self.fetch=S,self.Headers=h,self.Request=A,self.Response=x);var _="1.0.13",C=["AppBoxoWebAppInit","AppBoxoWebAppGetInitData","AppBoxoWebAppOpenMiniApp","AppBoxoWebAppClearToken","AppBoxoWebAppSaveToken","AppBoxoWebAppShowConfirmBox","AppBoxoWebAppSetStatusBarColor","AppBoxoWebAppInitTabBar","AppBoxoWebAppShowTabBar","AppBoxoWebAppHideTabBar","AppBoxoWebAppSetNavigationBar"],j={confirmModalText:"This service is requesting access to your account",postConfirmCallback:function(){}},T=[],I="undefined"!=typeof window,N=I&&window.webkit&&void 0!==window.webkit.messageHandlers,R=I?window.AppboxoJs:void 0,P=N?window.webkit.messageHandlers:void 0,L=I&&!R&&!P,W=L?"message":"AppBoxoWebAppEvent";function D(e,t){var n=t||{bubbles:!1,cancelable:!1,detail:void 0},r=document.createEvent("CustomEvent");return r.initCustomEvent(e,!!n.bubbles,!!n.cancelable,n.detail),r}function U(e){return 200<=e.status&&e.status<300?Promise.resolve(e):Promise.reject(new Error(e.statusText))}function F(e){return e.json()}function z(e,t){void 0===t&&(t={}),R&&"function"==typeof R[e]&&R[e](JSON.stringify(t)),P&&P[e]&&"function"==typeof P[e].postMessage&&P[e].postMessage(t),L&&(console.log("postMessage: ",{handler:e,params:t,type:"appboxo-js-sdk",sdkVersion:_}),parent.postMessage({handler:e,params:t,type:"appboxo-js-sdk",sdkVersion:_},"*"))}function q(e){T.push(e)}I&&(window.CustomEvent||(window.CustomEvent=(D.prototype=Event.prototype,D)),window.addEventListener(W,(function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],i=0,s=o.length;i<s;i++,a++)r[a]=o[i];return r}(T);if(L&&e[0]&&"data"in e[0]){var r=e[0].data;n.forEach((function(e){e({detail:r})}))}else n.forEach((function(t){t.apply(null,e)}))})));var H,G,M,J=(H=z,G=q,M=function(){var e={current:0,next:function(){return this.current+=1,this.current}},t={};return{add:function(n){var r=e.next();return t[r]=n,r},resolve:function(e,n,r){var a=t[e];a&&(r(n)?a.resolve(n):a.reject(n),t[e]=null)}}}(),G((function(e){if(e.detail&&e.detail.data){var t=e.detail.data,n=t.request_id,r=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}(t,["request_id"]);n&&M.resolve(n,r,(function(e){return!("error_type"in e)}))}})),function(t,n){return new Promise((function(r,a){var o=M.add({resolve:r,reject:a});H(t,e(e({},n),{request_id:o}))}))});return{send:z,subscribe:q,sendPromise:J,unsubscribe:function(e){var t=T.indexOf(e);-1<t&&T.splice(t,1)},isWebView:function(){return!(!R&&!P)},init:function(){z("AppBoxoWebAppInit")},getInitData:function(){return J("AppBoxoWebAppGetInitData").then((function(e){var t=e.app_id,n=e.client_id,r=e.payload,o=e.token,i=void 0===o?"":o;try{localStorage.setItem("ab_app_id",t),localStorage.setItem("ab_client_id",n),localStorage.setItem("ab_payload",r),localStorage.setItem("ab_token",i)}catch(e){}return a.set("ab_app_id",t),a.set("ab_client_id",n),a.set("ab_payload",r),a.set("ab_token",i),{app_id:t,client_id:n,payload:r,token:i}}))},login:function(r){void 0===r&&(r={});var o=e(e({},j),r),i=a.get("ab_app_id"),s=a.get("ab_client_id"),c=a.get("ab_payload");return new Promise((function(e,r){return t(void 0,void 0,void 0,(function(){var l,u;return n(this,(function(p){switch(p.label){case 0:if(!(i&&s&&c))return[3,9];p.label=1;case 1:return p.trys.push([1,7,,8]),[4,function(e){return t(void 0,void 0,void 0,(function(){return n(this,(function(t){return[2,J("AppBoxoWebAppShowConfirmBox",{message:e})]}))}))}(o.confirmModalText)];case 2:p.sent(),o.postConfirmCallback(!0),p.label=3;case 3:return p.trys.push([3,5,,6]),[4,fetch("https://dashboard.appboxo.com/partner/login/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({client_id:s,app_id:i,payload:c})}).then(U).then(F)];case 4:if((l=p.sent()).token){try{localStorage.setItem("ab_token",l.token)}catch(p){}return a.set("ab_token",l.token),z("AppBoxoWebAppSaveToken",{token:l.token}),[2,e(l.token)]}throw new Error("No auth token received");case 5:return u=p.sent(),[2,r({status:"Error",message:"Login failed",error:u})];case 6:return[3,8];case 7:return p.sent(),o.postConfirmCallback(!1),[2,r({status:"Reject",message:"Login confirmation rejected"})];case 8:return[3,10];case 9:return[2,r({status:"Error",message:"Init app data is not provided, please call `.getInitData()`"})];case 10:return[2]}}))}))}))},logout:function(){try{localStorage.removeItem("ab_token")}catch(r){}return a.remove("ab_token"),J("AppBoxoWebAppClearToken")},supports:function(e){return!(!R||"function"!=typeof R[e])||!(!P||!P[e]||"function"!=typeof P[e].postMessage)||!(P||R||!C.includes(e))},track:function(r){var o=a.get("ab_app_id"),i=a.get("ab_client_id");return new Promise((function(a,s){return t(void 0,void 0,void 0,(function(){var t,c;return n(this,(function(n){switch(n.label){case 0:if(!o||!i)return[3,5];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,fetch("https://dashboard.appboxo.com/api/track/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e(e({},r),{app_id:o,client_id:i}))}).then(U).then(F)];case 2:return t=n.sent(),[2,a(t)];case 3:return c=n.sent(),[2,s({status:"Reject",message:"Failed sending tracking details with: "+c})];case 4:return[3,6];case 5:return[2,s({status:"Error",message:"Init app data is not provided, please call `.getInitData()`"})];case 6:return[2]}}))}))}))}}}()},123:function(e,t,n){e.exports=n(208)},128:function(e,t,n){},130:function(e,t,n){},131:function(e,t,n){},202:function(e,t,n){},203:function(e,t,n){},204:function(e,t,n){},208:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(8),i=n.n(o),s=(n(128),n(88)),c=n(18),l=n(11),u=n.n(l),p=n(50),f=n(31),d=n(212),b=n(24),h=n.n(b),m=n(47),g=(n(130),function(){return a.a.createElement("div",{className:"preloader"},a.a.createElement("div",{className:"preloader__spinner"},a.a.createElement("div",{className:"spinner"})))}),y=n(2),v=n.n(y);function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function w(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var A=a.a.createElement("path",{d:"M133 2L42.9375 92L2 51.0909",stroke:"black",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round"}),k=function(e){var t=e.svgRef,n=e.title,r=w(e,["svgRef","title"]);return a.a.createElement("svg",E({width:135,height:94,viewBox:"0 0 135 94",fill:"none",ref:t},r),n?a.a.createElement("title",null,n):null,A)},x=a.a.forwardRef((function(e,t){return a.a.createElement(k,E({svgRef:t},e))}));n.p;function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function B(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var S=a.a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M69 126.5C100.756 126.5 126.5 100.756 126.5 69C126.5 37.2436 100.756 11.5 69 11.5C37.2436 11.5 11.5 37.2436 11.5 69C11.5 100.756 37.2436 126.5 69 126.5Z",stroke:"black",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round"}),_=a.a.createElement("path",{d:"M69 46V69",stroke:"black",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round"}),C=a.a.createElement("circle",{cx:69,cy:92,r:5.75,fill:"black"}),j=function(e){var t=e.svgRef,n=e.title,r=B(e,["svgRef","title"]);return a.a.createElement("svg",O({width:138,height:138,viewBox:"0 0 138 138",fill:"none",ref:t},r),n?a.a.createElement("title",null,n):null,S,_,C)},T=a.a.forwardRef((function(e,t){return a.a.createElement(j,O({svgRef:t},e))})),I=(n.p,function(e){var t=e.isSuccessful,n=e.onTryAgain,r=e.onContinue;return a.a.createElement("div",{className:v()("pane",{success:t,error:!t})},a.a.createElement("div",{className:"center"},a.a.createElement("div",null,t?a.a.createElement(x,null):a.a.createElement(T,null),a.a.createElement("h3",null,t?"Successfully authorised":"Unsuccessful authorisation"))),a.a.createElement("button",{className:"button",onClick:t?r:n},t?"Continue":"Try again"))}),N=a.a.createContext(null),R=a.a.createContext(null),P=(n(131),function(){var e=Object(f.f)(),t=a.a.useContext(N),n=t.loginStatus,o=t.setLoginStatus,i=a.a.useContext(R).updateLogs,s=Object(r.useState)(!1),l=Object(c.a)(s,2),p=l[0],b=l[1],y=Object(r.useState)(""),v=Object(c.a)(y,2),E=v[0],w=v[1],A={postConfirmCallback:function(e){b(e)}},k=function(){var e=Object(m.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i({action:"LOGIN_TO_DASHBOARD",message:"request sent"}),e.next=4,u.a.login(A);case 4:t=e.sent,o(!0),i({action:"LOGIN_TO_DASHBOARD",message:"response received",data:t}),w("success"),e.next=15;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),i({action:"LOGIN_TO_DASHBOARD",message:"Reject"===e.t0.status?"login confirm modal rejected":"request failed",data:e.t0}),w("Reject"===e.t0.status?"":"error");case 15:setTimeout((function(){b(!1)}),400);case 16:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(m.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),i({action:"LOGOUT",message:"request sent"}),e.prev=2,e.next=5,u.a.logout();case 5:console.log("Resolved"),o(!1),i({action:"LOGOUT",message:"response received"}),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(2),console.log("Logout error: ",e.t0),i({action:"LOGOUT",message:"request failed",data:e.t0});case 14:b(!1);case 15:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}}();return E?a.a.createElement(a.a.Fragment,null,a.a.createElement(I,{isSuccessful:n,onContinue:function(){return w("")},onTryAgain:function(){w(""),k()}}),p&&a.a.createElement(g,null)):a.a.createElement("section",{className:"pane account"},a.a.createElement("div",null,a.a.createElement("h1",null,"Account details"),a.a.createElement("div",{className:"account__email"},"Status: ",a.a.createElement("b",null,n?"Logged in":"Not logged in"))),a.a.createElement("div",null,n?a.a.createElement(d.a,{type:"danger",size:"large",onClick:x,block:!0},"Logout"):a.a.createElement(d.a,{type:"primary",size:"large",onClick:k,block:!0},"Login"),a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){e.replace("/"),i({action:"REDIRECT",message:"to home"})}},"Back")),p&&a.a.createElement(g,null))}),L=n(209),W=function(){var e=a.a.useContext(R).updateLogs;return a.a.createElement(L.a,{title:"NavigationBar"},a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){e({action:"AppBoxoWebAppSetNavigationBar",message:"called with dark color options"}),u.a.send("AppBoxoWebAppSetNavigationBar",{title:"Dark nav bar",backButton:!0,background:"#012d38",frontColor:"#ffffff",show:!0})}},"Show dark navigation bar"),a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){e({action:"AppBoxoWebAppSetNavigationBar",message:"called with light color options"}),u.a.send("AppBoxoWebAppSetNavigationBar",{title:"Light nav bar",backButton:!0,background:"#ffffff",frontColor:"#000000",show:!0})}},"Show light navigation bar"),a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){e({action:"AppBoxoWebAppSetNavigationBar",message:"called to change title"}),u.a.send("AppBoxoWebAppSetNavigationBar",{title:"Custom title"})}},"Change navigation bar title"),a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){e({action:"AppBoxoWebAppSetNavigationBar",message:"called to hide it"}),u.a.send("AppBoxoWebAppSetNavigationBar",{show:!1})}},"Hide navigation bar"))},D=n(210).a.Text,U=[{tabId:12,tabName:"Home",tabIcon:"".concat(document.location.origin,"/img/home-icon.png")},{tabId:123,tabName:"About",tabIcon:"".concat(document.location.origin,"/img/info-icon.png")},{tabId:1234,tabName:"Services",tabIcon:"".concat(document.location.origin,"/img/service-icon.png")}],F=function(){var e=Object(r.useState)(""),t=Object(c.a)(e,2),n=t[0],o=t[1],i=a.a.useContext(R).updateLogs,s=function(e){if(e.detail){var t=e.detail,n=t.type,r=t.data;if("AppBoxoWebAppTabBarItemClick"===n&&(i({action:"AppBoxoWebAppTabBarItemClick",message:"received",data:r}),r.tabId)){var a=U.find((function(e){return e.tabId===r.tabId}));o(a.tabName)}}};Object(r.useEffect)((function(){return u.a.subscribe(s),function(){u.a.unsubscribe(s)}}),[]);return a.a.createElement(a.a.Fragment,null,a.a.createElement(L.a,{title:"TabBar"},a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){i({action:"AppBoxoWebAppInitTabBar",message:"called for three tabs"}),u.a.send("AppBoxoWebAppInitTabBar",{list:U,options:{iconColor:"#2eb8da",selectedIconColor:"#2eb8da",background:"#ffffff",textColor:"#000000",selectedTextColor:"#2eb8da"}})}},"Initialize bottom tab bar"),a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){return u.a.send("AppBoxoWebAppShowTabBar")}},"Show tab bar"),a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){return u.a.send("AppBoxoWebAppHideTabBar")}},"Hide tab bar"),a.a.createElement(D,{type:"secondary"},"Active tab name: "),a.a.createElement(D,{type:"warning"},n||"TabBar is not active")))},z=function(){return a.a.createElement(L.a,{title:"Miscellaneous"},a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){u.a.send("AppBoxoWebAppOpenMiniApp",{app_id:"id28"})}},"Open miniapp Airalo"))},q=n(211),H=n(213),G=function(){var e=Object(r.useState)(0),t=Object(c.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(null),s=Object(c.a)(i,2),l=s[0],p=s[1],f=Object(r.useState)(!1),b=Object(c.a)(f,2),g=b[0],y=b[1],v=Object(r.useState)(!1),E=Object(c.a)(v,2),w=E[0],A=E[1],k=function(){var e=Object(m.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),e.prev=1,e.next=4,u.a.track({app_id:localStorage.getItem("app_id"),client_id:localStorage.getItem("client_id"),hostapp_id:null,action:"click",payload:{btnName:"login"}});case 4:o(n+1),q.a.success("Successfully sent!"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),p(e.t0);case 11:y(!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(m.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(!0),e.prev=1,e.next=4,u.a.track({app_id:localStorage.getItem("app_id"),client_id:localStorage.getItem("client_id"),hostapp_id:null,action:"transaction",payload:{shipping:5,tax:.57,discount:2.25,currency_code:"USD",customer:{first_name:"John",last_name:"Doe",email:"jdoe@domain.com",ip_address:"234.192.4.75"},items:[{name:"Product",description:"test",price:8.8,amount:1,total:8.8}]}});case 4:q.a.success("Successfully sent!"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),p(e.t0);case 10:A(!1);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}}();return a.a.createElement(L.a,{title:"Event tracking"},l&&a.a.createElement(H.a,{message:"Error sending",description:"".concat(JSON.stringify(l)),type:"error",closable:!0,afterClose:function(){p(null)}}),a.a.createElement(d.a,{size:"large",block:!0,loading:g,onClick:k},g?"Sending...":"Send click tracking event (".concat(n,")")),a.a.createElement(d.a,{size:"large",block:!0,loading:w,onClick:x},w?"Sending...":"Send transaction tracking event"))},M=(n(202),function(e){var t=a.a.useContext(R).updateLogs,n=Object(f.f)();return a.a.createElement("section",{className:"pane features"},a.a.createElement("div",null,a.a.createElement("h1",null,"Features"),a.a.createElement("div",{className:"feature"},a.a.createElement(W,null)),a.a.createElement("div",{className:"feature"},a.a.createElement(F,null)),a.a.createElement("div",{className:"feature"},a.a.createElement(z,null)),a.a.createElement("div",{className:"feature"},a.a.createElement(G,null))),a.a.createElement("div",null,a.a.createElement(d.a,{onClick:function(){t({action:"REDIRECT",message:"to home"}),n.push("/")},size:"large",className:"button-back",block:!0},"Go back")))}),J=(n(203),function(e){var t=a.a.useContext(R).updateLogs,n=Object(f.f)();return a.a.createElement("section",{className:"pane intro"},a.a.createElement("div",null,a.a.createElement("h1",null,"Appboxo ",a.a.createElement("br",null)," Connect API demo"),a.a.createElement("p",null,"This demo shows Appboxo Connect API capabilities to pass login credentials from host app to miniapp."),a.a.createElement("p",null,"Tap on account details button to login in the miniapp with credentials from Appboxo demo app.")),a.a.createElement("div",null,a.a.createElement(d.a,{type:"primary",size:"large",onClick:function(){t({action:"REDIRECT",message:"to account details"}),n.push("/account")},block:!0},"Account details"),a.a.createElement(d.a,{size:"large",block:!0,onClick:function(){t({action:"REDIRECT",message:"to features details"}),n.push("/features")}},"Features")))}),V=(n(204),function(e){var t=e.onClose,n=e.logs;return a.a.createElement("section",{className:"logs"},a.a.createElement("button",{className:"show-logs-button",onClick:t},"Hide Logs"),a.a.createElement("ul",null,n.map((function(e){return a.a.createElement("li",{key:e.action+"-"+e.message},e.action,": ",e.message," ",a.a.createElement("br",null),JSON.stringify(e.data))}))))});var X=function(){var e=Object(r.useState)(!1),t=Object(c.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(!1),l=Object(c.a)(i,2),b=l[0],h=l[1],m=Object(r.useState)([]),g=Object(c.a)(m,2),y=g[0],v=g[1],E=function(e){v([].concat(Object(s.a)(y),[e]))};return Object(r.useEffect)((function(){u.a.getInitData().then((function(e){o(Boolean(e.token)),E({action:"AppBoxoWebAppGetInitData",message:"response received",data:e}),localStorage.clear(),localStorage.setItem("app_id",e.app_id),localStorage.setItem("client_id",e.client_id)})).catch((function(e){console.log("Error getting web app init data: ",e),E({action:"AppBoxoWebAppGetInitData",message:"request failed",data:e})})),u.a.send("AppBoxoWebAppSetStatusBarColor",{color:"#ffffff"});v([].concat(Object(s.a)(y),[{action:"AppBoxoWebAppSetStatusBarColor",message:"request sent"},{action:"AppBoxoWebAppGetInitData",message:"request sent"}]))}),[]),a.a.createElement(N.Provider,{value:{loginStatus:n,setLoginStatus:o}},!b&&a.a.createElement(d.a,{type:"dashed",size:"small",className:"show-logs-button",onClick:function(){return h(!0)}},"Show Logs"),a.a.createElement(R.Provider,{value:{updateLogs:E}},a.a.createElement(p.a,null,a.a.createElement(f.c,null,a.a.createElement(f.a,{path:"/account"},a.a.createElement(P,null)),a.a.createElement(f.a,{path:"/features"},a.a.createElement(M,null)),a.a.createElement(f.a,{path:"/"},a.a.createElement(J,null))))),b&&a.a.createElement(V,{logs:y,onClose:function(){return h(!1)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[123,1,2]]]);
//# sourceMappingURL=main.5efefc20.chunk.js.map