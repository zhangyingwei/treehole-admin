<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="20">
                新建文章
            </div>
            <div class="h-panel-bar red-color" v-padding="20">
                在写作的过程中不要忘记保存 ( ctrl+s/command+s ) 哦，虽然程序会每隔2分钟自动保存一次！！！
            </div>
            <div class="h-panel-body">
                <div class="h-row">
                    <div class="h-col-6" v-padding="10">
                        <Form labelPosition="left" :labelWidth="100" :rules="formRules" :model="info" >
                            <FormItem label="标题" prop="title">
                                <input type="text" v-model="info.title"  placeholder="请输入文章标题"/>
                            </FormItem>
                            <FormItem label="个性化访问" prop="url">
                                <input type="text" v-model="info.url" placeholder="个性化访问，如 article1,默认为文章编号"/>
                            </FormItem>
                            <FormItem label="标签" prop="tags">
                                <TagInput v-model="info.tags" placeholder="tags" :readonly="false"></TagInput>
                            </FormItem>
                            <FormItem label="分类" prop="kind">
                                <Select v-model="info.kind" :datas="kinds" placeholder="请选择文章分类"></Select>
                            </FormItem>
                            <FormItem label="预览图">
                                <div class="h-btn-group h-btn-group-l">
                                    <file-upload
                                        class="h-btn h-btn-green"
                                        post-action="/admin/files/upload"
                                        extensions="gif,jpg,jpeg,png,webp,pdf"
                                        accept="image/png,image/gif,image/jpeg,image/webp,application/pdf"
                                        :multiple="true"
                                        :size="1024 * 1024 * 100"
                                        v-model="files"
                                        @input-filter="inputFilter"
                                        @input-file="inputFile"
                                        ref="upload">
                                        选择文件
                                    </file-upload>
                                </div>
                                <span v-if="$refs.upload && $refs.upload.active" class="red-color" >图片上传中...</span>
                                <div v-for="file in files" v-padding="10">
                                    <img class="h-col-24" :src="file.blob?file.blob:file.src" />
                                </div>
                            </FormItem>
                            <FormItem label="允许评论" prop="commont">
                                <h-switch v-model="info.allowCommont"></h-switch>
                            </FormItem>
                            <FormItem>
                                <div class="h-btn-group h-btn-group-l">
                                    <button class="h-btn h-btn-primary" @click="submitArticle" ><i class="h-icon-outbox"></i><span>发表</span></button>
                                    <button class="h-btn h-btn-blue" @click="saveArticle(true)"><i class="h-icon-completed"></i><span>存为草稿</span></button>
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="h-col-18">
                        <mavon-editor v-height="500" v-model="value" :toolbars="toolbars" @save="saveArticle(false)"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import store from 'js/vuex/store';
import FileUpload from 'vue-upload-component'

export default {
  data() {
    return {
        saveFlag: false,
        isPublish: false,
        hasNewFileAdd: false,
        imgAlias: "",
        files:[],
        value: "",
        kinds: [],
        intervalId: "",
        info: {
            title: "",
            tags: "",
            kind: null,
            url: "",
            allowCommont: true,
            id: null
        },
        toolbars: {
            bold: true,
            italic: true,
            header: true,
            underline: true,
            strikethrough: true,
            mark: true,
            superscript: true,
            subscript: true,
            quote: true,
            link: true,
            imagelink: true,
            code: true,
            table: true,
            fullscreen: true,
            htmlcode: true,
            undo: true,
            redo: true,
            trash: true,
            save: true,
            navigation: true,
            subfield: true,
            preview: true
        },
        formRules:{
            required: ['title','kind']
        }
    }
  },
  components: {
    FileUpload,
  },
  methods: {
    saveArticle(flag){
        this.isPublish = false
        this.saveFlag = flag;
        if(this.files.length > 0 && this.hasNewFileAdd){
            if(!this.$refs.upload || !this.$refs.upload.active){
                this.startUpload()
            }
        }else{
            this.onSave(flag)
        }
    },
    submitArticle(){
        this.isPublish = true
        if(this.files.length > 0 && this.hasNewFileAdd){
            if(!this.$refs.upload || !this.$refs.upload.active){
                this.startUpload()
            }
        }else{
            this.submite()
        }
    },
    onSave(flag){
        if(!this.validInfo()){
            return;
        }
        R.Article.save({
            id: this.info.id,
            title: this.info.title,
            subpath: this.info.url,
            tags: this.info.tags===""?"":this.info.tags.join(","),
            categories: this.info.kind,
            content: this.value,
            usecommont: this.info.allowCommont?"on":"off",
            preview: "/files/"+this.imgAlias,
        }).then(resp => {
            console.log(resp)
            if(resp.ok){
                if (resp.code == 400) {
                    this.$Message(resp.message)
                }else{
                    if(resp.result.data){
                        this.info.id = resp.result.data
                        this.$Message("保存成功")
                        if(flag){
                            this.$router.replace('/vue/admin/article/history');
                        }
                    }else{
                        this.$Message("返回消息有误")
                    }
                }
                
            }else{
                this.$Message("服务端错误")
            }
        })
    },
    validInfo(){
        if(!this.info.title){
            // this.info.title = "默认标题"
            this.$Message("请填写标题")
            return false;
        }
        if(!this.info.kind){
            // this.info.kind = 0
            this.$Message("请选择文章分类")
            return false;
        }
        return true;
    },
    submite(){
        if(!this.validInfo()){
            return;
        }
        R.Article.publish({
            id: this.info.id,
            title: this.info.title,
            subpath: this.info.url,
            tags: this.info.tags===""?"":this.info.tags.join(","),
            categories: this.info.kind,
            content: this.value,
            usecommont: this.info.allowCommont?"on":"off",
            preview: "/files/"+this.imgAlias
        }).then(resp => {
            console.log(resp)
            if(resp.ok){
                if (resp.code == 400) {
                    this.$Message(resp.message)
                }else{
                    this.info.id = resp.result.data;
                    this.$Message("发布文章成功");
                    this.$router.replace('/vue/admin/article/history');
                }
                
            }else{
                this.$Message("服务端错误")
            }
        })
    },
    getKinds(){
        R.Article.kinds().then(resp => {
            if (resp.ok) {
                this.kinds = resp.result.data.map(line => {
                    line.title = line.name;
                    line.key = line.id;
                    return line;
                })
            }else{
                this.$Message("加载分类信息错误")
            }
        })
    },
    initArticle(){
        const article = store.state.article
        console.log(article)
        if (article) {
            this.value = article.content
            this.info.title = article.title
            this.info.tags = article.tags
            this.info.kind = article.categories
            this.info.url = article.subpath
            this.info.allowCommont = article.usecommont === "on"
            this.info.id = article.id
            this.files.push({
                src: article.preview
            })
            if(article.preview){
                this.imgAlias = article.preview.split("/")[2]
            }
            console.log(this.info)
            store.dispatch('updateArticle', null);
        }else{
            this.value = "文章简介\n\n<!-- more -->\n\n文章内容"
        }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
          this.files.forEach(f => {
                this.$refs.upload.remove(f)
                this.files.length = 0 //清空数组
          })
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            this.$Message(newFile.name+" - 文件类型不正确!")
            return prevent()
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            this.$Message(newFile.name+" - 文件类型不正确!")
            return prevent()
        }

        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
      }
    },
    inputFile(newFile, oldFile) {
        this.hasNewFileAdd = true
        if (newFile && oldFile && !newFile.active && oldFile.active) {
            if(newFile.response.result){
                this.imgAlias = newFile.response.result.data
                console.log("img-alias",this.imgAlias)
            }else{
                this.$Message("上传图片错误")
            }
        }
        if (newFile && !oldFile) {
            // add
            console.log('add', newFile)
        }
        if (newFile && oldFile) {
            // update
            console.log('update', newFile)
            if(this.$refs.upload && this.$refs.upload.uploaded){
                if(this.imgAlias){
                    if(this.isPublish){
                        this.submite()
                    }else{
                        this.onSave(this.saveFlag)
                    }
                }else{
                    this.$Message.error("文件上传未成功")
                }
            }
        }
        if (!newFile && oldFile) {
            // remove
            console.log('remove', oldFile)
        }
    },
    removeFile(file){
        this.$refs.upload.remove(file)
    },
    startUpload(){
        this.$refs.upload.active = true
    }
  },
  mounted: function(){
        this.hasNewFileAdd = false
        this.getKinds()
        this.initArticle()
        var self = this;
        const id = setInterval(function(){
            self.$Message({type:"success",text: "保存成功"})
            self.saveArticle(false)
        },1000*60*2)
        this.intervalId = id
  },
  beforeDestroy: function(){
    clearInterval(this.intervalId)
    store.dispatch('updateArticle', undefined);
  }
}
</script>

<style>
.article-left{
    broder: 1px solid #000;
}
</style>