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
            <span class="h-panel-title">来访统计</span>
          </div>
          <div class="h-panel-body">
            <div id="visit" ref="visit"></div>
          </div>
        </div>
      </Col>
      <Col :width="12">
      <div class="h-panel progress-div" v-padding="20" >
        <div class="h-panel-bar">
          <span class="h-panel-title">浏览器统计</span>
        </div>
        <div class="h-panel-body">
          <div id="visit" ref="browser"></div>
        </div>
      </div>
      </Col>
      <Col :width="24">
      <div class="h-panel">
        <div class="h-panel-bar">
          <span class="h-panel-title">搭建顺序</span>
        </div>
        <div class="h-panel-body demo-doc">
            <Table :datas="visit.datas" :columns="visit.columns">
                <div slot="empty">自定义提醒：暂时无数据</div>
            </Table>
            <div v-padding="20">
                <Pagination :cur="visit.current" :total="visit.total" @change="currentChange" :small="true"></Pagination>
            </div>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  data() {
    return {
       visit: {
            current: 1,
            total: 200,
            columns: [
                { title: '序号', prop: '$index', width: 100 },
                { title: 'ID', prop: 'id', width: 100, tooltip: true, sort: true },
                { title: '姓名', prop: 'name', tooltip: true, content: '测试', sort: true },
                { title: '年龄', prop: 'age', sort: true },
                { title: '地址', prop: 'address' },
            ],
            datas: [
                { id: 5, name: '测试5', age: 12, address: "上海" },
                { id: 6, name: '测试6', age: 13, address: "上海" },
                { id: 7, name: '测试7', age: 14, address: "上海" },
                { id: 5, name: '测试5', age: 17, address: "上海" },
                { id: 6, name: '测试6', age: 18, address: "上海" },
                { id: 7, name: '测试7', age: 12, address: "上海" },
            ]
        }
    }
  },
  methods: {
    currentChange(value) {
      this.total = this.total + 1;
      console.log(value.cur, value.size);
    },
    initCharts(){
        this.initVisit()
        this.initBrowser()
    },
    initVisit(){
        this.chart = echarts.init(this.$refs.visit);
        this.chart.setOption({
            title : {
                text: '用户访问来源',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['美国','英国','中国']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'美国'},
                        {value:310, name:'英国'},
                        {value:234, name:'中国'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]    
        })
    },
    initBrowser(){
        this.chart = echarts.init(this.$refs.browser);
        this.chart.setOption({
            title : {
                text: '浏览器使用情况统计',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['ie','英国','中国']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'ie'},
                        {value:310, name:'英国'},
                        {value:234, name:'中国'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]    
        })
    }
  },
  mounted: function(){
      this.initCharts()
  }
}
</script>

<style>
#visit{
    width: 100%;
    min-height: 200px;
}
</style>