<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                素材管理
            </div>
            <div class="h-panel-body">
                <div>
                    <button class="h-btn h-btn-yellow">添加</button>
                </div>
                <Table :datas="datas">
                    <TableItem title="序号" prop="id" :tooltip="true"></TableItem>
                    <TableItem title="名称" prop="name"></TableItem>
                    <TableItem title="类型" prop="type"></TableItem>
                    <TableItem title="外链" :width="300">
                        <template slot-scope="props">
                            <input type="text" v-model="props.data.url" readonly/>
                            <Button class="copyin" icon="h-icon-plus" :data-clipboard-text="props.data.url" @click="copyin" color="success">复制</Button>
                        </template>
                    </TableItem>
                    <TableItem title="预览" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="preview(props.data.url)">
                                <i class="h-icon-search"></i>
                            </button>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="50" fixed="right">
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-red" @click="remove(datas, props.data)">
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
import Clipboard from 'clipboard';

export default {
  data() {
    return {
        datas: [
            { id: 5, name: '测试5',type: "jpeg",url: "http://blog.zhangyingwei.com/files/6f066e81-4cca-4200-9bf7-f1a24099c57b"},
            { id: 6, name: '测试6',type: "png",url: "http://blog.zhangyingwei.com"},
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
    },
    copyin(){
        this.$Message({
            type: "success",
            text: "复制外链到剪贴板啦，去粘贴吧!"
        })
    },
    preview(url){
        this.$Modal({
            title: "预览",
            content: "<img src=""/>>"
        })
    }
  },
  mounted: function(){
      const clipboard = new Clipboard('.copyin');
  }
}
</script>