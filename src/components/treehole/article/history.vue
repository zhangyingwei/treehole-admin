<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                <div class="h-panel-body">
                    <Form labelPosition="left" mode="inline" :model="toolbar">
                        <FormItem label="标题" prop="name">
                            <Search @search="search" v-model="toolbar.title" v-width="300" showSearchButton placeholder="请输入文章标题"></Search>
                        </FormItem>
                        <FormItem prop="flag">
                            <SwitchList v-model="toolbar.flag" :datas="flagList"></SwitchList>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas" :columns="columns">
                    <div slot="empty">自定义提醒：暂时无数据</div>
                </Table>
                <div v-padding="10">
                    <Pagination :cur="page.current" :total="page.total" @change="currentChange" :small="true"></Pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
        toolbar: {
            title: "",
            flag: 4
        },
        flagList: [
            {
                key: 1,
                title: "已发布"
            },{
                key: 2, title: "未发布"
            },{
                key: 3,
                title: "已删除"
            },{
                key: 4,
                title: "全部"
            }
        ],
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
        ],
        page: {
            current: 1,
            total: 200
        }
    }
  },
  methods: {
    search(data){
        this.$Message(this.toolbar.title)
    },
    currentChange(value){
        this.total = this.total + 1;
        console.log(value.cur, value.size);
    }
  },
  mounted: function(){
      
  }
}
</script>