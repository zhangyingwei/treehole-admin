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
            <i class="h-icon-edit"></i> &nbsp;{{count}}
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
            <i class="h-icon-link"></i> &nbsp;{{rescount}}
          </div>
        </div>
      </Col>
      <Col :width="6">
        <div class="h-panel" v-height="150">
          <div class="h-panel-bar" v-padding="10">
            访问人数统计
          </div>
          <div class="h-panel-body" v-font="40">
            <i class="h-icon-user"></i> &nbsp;{{visitcount}}
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
      count: 0,
      rescount: 0,
      visitcount: 0
    }
  },
  methods: {
    getArticleCount(){
      R.Home.articleCount().then(resp => {
        if (resp.ok) {
          if(resp.code == 200){
            this.count = resp.result.data
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
      })
    },
    getResourcesCount(){
      R.Home.resourcesCount().then(resp => {
        if (resp.ok) {
          if(resp.code == 200){
            this.rescount = resp.result.data
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
      })
    },
    getVisitCount(){
      R.Home.visitCount().then(resp => {
        if (resp.ok) {
          if(resp.code == 200){
            this.visitcount = resp.result.data
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
      })
    }
  },
  mounted: function(){
      this.getArticleCount()
      this.getResourcesCount()
      this.getVisitCount()
  }
}
</script>
