webpackJsonp([8],{179:function(t,e,a){var s=a(26)(a(379),a(659),null,null,null);s.options.__file="D:\\work\\code\\zhangyingwei\\treehole-jekyll\\treehole-admin\\src\\components\\treehole\\article\\history.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] history.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},379:function(t,e,a){"use strict";(function(t,s){Object.defineProperty(e,"__esModule",{value:!0});var n=a(76),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default={data:function(){return{token:"",toolbar:{title:null,flag:4},flagList:[{key:1,title:"已发布"},{key:0,title:"未发布"},{key:9,title:"已删除"},{key:4,title:"全部"}],datas:[],kinds:{},page:{current:1,total:0,size:10},confirm:{open:!1,itemid:null,itemtitle:null}}},methods:{search:function(){console.log(this.toolbar),this.queryArticles()},currentChange:function(t){this.page.current=t.cur,this.page.size=t.size,this.queryArticles()},queryArticles:function(){var e=this;t.Article.historys({current:this.page.current,pageSize:this.page.size,title:this.toolbar.title,flag:4===this.toolbar.flag?null:this.toolbar.flag}).then(function(t){t.ok&&(e.datas=t.result.data.articles.map(function(t){return t.url=t.path,t.kind=t.categoriesText,t.desc=t.excerpt,""===t.tags?t.tags=[]:t.tags=t.tags.split(","),t.allowCommone="on"==t.usecommont,t.statu=t.flag,t}),e.page.total=t.result.data.page.total)})},publishOne:function(e){var a=this;t.Article.publishOne(e.id).then(function(t){t.ok?a.$Message(t.message):a.$Message("服务端出现问题"),a.queryArticles()})},etidOne:function(t){i.default.dispatch("updateArticle",t),this.$router.replace("/vue/admin/article/new")},remove:function(t){this.confirm.itemid=t.id,this.confirm.itemtitle=t.title,this.confirm.open=!0},okDel:function(){var e=this;if(!this.confirm.itemid)return void this.$Message("未获取到ID");t.Article.deleteOne(this.confirm.itemid).then(function(t){t.ok?e.$Message(t.message):e.$Message("删除失败"),e.queryArticles()}),this.confirm.open=!1},preview:function(t){var e="/articles/preview/"+t+"?token="+s.getLocal("token");window.open(e,"_blank")}},mounted:function(){this.token=s.getLocal("token"),this.queryArticles()}}}).call(e,a(27),a(13))},659:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"padding",rawName:"v-padding",value:20,expression:"20"}],staticClass:"app-home"},[a("div",{staticClass:"h-panel"},[a("div",{directives:[{name:"padding",rawName:"v-padding",value:10,expression:"10"}],staticClass:"h-panel-bar"},[t._v("\n            历史文章管理\n        ")]),t._v(" "),a("div",{directives:[{name:"padding",rawName:"v-padding",value:10,expression:"10"}],staticClass:"h-panel-bar"},[a("Form",{attrs:{mode:"inline",model:t.toolbar}},[a("FormItem",{attrs:{prop:"name"}},[a("div",{staticClass:"h-input"},[a("Search",{attrs:{showSearchButton:"",placeholder:"请输入文章标题"},on:{search:t.search},model:{value:t.toolbar.title,callback:function(e){t.$set(t.toolbar,"title",e)},expression:"toolbar.title"}})],1)]),t._v(" "),a("FormItem",{attrs:{prop:"flag"}},[a("SwitchList",{attrs:{small:!0,datas:t.flagList},on:{click:t.search},model:{value:t.toolbar.flag,callback:function(e){t.$set(t.toolbar,"flag",e)},expression:"toolbar.flag"}})],1)],1)],1),t._v(" "),a("div",{staticClass:"h-panel-body"},[a("Table",{attrs:{datas:t.datas}},[a("TableItem",{attrs:{title:"序号",width:60},scopedSlots:t._u([{key:"default",fn:function(e){return[a("Tooltip",{attrs:{theme:"white",placement:"right"}},[e.data.id&&e.data.id.length<=5?a("span",{staticClass:"text-hover desc-text"},[t._v(t._s(e.data.id))]):t._e(),t._v(" "),e.data.id&&e.data.id.length>5?a("span",{staticClass:"text-hover desc-text"},[t._v(t._s(e.data.id.substr(0,5))+"...")]):t._e(),t._v(" "),a("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n                                "+t._s(e.data.id)+"\n                            ")])])]}}])}),t._v(" "),a("TableItem",{attrs:{title:"标题",width:150},scopedSlots:t._u([{key:"default",fn:function(e){return[a("Tooltip",{attrs:{placement:"right"}},[a("span",{staticClass:"text-hover"},[t._v(t._s(e.data.title))]),t._v(" "),a("div",{attrs:{slot:"content"},slot:"content"},[a("button",{staticClass:"h-btn h-btn-no-border h-btn-text-yellow",on:{click:function(a){t.preview(e.data.id)}}},[t._v("点我预览")])])])]}}])}),t._v(" "),a("TableItem",{attrs:{title:"简介"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("Tooltip",{attrs:{theme:"white",placement:"right"}},[e.data.desc&&e.data.desc.length<=20?a("span",{staticClass:"text-hover desc-text"},[t._v(t._s(e.data.desc))]):t._e(),t._v(" "),e.data.desc&&e.data.desc.length>20?a("span",{staticClass:"text-hover desc-text"},[t._v(t._s(e.data.desc.substr(0,30))+"...")]):t._e(),t._v(" "),a("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n                                "+t._s(e.data.desc)+"\n                            ")])])]}}])}),t._v(" "),a("TableItem",{attrs:{title:"访问地址",prop:"url",width:200}}),t._v(" "),a("TableItem",{attrs:{title:"类别",width:100},scopedSlots:t._u([{key:"default",fn:function(e){return[""!=e.data.kind&&null!=e.data.kind?a("span",{staticClass:"h-tag h-tag-bg-yellow"},[t._v(t._s(e.data.kind))]):t._e()]}}])}),t._v(" "),a("TableItem",{attrs:{title:"标签",width:100},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.data.tags,function(e){return a("span",{staticClass:"h-tag h-tag-bg-green"},[t._v(t._s(e))])})}}])}),t._v(" "),a("TableItem",{attrs:{title:"允许评论",width:80},scopedSlots:t._u([{key:"default",fn:function(e){return[e.data.allowCommone?a("i",{staticClass:"h-icon-check"}):t._e(),t._v(" "),e.data.allowCommone?t._e():a("i",{staticClass:"h-icon-close"})]}}])}),t._v(" "),a("TableItem",{attrs:{title:"状态",width:75},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.data.statu?a("span",{staticClass:"h-tag h-tag-bg-green"},[t._v("已发布")]):t._e(),t._v(" "),0===e.data.statu?a("span",{staticClass:"h-tag h-tag-bg-primary"},[t._v("未发布")]):t._e(),t._v(" "),9===e.data.statu?a("span",{staticClass:"h-tag h-tag-bg-red"},[t._v("删除")]):t._e()]}}])}),t._v(" "),a("TableItem",{attrs:{title:"操作",width:220},scopedSlots:t._u([{key:"default",fn:function(e){return[a("button",{staticClass:"h-btn h-btn-s",on:{click:function(a){t.publishOne(e.data)}}},[t._v("\n                            发布\n                            "),a("i",{staticClass:"h-icon-edit"})]),t._v(" "),a("button",{staticClass:"h-btn h-btn-s h-btn-green",on:{click:function(a){t.etidOne(e.data)}}},[t._v("\n                            编辑\n                            "),a("i",{staticClass:"h-icon-edit"})]),t._v(" "),a("button",{staticClass:"h-btn h-btn-s h-btn-red",on:{click:function(a){t.remove(e.data)}}},[t._v("\n                            删除\n                            "),a("i",{staticClass:"h-icon-trash"})])]}}])}),t._v(" "),a("div",{attrs:{slot:"empty"},slot:"empty"},[t._v("自定义提醒：暂时无数据")])],1),t._v(" "),a("div",{directives:[{name:"padding",rawName:"v-padding",value:10,expression:"10"}]},[a("Pagination",{attrs:{cur:t.page.current,size:t.page.size,total:t.page.total,small:!0},on:{change:t.currentChange}})],1),t._v(" "),a("Modal",{model:{value:t.confirm.open,callback:function(e){t.$set(t.confirm,"open",e)},expression:"confirm.open"}},[a("div",{attrs:{slot:"header"},slot:"header"},[t._v("提示")]),t._v(" "),a("div",[t._v("确定要删除 "+t._s(t.confirm.itemtitle)+" ("+t._s(t.confirm.itemid)+") 吗")]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("button",{staticClass:"h-btn",on:{click:function(e){t.confirm.open=!1}}},[t._v("取消")]),a("button",{staticClass:"h-btn h-btn-primary",on:{click:t.okDel}},[t._v("确定")])])])],1)])])},staticRenderFns:[]},t.exports.render._withStripped=!0}});