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
                            <FormItem label="允许评论" prop="commont">
                                <h-switch v-model="info.allowCommont"></h-switch>
                            </FormItem>
                            <FormItem>
                                <div class="h-btn-group h-btn-group-l">
                                    <button class="h-btn h-btn-primary" @click="submite" ><i class="h-icon-outbox"></i><span>发表</span></button>
                                    <button class="h-btn h-btn-blue" @click="onSave"><i class="h-icon-completed"></i><span>存为草稿</span></button>
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="h-col-18">
                        <mavon-editor v-height="500" v-model="value" :toolbars="toolbars" @save="onSave"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
        value: "",
        kinds: [{
            title:"默认类型",key: 0
        },{
            title: "java",key: 1
        },{
            title: "php",key: 2
        }],
        info: {
            title: "",
            tags: "",
            kind: "",
            url: "",
            allowCommont: true,
            id: ""
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
  methods: {
    onSave(){
        this.validInfo()
        R.Article.save({
            id: this.info.id,
            title: this.info.title,
            subpath: this.info.url,
            tags: this.info.tags===""?"":this.info.tags.join(","),
            categories: this.info.kind,
            content: this.value,
            usecommont: this.info.allowCommont?"on":"off"
        }).then(resp => {
            console.log(resp)
            if(resp.ok){
                if (resp.code == 400) {
                    this.$Message(resp.message)
                }else{
                    this.info.id = resp.result.data
                    this.$Message("保存成功")
                }
                
            }else{
                this.$Message("服务端错误")
            }
        })
    },
    validInfo(){
        if(!this.info.title){
            this.info.title = "默认标题"
        }
        if(!this.info.kind){
            this.info.kind = 0
        }
    },
    submite(){
        this.validInfo()
        this.$Message(this.value)
    }
  },
  mounted: function(){
      var self = this;
      setInterval(function(){
        self.$Message({type:"success",text: "保存成功"})
        self.onSave()
      },1000*60*2)
  }
}
</script>

<style>
.article-left{
    broder: 1px solid #000;
}
</style>