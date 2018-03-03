<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                文章分类列表
                <button class="h-btn h-btn-yellow">添加</button>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" prop="id" :tooltip="true"></TableItem>
                    <TableItem title="名称" prop="name"></TableItem>
                    <TableItem title="状态">
                        <template slot-scope="props">
                            <span v-if="props.data.statu === 1" class="h-tag h-tag-bg-green">正常</span>
                            <span v-if="props.data.statu === 2" class="h-tag h-tag-bg-primary">不正常</span>
                            <span v-if="props.data.statu === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="150" fixed="right">
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="remove(datas, props.data)">
                                编辑
                                <i class="h-icon-edit"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-red" @click="remove(datas, props.data)">
                                删除
                                <i class="h-icon-trash"></i>
                            </button>
                        </template>
                    </TableItem>
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
        datas: [
            { id: 5, name: '测试5', statu: 1},
            { id: 6, name: '测试6', statu: 1},
            { id: 7, name: '测试7', statu: 2},
            { id: 5, name: '测试5', statu: 1},
            { id: 6, name: '测试6', statu: 9},
            { id: 7, name: '测试7', statu: 1},
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