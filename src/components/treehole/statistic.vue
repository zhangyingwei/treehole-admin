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
          <span class="h-panel-title">日志检索</span>
        </div>
        <div class="h-panel-bar">
            <Form mode="inline" :model="query">
                <FormItem label="IP" prop="ip">
                    <input type="text" v-model="query.ip" />
                </FormItem>
                <FormItem label="定位" prop="location">
                    <input type="text" v-model="query.location" />
                </FormItem>
                <FormItem label="请求类型" prop="reqtype">
                    <input type="text" v-model="query.reqtype" />
                </FormItem>
                <FormItem label="来源" prop="referer">
                    <input type="text" v-model="query.referer" />
                </FormItem>
                <FormItem label="Agent" prop="agent">
                    <input type="text" v-model="query.agent" />
                </FormItem>
                <FormItem label="时间" prop="datetime">
                    <DateRangePicker v-model="query.datetime" placeholder="请选择日期"></DateRangePicker>
                </FormItem>
                <FormItem>
                    <Button color="primary" @click="submitQurey">提交</Button>
                </FormItem>
            </Form>
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
        query: {
            ip: "",
            location: "",
            reqtype: "",
            referer: "",
            agent: "",
            datetime: null
        },
        visit: {
            current: 1,
            total: 200,
            columns: [
                { title: 'ID', prop: 'id', width: 100, tooltip: true, sort: true },
                { title: 'IP', prop: 'ip', width: 120},
                { title: '定位', prop: 'ip_location', width: 120},
                { title: '请求类型', prop: 'reqtype',width:80 },
                { title: '来源', prop: 'referer',width: 250},
                { title: '地址', prop: 'url',width: 250},
                { title: 'Agent', prop: 'agent'},
                { title: '时间', prop: 'datetime' ,width: 150 },
            ],
            datas: [
                { id: 4, ip: '115.171.171.172',ip_location:"中国,北京,北京", reqtype: 'GET',referer: "http://blog.zhangyingwei.com/articles/3",url: "http://blog.zhangyingwei.com/articles|/articles", address: "上海",agent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",datetime: "2015-01-01 00:00:00" },
                { id: 5, ip: '115.171.171.172',ip_location:"中国,北京,北京", reqtype: 'GET',referer: "http://blog.zhangyingwei.com/articles/3",url: "http://blog.zhangyingwei.com/articles|/articles", address: "上海",agent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",datetime: "2015-01-01 00:00:00" },
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
    },
    submitQurey(){
        if(this.query){
            this.$Notice(this.query.ip)
            console.log(this.query)
        }
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