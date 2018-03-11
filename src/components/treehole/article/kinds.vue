<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="20">
                文章分类列表
                <div class="h-panel-right">
                    <button class="h-btn h-btn-yellow" @click="addKind">添加</button>
                </div>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" prop="id" :tooltip="true"></TableItem>
                    <TableItem title="名称" prop="name"></TableItem>
                    <TableItem title="状态">
                        <template slot-scope="props">
                            <span v-if="props.data.flag === 0" class="h-tag h-tag-bg-green">正常</span>
                            <span v-if="props.data.flag === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="150" fixed="right">
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="edit(props.data)">
                                编辑
                                <i class="h-icon-edit"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-red" @click="remove(props.data)">
                                删除
                                <i class="h-icon-trash"></i>
                            </button>
                        </template>
                    </TableItem>
                    <div slot="empty">自定义提醒：暂时无数据</div>
                </Table>
                <div v-padding="10">
                    <Pagination :cur="page.current" :size="page.size" :total="page.total" @change="currentChange" :small="true"></Pagination>
                </div>
                <Loading text="忙着呢" :loading="loading"></Loading>
            </div>
        </div>
        <Modal v-model="modal.opened" :has-divider="true">
            <div slot="header">{{modal.title}}</div>
            <div v-width="400">
                <Form ref="form" :labelWidth="0" :model="modal" mode="inline">
                    <FormItem label="内容" prop="modalvalue">
                        <input type="text" v-model="modal.value"/>
                    </FormItem>
                    <FormItem>
                        <h-switch v-model="modal.isDel">删除</h-switch>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <button class="h-btn" @click="modal.opened=false">取消</button>
                <button class="h-btn h-btn-primary" @click="submitKind">确定</button>
            </div>
        </Modal>
    </div>
</template>
<script>

export default {
  data() {
    return {
        modal: {
            opened: false,
            title: "新增分类",
            value: "",
            id: null,
            isNew: false,
            isDel: false
        },
        loading: false,
        datas: [],
        page: {
            current: 1,
            total: 200,
            size: 10
        }
    }
  },
  methods: {
    search(data){
        this.loading = true
        R.Article.listKindsWithPage({
            current: this.page.current,
            pageSize: this.page.size
        }).then(resp => {
            console.log(resp)
            if (resp.ok) {
                if (resp.code == 200) {
                    this.datas = resp.result.data.kinds
                    this.page.total = resp.result.data.page.total
                }else{
                    this.$Message("数据请求错误")
                }
            }else{
                this.$Message("服务端错误")
            }
            this.loading = false
        })
    },
    currentChange(value){
        this.page.current = value.cur
        this.page.size = value.size
        this.search()
    },
    addKind(){
        this.modal.isNew = true
        this.modal.title="新增分类"
        this.modal.value = ""
        this.modal.opened=true
        this.modal.isDel = false
    },
    submitKind(){
        this.loading = true
        if (this.modal.isNew) {
            R.Article.addOneKind({
                name: this.modal.value,
                flag: this.modal.isDel? 9:0
            }).then(resp => {
                if (resp.ok) {
                    this.$Message(resp.message)
                }else{
                    this.$Message("系统错误")
                }
                this.modal.opened=false
                this.search()
            })
        }else{
            R.Article.updateOneKind({
                id: this.modal.id,
                name: this.modal.value,
                flag: this.modal.isDel? 9:0
            }).then(resp => {
                if (resp.ok) {
                    this.$Message(resp.message)
                }else{
                    this.$Message("系统错误")
                }
                this.modal.opened=false
                this.search()
            })
        }
    },
    edit(line){
        console.log(line)
        this.modal.isNew = false
        this.modal.title="编辑"
        this.modal.opened = true
        this.modal.value = line.name
        this.modal.id = line.id
        this.modal.isDel = (line.flag == 9)
    },
    remove(line){
        this.loading = true
        R.Article.deleteOneKind(line.id).then(resp => {
            if (resp.ok) {
                this.$Message(resp.message)
            }else{
                this.$Message("系统错误")
            }
            this.search()
            this.loading = false
        })
    }
  },
  mounted: function(){
      this.search()
  }
}
</script>