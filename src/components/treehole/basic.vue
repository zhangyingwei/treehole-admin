<style lang='less'>
.progress-div{
  padding: 30px 40px;
  >p{
    margin: 10px;
  }
}
</style>
<template>
  <div class="app-home" v-padding="20">
    <Row :space="20">
      <Col :width="12">
        <div class="h-panel" v-padding="10">
          <div class="h-panel-bar">
            <span class="h-panel-title">基础信息</span>
          </div>
          <div class="h-panel-body">
            <Form labelPosition="left">
              <FormItem label="名称">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.name"/>
              </FormItem>
              <FormItem label="地址">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.url"/>
              </FormItem>
              <FormItem label="简介">
                <textarea rows="3" :readonly="basic.readonly" v-autosize v-wordcount="50" v-model="basic.data.desc"></textarea>
              </FormItem>
              <FormItem >
                <Button color="primary" :loading="basic.btn.isLoading" @click="submite_basic">{{basic.btn.text}}</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Col>
      <Col :width="12">
      <div class="h-panel progress-div" v-padding="20" >
        <div class="h-panel-bar">
          <span class="h-panel-title">安装信息</span>
        </div>
        <div class="h-panel-body">
          <Form :readonly="true" :labelWidth="100" labelPosition="left">
            <FormItem label="时间"> <i class="h-icon-calendar"></i> &nbsp;&nbsp;{{install.data.idata}}</FormItem>
            <FormItem label="地址"><i class="h-icon-link"></i> &nbsp;&nbsp; {{install.data.ilocal}}</FormItem>
            <FormItem label="java"><i class="h-icon-star"></i> &nbsp;&nbsp;{{install.data.ijdkversion}}</FormItem>
            <FormItem label="系统类型"><i class="h-icon-setting"></i> &nbsp;&nbsp;{{install.data.iosdesktop}}</FormItem>
            <FormItem label="系统型号"><i class="h-icon-setting"></i> &nbsp;&nbsp;{{install.data.iosname}}</FormItem>
            <FormItem label="CPU"><i class="h-icon-setting"></i> &nbsp;&nbsp;{{install.data.ioscpu}}</FormItem>
          </Form>
        </div>
      </div>
      </Col>
      <Col :width="24">
      <div class="h-panel">
        <div class="h-panel-bar">
          <span class="h-panel-title">搭建顺序</span>
        </div>
        <div class="h-panel-body demo-doc">
          这里是一些信息
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>

export default {
  data() {
    return {
      basic: {
        edit: false,
        btn: {
          text: "编辑",
          isLoading: false
        },
        readonly: true,
        data: {
          name: "张英伟的博客",
          url:"http://blog.zhangyingwei.com",
          desc: "记录我的学习生活，这句话长点会好看，所以后边的话完全是为了凑字数而存在。"
        }
      },
      install: {
        data: {
          idata: "2017-06-14 11:00:09",
          ilocal: "172.0.0.1",
          ijdkversion: "jdk_18",
          iosname: "Linux",
          ioscpu: "10.0.1.2.123",
          iosdesktop: "intel"
        }
      }
    }
  },
  methods: {
    submite_basic(){
      var self = this;
      this.basic.edit = !this.basic.edit
      if(this.basic.edit){
        this.basic.readonly=false
        this.basic.btn.text="提交"
      }else{
        this.basic.readonly=true
        this.basic.btn.isLoading=true
        setTimeout(function(){
          self.basic.btn.isLoading = false
          self.$Notice['success'](`修改信息成功`);
          self.basic.btn.text="编辑"
        },2000)
      }
      this.query_basic()
    },
    query_basic(){
      R.Blog.basic().then(resp=>{
        console.log(resp)
        if(resp.ok){
          this.basic.data = resp.result.data
        }else{
          this.$Message("加载基础信息错误")
        }
      });
    },
    query_install(){
      R.Blog.install().then(resp=>{
        console.log(resp)
        if(resp.ok){
          this.install.data = resp.result.data
        }else{
          this.$Message("加载基础信息错误")
        }
      });
    }
  },
  mounted: function(){
      this.query_basic()
      this.query_install()
  }
}
</script>
