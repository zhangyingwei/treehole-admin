webpackJsonp([2],{181:function(e,t,i){function n(e){r||i(373)}var r=!1,s=i(26)(i(381),i(657),n,null,null);s.options.__file="D:\\work\\code\\zhangyingwei\\treehole-jekyll\\treehole-admin\\src\\components\\treehole\\article\\new.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] new.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},284:function(e,t,i){/*!
 * Name: vue-upload-component
 * Version: 2.8.2
 * Author: LianYue
 */
!function(t,i){e.exports=i()}(0,function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var i=function(e){var t=new XMLHttpRequest;return t.responseType="json",t.open(e.method||"GET",e.url),e.headers&&Object.keys(e.headers).forEach(function(i){t.setRequestHeader(i,e.headers[i])}),t},n=function(e,t){return new Promise(function(i,n){e.onload=function(){e.status>=200&&e.status<300?i(e.response):n(e.response)},e.onerror=function(){return n(e.response)},e.send(JSON.stringify(t))})},r=function(e,t){var i=new FormData;for(var n in t)i.append(n,t[n]);return new Promise(function(t,n){e.onload=function(){e.status>=200&&e.status<300?t(e.response):n(e.response)},e.onerror=function(){return n(e.response)},e.send(i)})},s=function(e){var t=i(e);return n(t,e.body)},o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=function(){function t(i,n){e(this,t),this.file=i,this.options=n}return o(t,[{key:"createChunks",value:function(){this.chunks=[];for(var e=0,t=this.chunkSize;e<this.fileSize;)this.chunks.push({blob:this.file.file.slice(e,t),startOffset:e,active:!1,retries:this.maxRetries}),e=t,t=e+this.chunkSize}},{key:"updateFileProgress",value:function(){this.file.progress=this.progress}},{key:"pause",value:function(){this.file.active=!1,this.stopChunks()}},{key:"stopChunks",value:function(){this.chunksUploading.forEach(function(e){e.xhr.abort(),e.active=!1})}},{key:"resume",value:function(){this.file.active=!0,this.startChunking()}},{key:"upload",value:function(){var e=this;return this.promise=new Promise(function(t,i){e.resolve=t,e.reject=i}),this.start(),this.promise}},{key:"start",value:function(){var e=this;s({method:"POST",headers:Object.assign({},this.headers,{"Content-Type":"application/json"}),url:this.action,body:Object.assign(this.startBody,{phase:"start",mime_type:this.fileType,size:this.fileSize})}).then(function(t){if("success"!==t.status)return e.file.response=t,e.reject("server");e.sessionId=t.data.session_id,e.chunkSize=t.data.end_offset,e.createChunks(),e.startChunking()}).catch(function(t){e.file.response=t,e.reject("server")})}},{key:"startChunking",value:function(){for(var e=0;e<this.maxActiveChunks;e++)this.uploadNextChunk()}},{key:"uploadNextChunk",value:function(){if(this.file.active){if(this.hasChunksToUpload)return this.uploadChunk(this.chunksToUpload[0]);if(0===this.chunksUploading.length)return this.finish()}}},{key:"uploadChunk",value:function(e){var t=this;e.progress=0,e.active=!0,this.updateFileProgress(),e.xhr=i({method:"POST",headers:this.headers,url:this.action}),e.xhr.upload.addEventListener("progress",function(t){t.lengthComputable&&(e.progress=Math.round(t.loaded/t.total*100))},!1),r(e.xhr,Object.assign(this.uploadBody,{phase:"upload",session_id:this.sessionId,start_offset:e.startOffset,chunk:e.blob})).then(function(i){if(e.active=!1,"success"===i.status)e.uploaded=!0;else if(e.retries--<=0)return t.stopChunks(),t.reject("upload");t.uploadNextChunk()}).catch(function(){if(e.active=!1,e.retries--<=0)return t.stopChunks(),t.reject("upload");t.uploadNextChunk()})}},{key:"finish",value:function(){var e=this;this.updateFileProgress(),s({method:"POST",headers:Object.assign({},this.headers,{"Content-Type":"application/json"}),url:this.action,body:Object.assign(this.finishBody,{phase:"finish",session_id:this.sessionId})}).then(function(t){if(e.file.response=t,"success"!==t.status)return e.reject("server");e.resolve(t)}).catch(function(t){e.file.response=t,e.reject("server")})}},{key:"maxRetries",get:function(){return parseInt(this.options.maxRetries)}},{key:"maxActiveChunks",get:function(){return parseInt(this.options.maxActive)}},{key:"fileType",get:function(){return this.file.type}},{key:"fileSize",get:function(){return this.file.size}},{key:"action",get:function(){return this.options.action||null}},{key:"startBody",get:function(){return this.options.startBody||{}}},{key:"uploadBody",get:function(){return this.options.uploadBody||{}}},{key:"finishBody",get:function(){return this.options.finishBody||{}}},{key:"headers",get:function(){return this.options.headers||{}}},{key:"readyToUpload",get:function(){return!!this.chunks}},{key:"progress",get:function(){var e=this,t=this.chunksUploaded.length/this.chunks.length*100,i=this.chunksUploading.reduce(function(t,i){return t+(0|i.progress)/e.chunks.length},0);return Math.min(t+i,100)}},{key:"chunksToUpload",get:function(){return this.chunks.filter(function(e){return!e.active&&!e.uploaded})}},{key:"hasChunksToUpload",get:function(){return this.chunksToUpload.length>0}},{key:"chunksUploading",get:function(){return this.chunks.filter(function(e){return!!e.xhr&&!!e.active})}},{key:"chunksUploaded",get:function(){return this.chunks.filter(function(e){return!!e.uploaded})}}]),t}();!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var u={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{attrs:{type:"file",name:e.$parent.name,id:e.$parent.inputId||e.$parent.name,accept:e.$parent.accept,capture:e.$parent.capture,webkitdirectory:e.$parent.directory&&e.$parent.features.directory,directory:e.$parent.directory&&e.$parent.features.directory,multiple:e.$parent.multiple&&e.$parent.features.html5},on:{change:e.change}})},staticRenderFns:[],methods:{change:function(e){this.$destroy(),this.$parent.addInputFile(e.target),new this.constructor({parent:this.$parent,el:this.$el})}}},l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i=' .file-uploads { overflow: hidden; position: relative; text-align: center; display: inline-block; } .file-uploads.file-uploads-html4 input[type="file"] { opacity: 0; font-size: 20em; z-index: 1; top: 0; left: 0; right: 0; bottom: 0; position: absolute; width: 100%; height: 100%; } .file-uploads.file-uploads-html5 input[type="file"] { overflow: hidden; position: fixed; width: 1px; height: 1px; z-index: -1; opacity: 0; } ';t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}}();var d={headers:{},action:"",minSize:1048576,maxActive:3,maxRetries:5,handler:a},h={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("label",{class:e.className},[e._t("default"),e._v(" "),i("input-file")],2)},staticRenderFns:[],components:{InputFile:u},props:{inputId:{type:String},name:{type:String,default:"file"},accept:{type:String},capture:{},multiple:{type:Boolean},maximum:{type:Number,default:function(){return this.multiple?0:1}},addIndex:{type:[Boolean,Number]},directory:{type:Boolean},postAction:{type:String},putAction:{type:String},customAction:{type:Function},headers:{type:Object,default:Object},data:{type:Object,default:Object},timeout:{type:Number,default:0},drop:{default:!1},dropDirectory:{type:Boolean,default:!0},size:{type:Number,default:0},extensions:{default:Array},value:{type:Array,default:Array},thread:{type:Number,default:1},chunkEnabled:{type:Boolean,default:!1},chunk:{type:Object,default:function(){return d}}},data:function(){return{files:this.value,features:{html5:!0,directory:!1,drag:!1},active:!1,dropActive:!1,uploading:0,destroy:!1}},mounted:function(){var e=document.createElement("input");e.type="file",e.multiple=!0,window.FormData&&e.files?("boolean"!=typeof e.webkitdirectory&&"boolean"!=typeof e.directory||(this.features.directory=!0),this.features.html5&&void 0!==e.ondrop&&(this.features.drop=!0)):this.features.html5=!1,this.maps={},this.$nextTick(function(){this.$parent&&this.$parent.$forceUpdate(),this.watchDrop(this.drop)})},beforeDestroy:function(){this.destroy=!0,this.active=!1},computed:{uploaded:function(){for(var e=void 0,t=0;t<this.files.length;t++)if(e=this.files[t],e.fileObject&&!e.error&&!e.success)return!1;return!0},chunkOptions:function(){return Object.assign(d,this.chunk)},className:function(){return["file-uploads",this.features.html5?"file-uploads-html5":"file-uploads-html4",this.features.directory&&this.directory?"file-uploads-directory":void 0,this.features.drop&&this.drop?"file-uploads-drop":void 0]}},watch:{active:function(e){this.watchActive(e)},dropActive:function(){this.$parent&&this.$parent.$forceUpdate()},drop:function(e){this.watchDrop(e)},value:function(e){if(this.files!==e){this.files=e;var t=this.maps;this.maps={};for(var i=0;i<this.files.length;i++){var n=this.files[i];this.maps[n.id]=n}for(var r in this.maps){var s=this.maps[r],o=t[r];s!==o&&this.emitFile(s,o)}for(var a in t)this.maps[a]||this.emitFile(void 0,t[a])}}},methods:{clear:function(){if(this.files.length){var e=this.files;this.files=[],this.maps={},this.emitInput();for(var t=0;t<e.length;t++)this.emitFile(void 0,e[t])}return!0},get:function(e){return!!e&&("object"===(void 0===e?"undefined":c(e))?this.maps[e.id]||!1:this.maps[e]||!1)},add:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.addIndex,i=e,n=i instanceof Array;n||(i=[i]);for(var r=[],s=0;s<i.length;s++){var o=i[s];this.features.html5&&o instanceof Blob&&(o={file:o,size:o.size,name:o.webkitRelativePath||o.relativePath||o.name||"unknown",type:o.type});var a=!1;if(!1===o.fileObject||(o.fileObject?a=!0:"undefined"!=typeof Element&&o.el instanceof Element?a=!0:"undefined"!=typeof Blob&&o.file instanceof Blob&&(a=!0)),a&&(o=l({fileObject:!0,size:-1,name:"Filename",type:"",active:!1,error:"",success:!1,putAction:this.putAction,postAction:this.postAction,timeout:this.timeout},o,{response:{},progress:"0.00",speed:0}),o.data=l({},this.data,o.data?o.data:{}),o.headers=l({},this.headers,o.headers?o.headers:{})),o.id||(o.id=Math.random().toString(36).substr(2)),!this.emitFilter(o,void 0)){if(this.maximum>1&&r.length+this.files.length>=this.maximum)break;if(r.push(o),1===this.maximum)break}}if(!r.length)return!1;1===this.maximum&&this.clear();var u=void 0;!0===t||0===t?u=r.concat(this.files):t?(u=r.concat([]),u.splice(t,0,r)):u=this.files.concat(r),this.files=u;for(var c=0;c<r.length;c++){var d=r[c];this.maps[d.id]=d}this.emitInput();for(var h=0;h<r.length;h++)this.emitFile(r[h],void 0);return n?r:r[0]},addInputFile:function(e){var t=[];if(e.files)for(var i=0;i<e.files.length;i++){var n=e.files[i];t.push({size:n.size,name:n.webkitRelativePath||n.relativePath||n.name,type:n.type,file:n,el:e})}else t.push({name:e.value.replace(/^.*?([^\/\\\r\n]+)$/,"$1"),el:e});return this.add(t)},addDataTransfer:function(e){var i=this,n=[];if(e.items&&e.items.length){for(var r=[],s=0;s<e.items.length;s++){var o=e.items[s];o=o.getAsEntry?o.getAsEntry()||o.getAsFile():o.webkitGetAsEntry?o.webkitGetAsEntry()||o.getAsFile():o.getAsFile(),o&&r.push(o)}return new Promise(function(e,s){!function s(o){var a=r[o];if(!a||i.maximum>0&&n.length>=i.maximum)return e(i.add(n));i.getEntry(a).then(function(e){n.push.apply(n,t(e)),s(o+1)})}(0)})}if(e.files.length){for(var a=0;a<e.files.length&&(n.push(e.files[a]),!(this.maximum>0&&n.length>=this.maximum));a++);return Promise.resolve(this.add(n))}return Promise.resolve([])},getEntry:function(e){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return new Promise(function(r,s){if(e.isFile)e.file(function(e){r([{size:e.size,name:n+e.name,type:e.type,file:e}])});else if(e.isDirectory&&i.dropDirectory){var o=[],a=e.createReader();!function s(){a.readEntries(function(a){!function u(l){return!a[l]&&0===l||i.maximum>0&&o.length>=i.maximum?r(o):a[l]?void i.getEntry(a[l],n+e.name+"/").then(function(e){o.push.apply(o,t(e)),u(l+1)}):s()}(0)})}()}else r([])})},replace:function(e,t){var i=this.get(e),n=this.get(t);if(!i||!n||i===n)return!1;var r=this.files.concat([]),s=r.indexOf(i),o=r.indexOf(n);return-1!==s&&-1!==o&&(r[s]=n,r[o]=i,this.files=r,this.emitInput(),!0)},remove:function(e){var t=this.get(e);if(t){if(this.emitFilter(void 0,t))return!1;var i=this.files.concat([]),n=i.indexOf(t);if(-1===n)return console.error("remove",t),!1;i.splice(n,1),this.files=i,delete this.maps[t.id],this.emitInput(),this.emitFile(void 0,t)}return t},update:function(e,t){var i=this.get(e);if(i){var n=l({},i,t);if(!i.fileObject||!i.active||n.active||n.error||n.success||(n.error="abort"),this.emitFilter(n,i))return!1;var r=this.files.concat([]),s=r.indexOf(i);return-1===s?(console.error("update",i),!1):(r.splice(s,1,n),this.files=r,delete this.maps[i.id],this.maps[n.id]=n,this.emitInput(),this.emitFile(n,i),n)}return!1},emitFilter:function(e,t){var i=!1;return this.$emit("input-filter",e,t,function(){return i=!0}),i},emitFile:function(e,t){this.$emit("input-file",e,t),!(e&&e.fileObject&&e.active)||t&&t.active?e&&e.fileObject&&e.active||!t||!t.fileObject||!t.active||this.uploading--:(this.uploading++,this.$nextTick(function(){var t=this;setTimeout(function(){t.upload(e).then(function(){(e=t.get(e))&&e.fileObject&&t.update(e,{active:!1,success:!e.error})}).catch(function(i){t.update(e,{active:!1,success:!1,error:i.code||i.error||i.message||i})})},parseInt(50*Math.random()+50,10))})),!this.active||Boolean(e)===Boolean(t)&&e.active===t.active||this.watchActive(!0)},emitInput:function(){this.$emit("input",this.files)},upload:function(e){var t=this.get(e);if(!t)return Promise.reject("not_exists");if(!t.fileObject)return Promise.reject("file_object");if(t.error)return Promise.reject(t.error);if(t.success)return Promise.resolve(t);var i=this.extensions;if(i&&(i.length||void 0===i.length)&&("object"===(void 0===i?"undefined":c(i))&&i instanceof RegExp||("string"==typeof i&&(i=i.split(",").map(function(e){return e.trim()}).filter(function(e){return e})),i=new RegExp("\\.("+i.join("|").replace(/\./g,"\\.")+")$","i")),-1===t.name.search(i)))return Promise.reject("extension");if(this.size>0&&t.size>=0&&t.size>this.size)return Promise.reject("size");if(this.customAction)return this.customAction(t,this);if(this.features.html5){if(this.shouldUseChunkUpload(t))return this.uploadChunk(t);if(t.putAction)return this.uploadPut(t);if(t.postAction)return this.uploadHtml5(t)}return t.postAction?this.uploadHtml4(t):Promise.reject("No action configured")},shouldUseChunkUpload:function(e){return this.chunkEnabled&&!!this.chunkOptions.handler&&e.size>this.chunkOptions.minSize},uploadChunk:function(e){var t=this.chunkOptions.handler;return e.chunk=new t(e,this.chunkOptions),e.chunk.upload()},uploadPut:function(e){var t=[],i=void 0;for(var n in e.data)null!==(i=e.data[n])&&void 0!==i&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(i));var r=t.length?(-1===e.putAction.indexOf("?")?"?":"&")+t.join("&"):"",s=new XMLHttpRequest;return s.open("PUT",e.putAction+r),this.uploadXhr(s,e,e.file)},uploadHtml5:function(e){var t=new window.FormData,i=void 0;for(var n in e.data)i=e.data[n],i&&"object"===(void 0===i?"undefined":c(i))&&"function"!=typeof i.toString?i instanceof File?t.append(n,i,i.name):t.append(n,JSON.stringify(i)):null!==i&&void 0!==i&&t.append(n,i);t.append(this.name,e.file,e.file.filename||e.name);var r=new XMLHttpRequest;return r.open("POST",e.postAction),this.uploadXhr(r,e,t)},uploadXhr:function(e,t,i){var n=this,r=t,s=0,o=0;e.upload.onprogress=function(e){if(r=n.get(r),e.lengthComputable&&r&&r.fileObject&&r.active){var t=Math.round(Date.now()/1e3);t!==s&&(s=t,r=n.update(r,{progress:(e.loaded/e.total*100).toFixed(2),speed:e.loaded-o}),o=e.loaded)}};var a=setInterval(function(){if(!(r=n.get(r))||!r.fileObject||r.success||r.error||!r.active){a&&(clearInterval(a),a=!1);try{e.abort(),e.timeout=1}catch(e){}}},100);return new Promise(function(t,s){var o=void 0,u=function(i){if(!o){if(o=!0,a&&(clearInterval(a),a=!1),!(r=n.get(r)))return s("not_exists");if(!r.fileObject)return s("file_object");if(r.error)return s(r.error);if(!r.active)return s("abort");if(r.success)return t(r);var u={};switch(i.type){case"timeout":case"abort":u.error=i.type;break;case"error":e.status?e.status>=500?u.error="server":e.status>=400&&(u.error="denied"):u.error="network";break;default:e.status>=500?u.error="server":e.status>=400?u.error="denied":u.progress="100.00"}if(e.responseText){var l=e.getResponseHeader("Content-Type");l&&-1!==l.indexOf("/json")?u.response=JSON.parse(e.responseText):u.response=e.responseText}return r=n.update(r,u),r.error?s(r.error):t(r)}};e.onload=u,e.onerror=u,e.onabort=u,e.ontimeout=u,r.timeout&&(e.timeout=r.timeout);for(var l in r.headers)e.setRequestHeader(l,r.headers[l]);r=n.update(r,{xhr:e}),e.send(i)})},uploadHtml4:function(e){var t=this,i=e,n=function(e){27===e.keyCode&&e.preventDefault()},r=document.createElement("iframe");r.id="upload-iframe-"+i.id,r.name="upload-iframe-"+i.id,r.src="about:blank",r.setAttribute("style","width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;");var s=document.createElement("form");s.action=i.postAction,s.name="upload-form-"+i.id,s.setAttribute("method","POST"),s.setAttribute("target","upload-iframe-"+i.id),s.setAttribute("enctype","multipart/form-data");var o=void 0,a=void 0;for(var u in i.data)o=i.data[u],o&&"object"===(void 0===o?"undefined":c(o))&&"function"!=typeof o.toString&&(o=JSON.stringify(o)),null!==o&&void 0!==o&&(a=document.createElement("input"),a.type="hidden",a.name=u,a.value=o,s.appendChild(a));s.appendChild(i.el),document.body.appendChild(r).appendChild(s);var l=function(){var e=void 0;try{r.contentWindow&&(e=r.contentWindow.document)}catch(e){}if(!e)try{e=r.contentDocument?r.contentDocument:r.document}catch(t){e=r.document}return e&&e.body?e.body.innerHTML:null};return new Promise(function(e,o){setTimeout(function(){if(!(i=t.update(i,{iframe:r})))return o("not_exists");var a=setInterval(function(){(i=t.get(i))&&i.fileObject&&!i.success&&!i.error&&i.active||(a&&(clearInterval(a),a=!1),r.onabort({type:i?"abort":"not_exists"}))},100),u=void 0,c=function(r){if(!u){if(u=!0,a&&(clearInterval(a),a=!1),document.body.removeEventListener("keydown",n),!(i=t.get(i)))return o("not_exists");if(!i.fileObject)return o("file_object");if(i.error)return o(i.error);if(!i.active)return o("abort");if(i.success)return e(i);var s=l(),c={};switch(r.type){case"abort":c.error="abort";break;case"error":i.error?c.error=i.error:c.error=null===s?"network":"denied";break;default:i.error?c.error=i.error:null===c?c.error="network":c.progress="100.00"}if(null!==s){if(s&&"{"===s.substr(0,1)&&"}"===s.substr(s.length-1,1))try{s=JSON.parse(s)}catch(e){}c.response=s}return i=t.update(i,c),i.error?o(i.error):e(i)}};r.onload=c,r.onerror=c,r.onabort=c,document.body.addEventListener("keydown",n),s.submit()},50)}).then(function(e){return r.parentNode&&r.parentNode.removeChild(r),e}).catch(function(e){return r.parentNode&&r.parentNode.removeChild(r),e})},watchActive:function(e){for(var t=void 0,i=0;t=this.files[i];)if(i++,t.fileObject)if(e&&!this.destroy){if(this.uploading>=this.thread||this.uploading&&!this.features.html5)break;t.active||t.error||t.success||this.update(t,{active:!0})}else t.active&&this.update(t,{active:!1});else;0===this.uploading&&(this.active=!1)},watchDrop:function(e){var t=e;if(this.features.drop){if(this.dropElement)try{document.removeEventListener("dragenter",this.onDragenter,!1),document.removeEventListener("dragleave",this.onDragleave,!1),document.removeEventListener("drop",this.onDocumentDrop,!1),this.dropElement.removeEventListener("dragover",this.onDragover,!1),this.dropElement.removeEventListener("drop",this.onDrop,!1)}catch(e){}t?"string"==typeof t?t=document.querySelector(t)||this.$root.$el.querySelector(t):!0===t&&(t=this.$parent.$el):t=!1,this.dropElement=t,this.dropElement&&(document.addEventListener("dragenter",this.onDragenter,!1),document.addEventListener("dragleave",this.onDragleave,!1),document.addEventListener("drop",this.onDocumentDrop,!1),this.dropElement.addEventListener("dragover",this.onDragover,!1),this.dropElement.addEventListener("drop",this.onDrop,!1))}},onDragenter:function(e){e.preventDefault(),this.dropActive||(this.dropActive=!0)},onDragleave:function(e){e.preventDefault(),("HTML"===e.target.nodeName||0===e.screenX&&0===e.screenY&&!e.fromElement&&e.offsetX<=0)&&(this.dropActive=!1)},onDragover:function(e){e.preventDefault()},onDocumentDrop:function(){this.dropActive=!1},onDrop:function(e){e.preventDefault(),this.addDataTransfer(e.dataTransfer)}}},f=Object.freeze({default:h});return f&&h||f})},373:function(e,t){},381:function(e,t,i){"use strict";(function(e){function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=i(76),s=n(r),o=i(284),a=n(o);t.default={data:function(){return{saveFlag:!1,isPublish:!1,hasNewFileAdd:!1,imgAlias:"",files:[],value:"",kinds:[],intervalId:"",info:{title:"",tags:"",kind:null,url:"",allowCommont:!0,id:null},toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!0,htmlcode:!0,undo:!0,redo:!0,trash:!0,save:!0,navigation:!0,subfield:!0,preview:!0},formRules:{required:["title","kind"]}}},components:{FileUpload:a.default},methods:{saveArticle:function(e){this.isPublish=!1,this.saveFlag=e,this.files.length>0&&this.hasNewFileAdd?this.$refs.upload&&this.$refs.upload.active||this.startUpload():this.onSave(e)},submitArticle:function(){this.isPublish=!0,this.files.length>0&&this.hasNewFileAdd?this.$refs.upload&&this.$refs.upload.active||this.startUpload():this.submite()},onSave:function(t){var i=this;this.validInfo()&&e.Article.save({id:this.info.id,title:this.info.title,subpath:this.info.url,tags:""===this.info.tags?"":this.info.tags.join(","),categories:this.info.kind,content:this.value,usecommont:this.info.allowCommont?"on":"off",preview:"/files/"+this.imgAlias}).then(function(e){console.log(e),e.ok?400==e.code?i.$Message(e.message):e.result.data?(i.info.id=e.result.data,i.$Message("保存成功"),t&&i.$router.replace("/vue/admin/article/history")):i.$Message("返回消息有误"):i.$Message("服务端错误")})},validInfo:function(){return this.info.title?!!this.info.kind||(this.$Message("请选择文章分类"),!1):(this.$Message("请填写标题"),!1)},submite:function(){var t=this;this.validInfo()&&e.Article.publish({id:this.info.id,title:this.info.title,subpath:this.info.url,tags:""===this.info.tags?"":this.info.tags.join(","),categories:this.info.kind,content:this.value,usecommont:this.info.allowCommont?"on":"off",preview:"/files/"+this.imgAlias}).then(function(e){console.log(e),e.ok?400==e.code?t.$Message(e.message):(t.info.id=e.result.data,t.$Message("发布文章成功"),t.$router.replace("/vue/admin/article/history")):t.$Message("服务端错误")})},getKinds:function(){var t=this;e.Article.kinds().then(function(e){e.ok?t.kinds=e.result.data.map(function(e){return e.title=e.name,e.key=e.id,e}):t.$Message("加载分类信息错误")})},initArticle:function(){var e=s.default.state.article;console.log(e),e?(this.value=e.content,this.info.title=e.title,this.info.tags=e.tags,this.info.kind=e.categories,this.info.url=e.subpath,this.info.allowCommont="on"===e.usecommont,this.info.id=e.id,this.files.push({src:e.preview}),e.preview&&(this.imgAlias=e.preview.split("/")[2]),console.log(this.info),s.default.dispatch("updateArticle",null)):this.value="文章简介\n\n\x3c!-- more --\x3e\n\n文章内容"},inputFilter:function(e,t,i){var n=this;if(e&&!t){if(this.files.forEach(function(e){n.$refs.upload.remove(e),n.files.length=0}),/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(e.name))return this.$Message(e.name+" - 文件类型不正确!"),i();if(/\.(php5?|html?|jsx?)$/i.test(e.name))return this.$Message(e.name+" - 文件类型不正确!"),i();e.blob="";var r=window.URL||window.webkitURL;r&&r.createObjectURL&&(e.blob=r.createObjectURL(e.file))}},inputFile:function(e,t){this.hasNewFileAdd=!0,e&&t&&!e.active&&t.active&&(e.response.result?(this.imgAlias=e.response.result.data,console.log("img-alias",this.imgAlias)):this.$Message("上传图片错误")),e&&!t&&console.log("add",e),e&&t&&(console.log("update",e),this.$refs.upload&&this.$refs.upload.uploaded&&(this.imgAlias?this.isPublish?this.submite():this.onSave(this.saveFlag):this.$Message.error("文件上传未成功"))),!e&&t&&console.log("remove",t)},removeFile:function(e){this.$refs.upload.remove(e)},startUpload:function(){this.$refs.upload.active=!0}},mounted:function(){this.hasNewFileAdd=!1,this.getKinds(),this.initArticle();var e=this,t=setInterval(function(){e.$Message({type:"success",text:"保存成功"}),e.saveArticle(!1)},12e4);this.intervalId=t},beforeDestroy:function(){clearInterval(this.intervalId),s.default.dispatch("updateArticle",void 0)}}}).call(t,i(27))},657:function(e,t,i){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"padding",rawName:"v-padding",value:20,expression:"20"}],staticClass:"app-home"},[i("div",{staticClass:"h-panel"},[i("div",{directives:[{name:"padding",rawName:"v-padding",value:20,expression:"20"}],staticClass:"h-panel-bar"},[e._v("\n            新建文章\n        ")]),e._v(" "),i("div",{directives:[{name:"padding",rawName:"v-padding",value:20,expression:"20"}],staticClass:"h-panel-bar red-color"},[e._v("\n            在写作的过程中不要忘记保存 ( ctrl+s/command+s ) 哦，虽然程序会每隔2分钟自动保存一次！！！\n        ")]),e._v(" "),i("div",{staticClass:"h-panel-body"},[i("div",{staticClass:"h-row"},[i("div",{directives:[{name:"padding",rawName:"v-padding",value:10,expression:"10"}],staticClass:"h-col-6"},[i("Form",{attrs:{labelPosition:"left",labelWidth:100,rules:e.formRules,model:e.info}},[i("FormItem",{attrs:{label:"标题",prop:"title"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.info.title,expression:"info.title"}],attrs:{type:"text",placeholder:"请输入文章标题"},domProps:{value:e.info.title},on:{input:function(t){t.target.composing||e.$set(e.info,"title",t.target.value)}}})]),e._v(" "),i("FormItem",{attrs:{label:"个性化访问",prop:"url"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.info.url,expression:"info.url"}],attrs:{type:"text",placeholder:"个性化访问，如 article1,默认为文章编号"},domProps:{value:e.info.url},on:{input:function(t){t.target.composing||e.$set(e.info,"url",t.target.value)}}})]),e._v(" "),i("FormItem",{attrs:{label:"标签",prop:"tags"}},[i("TagInput",{attrs:{placeholder:"tags",readonly:!1},model:{value:e.info.tags,callback:function(t){e.$set(e.info,"tags",t)},expression:"info.tags"}})],1),e._v(" "),i("FormItem",{attrs:{label:"分类",prop:"kind"}},[i("Select",{attrs:{datas:e.kinds,placeholder:"请选择文章分类"},model:{value:e.info.kind,callback:function(t){e.$set(e.info,"kind",t)},expression:"info.kind"}})],1),e._v(" "),i("FormItem",{attrs:{label:"预览图"}},[i("div",{staticClass:"h-btn-group h-btn-group-l"},[i("file-upload",{ref:"upload",staticClass:"h-btn h-btn-green",attrs:{"post-action":"/admin/files/upload",extensions:"gif,jpg,jpeg,png,webp,pdf",accept:"image/png,image/gif,image/jpeg,image/webp,application/pdf",multiple:!0,size:104857600},on:{"input-filter":e.inputFilter,"input-file":e.inputFile},model:{value:e.files,callback:function(t){e.files=t},expression:"files"}},[e._v("\n                                    选择文件\n                                ")])],1),e._v(" "),e.$refs.upload&&e.$refs.upload.active?i("span",{staticClass:"red-color"},[e._v("图片上传中...")]):e._e(),e._v(" "),e._l(e.files,function(e){return i("div",{directives:[{name:"padding",rawName:"v-padding",value:10,expression:"10"}]},[i("img",{staticClass:"h-col-24",attrs:{src:e.blob?e.blob:e.src}})])})],2),e._v(" "),i("FormItem",{attrs:{label:"允许评论",prop:"commont"}},[i("h-switch",{model:{value:e.info.allowCommont,callback:function(t){e.$set(e.info,"allowCommont",t)},expression:"info.allowCommont"}})],1),e._v(" "),i("FormItem",[i("div",{staticClass:"h-btn-group h-btn-group-l"},[i("button",{staticClass:"h-btn h-btn-primary",on:{click:e.submitArticle}},[i("i",{staticClass:"h-icon-outbox"}),i("span",[e._v("发表")])]),e._v(" "),i("button",{staticClass:"h-btn h-btn-blue",on:{click:function(t){e.saveArticle(!0)}}},[i("i",{staticClass:"h-icon-completed"}),i("span",[e._v("存为草稿")])])])])],1)],1),e._v(" "),i("div",{staticClass:"h-col-18"},[i("mavon-editor",{directives:[{name:"height",rawName:"v-height",value:500,expression:"500"}],attrs:{toolbars:e.toolbars},on:{save:function(t){e.saveArticle(!1)}},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)])])])])},staticRenderFns:[]},e.exports.render._withStripped=!0}});