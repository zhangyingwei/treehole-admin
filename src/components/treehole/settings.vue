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
            <span class="h-panel-title">用户信息</span>
          </div>
          <div class="h-panel-body">
            <Form labelPosition="left">
              <FormItem label="昵称">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.name"/>
              </FormItem>
              <FormItem label="邮箱">
                <input :readonly="basic.readonly" type="text" v-model="basic.data.url"/>
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
        edit: false,
        btn: {
          text: "编辑",
          isLoading: false
        },
        readonly: true,
        data: {
          name: "二狗子",
          url:"ergouzi@163.com",
          weibo: "ergouzi",
          weixin: "ergouzi",
          zhihu: "zhihu-ergouzi",
          facebook: "zhangyw",
          twitter: "twitter",
          desc: "记录我的学习生活，这句话长点会好看，所以后边的话完全是为了凑字数而存在。"
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
    }
  }
}
</script>
