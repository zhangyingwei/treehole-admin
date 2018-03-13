<style>
.fileinput-button {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.fileinput-button input{
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';
    font-size: 200px;
}
.fileinput-button input:hover{
    cursor: pointer;
}
</style>

<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                素材管理
            </div>
            <div class="h-panel-bar" v-padding="10">
               <!-- <Reso :options="options" type="files" :limit="2" data-type="file" v-model="file"></Reso> -->
                <!-- <button class="h-btn h-btn-yellow">添加</button> -->
                <span class="fileinput-button">
                    <span class="h-btn h-btn-yellow" @click="submitForm($event)">上传</span>
                    <input type="file" @change="getFile($event)" accept="image/png, image/jpeg, image/gif, image/jpg, application/pdf">
                </span>
            </div>
            <div class="h-panel-bar" v-padding="10">
               <Form mode="inline">
                    <FormItem label="名称">
                        <div class="h-input">
                            <input type="text" v-model="query.name"/>
                        </div>
                    </FormItem>
                    <FormItem label="类型">
                        <div class="h-input">
                            <input type="text" v-model="query.type"/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Button color="primary" @click="search">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" prop="id" :width="80" ></TableItem>
                    <TableItem title="名称" prop="name"></TableItem>
                    <TableItem title="类型" :width="150">
                        <template slot-scope="props">
                            <span class="h-tag h-tag-primary">{{props.data.type}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="外链" :width="300">
                        <template slot-scope="props">
                            <input type="text" v-model="props.data.url" readonly/>
                            <Button class="copyin" icon="h-icon-plus" :data-clipboard-text="props.data.url" @click="copyin" color="success">复制</Button>
                        </template>
                    </TableItem>
                    <TableItem title="预览" :width="100" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="preview(props.data)">
                                <i class="h-icon-search"></i>
                            </button>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="50" fixed="right">
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-red" @click="remove(props.data)">
                                <i class="h-icon-trash"></i>
                            </button>
                        </template>
                    </TableItem>
                    <div slot="empty">自定义提醒：暂时无数据!</div>
                </Table>
                <div v-padding="10">
                    <Pagination :cur="page.current" :size="page.size" :total="page.total" @change="currentChange" :small="true"></Pagination>
                </div>
                <Loading text="加载中..." :loading="loading"></Loading>
            </div>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard';
import reso from './reso';

export default {
  data() {
    return {
        query: {
            name: null,
            type: null
        },
        file: "",
        datas: [
            { id: 5, name: '测试5',type: "jpeg",url: "http://blog.zhangyingwei.com/files/6f066e81-4cca-4200-9bf7-f1a24099c57b"},
            { id: 6, name: '测试6',type: "png",url: "http://blog.zhangyingwei.com"},
        ],
        loading: false,
        page: {
            current: 1,
            total: 200,
            size: 10
        },
        options: {
            max_file_size: '1mb'
        },
        file: []
    }
  },
  components: {
    Reso: reso
  },
  methods: {
    search(){
        this.loading = true
        R.Resources.search({
            current: this.page.current,
            pageSize: this.page.size,
            name: this.query.name,
            contentType: this.query.type
        }).then(resp => {
            if (resp.ok) {
                if(resp.code == 200){
                    console.log(resp)
                    this.datas = resp.result.data.resources.map(line => {
                        line.url = "http://localhost:5000/files/"+line.alias
                        // line.url = "http://"+window.location.host+"/files/"+line.alias
                        line.type = line.contentType
                        return line
                    })
                    this.page.total = resp.result.data.page.total
                }else{
                    this.$Message(resp.message)
                }
            }else{
                this.$Message("系统错误")
            }
            this.loading = false
        })
    },
    remove(line){
        this.loading = true
        R.Resources.deleteOne(line.id).then(resp => {
            if (resp.ok) {
                this.$Message(resp.message)
            }else{
                this.$Message("系统错误")
            }
            this.loading = false
            this.search()
        })
    },
    getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
    },
    submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', this.file);
        let config = {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }
        this.$http.post('/upload', formData, config).then(function (res) {
            if (res.status === 2000) {
            /*这里做处理*/
            }
        })
    },
    currentChange(value){
        this.page.current = value.cur
        this.page.size = value.size
        this.search()
    },
    copyin(){
        this.$Message({
            type: "success",
            text: "复制外链到剪贴板啦，去粘贴吧!"
        })
    },
    preview(line){
        var content = ""
        if(line.type.slice(0, "image".length) === "image"){
            content = "<img style='max-width:1000px;' src='"+line.url+"'/>"
        }else{
            content = "类型暂不支持"
        }
        this.$Modal({
            title: "预览",
            content: content
        })
    },
    fileclick(file) {
      this.$Modal({
        title: '预览或者下载',
        content: `自定义处理文件预览或者下载`
      })
    }
  },
  mounted: function(){
      const clipboard = new Clipboard('.copyin');
      this.search()
  }
}
</script>