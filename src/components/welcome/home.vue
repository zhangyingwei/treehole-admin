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
        <div class="h-panel" v-height="150">
          <div class="h-panel-bar" v-padding="10">
            文章总数
          </div>
          <div class="h-panel-body" v-font="40">
            <i class="h-icon-edit"></i> &nbsp;1823
          </div>
        </div>
      </Col>
      <Col :width="6">
        <div class="h-panel" v-height="150">
          <div class="h-panel-bar" v-padding="10">
            评论总数
          </div>
          <div class="h-panel-body" v-font="40">
            <i class="h-icon-message"></i> &nbsp;0
          </div>
        </div>
      </Col>
      <Col :width="6">
        <div class="h-panel" v-height="150">
          <div class="h-panel-bar" v-padding="10">
            素材总数
          </div>
          <div class="h-panel-body" v-font="40">
            <i class="h-icon-link"></i> &nbsp;100
          </div>
        </div>
      </Col>
      <Col :width="6">
        <div class="h-panel" v-height="150">
          <div class="h-panel-bar" v-padding="10">
            访问统计
          </div>
          <div class="h-panel-body" v-font="40">
            <i class="h-icon-user"></i> &nbsp;100
          </div>
        </div>
      </Col>
      <Col :width="24">
      <div class="h-panel">
        <div class="h-panel-bar">
          <span class="h-panel-title">点击量统计</span>
        </div>
        <div class="h-panel-body">
            panel
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
    }
  },
  methods: {}
}
</script>
