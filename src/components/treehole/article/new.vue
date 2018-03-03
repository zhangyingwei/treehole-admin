<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="20">
                新建文章
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
                            <FormItem>
                                <div class="h-btn-group h-btn-group-l">
                                    <button class="h-btn h-btn-primary"><i class="h-icon-outbox"></i><span>发表</span></button>
                                    <button class="h-btn h-btn-blue"><i class="h-icon-completed"></i><span>存为草稿</span></button>
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
        kinds: ["java","php"],
        info: {
            title: "",
            tags: "",
            kind: "",
            url: ""
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
            required: ['title','tags','kind']
        }
    }
  },
  methods: {
    onSave(){
        console.log(this.value)
    }
  },
  mounted: function(){
      var self = this;
      setInterval(function(){
        self.$Message({type:"success",text: "保存成功"})
      },1000*60)
  }
}
</script>

<style>
.article-left{
    broder: 1px solid #000;
}
</style>