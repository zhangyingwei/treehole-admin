<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                历史文章管理
            </div>
            <div class="h-panel-bar" v-padding="10">
                <Form mode="inline" :model="toolbar">
                    <FormItem prop="name">
                        <div class="h-input">
                            <Search @search="search" v-model="toolbar.title" showSearchButton placeholder="请输入文章标题"></Search>
                        </div>
                    </FormItem>
                    <FormItem prop="flag">
                        <SwitchList @click="search" :small="true" v-model="toolbar.flag" :datas="flagList"></SwitchList>
                    </FormItem>
                </Form>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" :width="60" >
                        <template slot-scope="props">
                            <Tooltip theme="white" placement="right">
                                <span v-if="props.data.id && props.data.id.length<=5" class="text-hover desc-text">{{props.data.id}}</span>
                                <span v-if="props.data.id && props.data.id.length>5" class="text-hover desc-text">{{props.data.id.substr(0,5)}}...</span>
                                <div slot="content">
                                    {{props.data.id}}
                                </div>
                            </Tooltip>
                        </template>
                    </TableItem>
                    <TableItem title="标题" :width="150" >
                        <template slot-scope="props">
                            <Tooltip  placement="right">
                                <span class="text-hover">{{props.data.title}}</span>
                                <div slot="content">
                                    <button @click="preview(props.data.id)" class="h-btn h-btn-no-border h-btn-text-yellow">点我预览</button>
                                </div>
                            </Tooltip>
                            <!-- <a target="_blank" :src="'/articles/preview'+props.data.id+'?token='+token" >预览</a> -->
                        </template>
                    </TableItem>
                    <TableItem title="简介">
                        <template slot-scope="props">
                            <Tooltip theme="white" placement="right">
                                <span v-if="props.data.desc && props.data.desc.length<=20" class="text-hover desc-text">{{props.data.desc}}</span>
                                <span v-if="props.data.desc && props.data.desc.length>20" class="text-hover desc-text">{{props.data.desc.substr(0,30)}}...</span>
                                <div slot="content">
                                    {{props.data.desc}}
                                </div>
                            </Tooltip>
                        </template>
                    </TableItem>
                    <TableItem title="访问地址" prop="url" :width="200"></TableItem>
                    <TableItem title="类别" :width="100">
                        <template slot-scope="props">
                            <span v-if="props.data.kind != '' && props.data.kind !=null" class="h-tag h-tag-bg-yellow">{{props.data.kind}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="标签" :width="100">
                        <template slot-scope="props">
                            <span v-for="tag in props.data.tags" class="h-tag h-tag-bg-green">{{tag}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="允许评论" :width="80">
                        <template slot-scope="props">
                            <i v-if="props.data.allowCommone" class="h-icon-check"></i>
                            <i v-if="!props.data.allowCommone" class="h-icon-close"></i>
                        </template>
                    </TableItem>
                    <TableItem title="状态" :width="75">
                        <template slot-scope="props">
                            <span v-if="props.data.statu === 1" class="h-tag h-tag-bg-green">已发布</span>
                            <span v-if="props.data.statu === 0" class="h-tag h-tag-bg-primary">未发布</span>
                            <span v-if="props.data.statu === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="220" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s" @click="publishOne(props.data)">
                                发布
                                <i class="h-icon-edit"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-green" @click="etidOne(props.data)">
                                编辑
                                <i class="h-icon-edit"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-red" @click="remove(props.data)">
                                删除
                                <i class="h-icon-trash"></i>
                            </button>
                        </template>
                    </TableItem>
                    <div slot="empty">自定义提醒：暂时无数据</div>
                </Table>
                <div v-padding="10">
                    <Pagination :cur="page.current" :size="page.size" :total="page.total" @change="currentChange" :small="true"></Pagination>
                </div>
                <Modal v-model="confirm.open">
                    <div slot="header">提示</div>
                    <div >确定要删除 {{confirm.itemtitle}} ({{confirm.itemid}}) 吗</div>
                    <div slot="footer"><button class="h-btn" @click="confirm.open = false">取消</button><button class="h-btn h-btn-primary" @click="okDel">确定</button></div>
                </Modal>
            </div>
        </div>
    </div>
</template>
<script>

import store from 'js/vuex/store';

export default {
  data() {
    return {
        token: "",
        toolbar: {
            title: null,
            flag: 4
        },
        flagList: [
            {
                key: 1,
                title: "已发布"
            },{
                key: 0, title: "未发布"
            },{
                key: 9,
                title: "已删除"
            },{
                key: 4,
                title: "全部"
            }
        ],
        datas: [],
        kinds:{},
        page: {
            current: 1,
            total: 0,
            size: 10
        },
        confirm:{
            open: false,
            itemid: null,
            itemtitle: null
        }
    }
  },
  methods: {
    search(){
        console.log(this.toolbar)
        this.queryArticles()
    },
    currentChange(value){
        this.page.current = value.cur
        this.page.size = value.size
        this.queryArticles()
    },
    queryArticles(){
        R.Article.historys({
            current: this.page.current,
            pageSize: this.page.size,
            title: this.toolbar.title,
            flag: this.toolbar.flag === 4? null:this.toolbar.flag
        }).then(resp => {
            if (resp.ok) {
                this.datas = resp.result.data.articles.map(line => {
                    line.url = line.path
                    line.kind = line.categoriesText
                    line.desc = line.excerpt
                    if (line.tags === "") {
                        line.tags = []
                    }else{
                        line.tags = line.tags.split(",")
                    }
                    line.allowCommone = line.usecommont=="on"
                    line.statu = line.flag
                    return line
                })
                this.page.total = resp.result.data.page.total
            }else{

            }
        })
    },
    publishOne(line){
        R.Article.publishOne(line.id).then(resp => {
            if (resp.ok) {
                this.$Message(resp.message)
            }else{
                this.$Message("服务端出现问题")
            }
            this.queryArticles()
        })
    },
    etidOne(line){
        store.dispatch('updateArticle', line);
        this.$router.replace('/vue/admin/article/new');
    },
    remove(line){
        this.confirm.itemid = line.id
        this.confirm.itemtitle = line.title
        this.confirm.open = true
    },
    okDel(){
        if(!this.confirm.itemid){
            this.$Message("未获取到ID")
            return;
        }
        R.Article.deleteOne(this.confirm.itemid).then(resp => {
            if(resp.ok) {
                this.$Message(resp.message);
            }else{
                this.$Message("删除失败");
            }
            this.queryArticles();
        })
        this.confirm.open = false
    },
    preview(id){
        var url = "/articles/preview/"+id+"?token="+Utils.getLocal("token")
        window.open(url, "_blank");
    }
  },
  mounted: function(){
      this.token = Utils.getLocal("token")
      this.queryArticles()
  }
}
</script>
