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
      <Col :width="6">
        <div class="h-panel" v-padding="10">
          <div class="h-panel-bar">
            <span class="h-panel-title">用户信息</span>
          </div>
          <div class="h-panel-body">
            <Form labelPosition="left">
              <FormItem label="昵称">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.nickname"/>
              </FormItem>
              <FormItem label="邮箱">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.email"/>
              </FormItem>
              <FormItem label="微博">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.weibo"/>
              </FormItem>
              <FormItem label="微信">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.weixin"/>
              </FormItem>
              <FormItem label="知乎">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.zhihu"/>
              </FormItem>
              <FormItem label="Fasebook">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.facebook"/>
              </FormItem>
              <FormItem label="Twitter">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.twitter"/>
              </FormItem>
              <FormItem >
                <Button color="primary" :loading="basic.btn.isLoading" @click="submite_basic">{{basic.btn.text}}</Button>
              </FormItem>
            </Form>
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
        loading: false,
        edit: false,
        btn: {
          text: "编辑",
          isLoading: false
        },
        readonly: true,
        data: {
          nickname: "",
          email:"",
          weibo: "",
          weixin: "",
          zhihu: "",
          facebook: "",
          twitter: "",
          desc: ""
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
        this.updateUserInfo()
      }
    },
    updateUserInfo(){
      this.basic.loading = true;
      R.Blog.updateUserInfo(this.basic.data).then(resp => {
        if(resp.ok){
          this.$Message("修改信息成功")
        }else{
          this.$Message("修改信息失败")
        }
        this.basic.btn.isLoading=false
      })
    },
    queryUserInfo(){
      R.Blog.settings().then(resp=>{
            if(resp.ok){
                this.basic.data = resp.result.data
                // this.$Message("加载数据成功")
            }else{
              this.$Message(resp.message)  
            }
            
      });
    }
  },
  mounted: function(){
      this.queryUserInfo()
  }
}
</script>
