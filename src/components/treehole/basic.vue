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
        <div class="h-panel" v-height="280" v-padding="10">
          <div class="h-panel-bar">
            <span class="h-panel-title">基础信息</span>
          </div>
          <div>
            <Form :readonly="basic.readonly" labelPosition="left">
              <FormItem label="名称">
                <input type="text" v-model="basic.name"/>
              </FormItem>
              <FormItem label="地址">12</FormItem>
              <FormItem label="简介">asdfasdfsa</FormItem>
              <FormItem >
                <Button color="primary" :loading="isLoading" @click="submite_basic">提交</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Col>
      <Col :width="12">
      <div class="h-panel progress-div" v-height="280">
        <div class="clearfix">
          <div class="float-right"><span v-color:gray>总共达成</span><i class="h-split"></i><span v-font="48" style="font-weight:100">200</span><i class="h-split"></i><span v-color:primary>W</span></div>
        </div>
        <p><Progress :percent="99" color="green"><span slot="title">推荐面试</span><span slot="text">4个</span></Progress></p>
        <p><Progress :percent="12" color="red"><span slot="title">客户面试</span><span slot="text">0个</span></Progress></p>
        <p><Progress :percent="12" color="red"><span slot="title">Offer谈判</span><span slot="text">0个</span></Progress></p>
        <p><Progress :percent="12" color="red"><span slot="title">入职试用</span><span slot="text">0个</span></Progress></p>
        <p><Progress :percent="12" color="red"><span slot="title">入职试用</span><span slot="text">0个</span></Progress></p>
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
      isLoading: false,
      basic: {
        readonly: true,
        name: "张英伟的博客"
      }
    }
  },
  methods: {
    submite_basic(){
      this.isLoading=true
    }
  }
}
</script>
