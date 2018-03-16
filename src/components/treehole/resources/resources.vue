<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                素材管理
            </div>
            <div class="h-panel-bar" v-padding="10">
               <!-- <Reso :options="options" type="files" :limit="2" data-type="file" v-model="file"></Reso> -->
                <!-- <button class="h-btn h-btn-yellow">添加</button> -->
                <div class="h-btn-group h-btn-group-l">
                    <file-upload
                          class="h-btn h-btn-primary"
                          post-action="/admin/files/upload"
                          extensions="gif,jpg,jpeg,png,webp,pdf"
                          accept="image/png,image/gif,image/jpeg,image/webp,application/pdf"
                          :headers="headers"
                          :multiple="true"
                          :size="1024 * 1024 * 100"
                          v-model="files"
                          @input-filter="inputFilter"
                          @input-file="inputFile"
                          ref="upload">
                          选择文件
                    </file-upload>
                    <button class="h-btn h-btn-green" style="overflow" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="startUpload">
                      <i class="h-icon-outbox"></i>
                      开始上传
                    </button>
                    <button type="button" class="h-btn h-btn-red"  v-else @click.prevent="$refs.upload.active = false">
                      <i class="fa fa-stop" aria-hidden="true"></i>
                      暂停
                    </button>
                </div>
            </div>
            <div v-if="files.length > 0" class="h-panel-bar" v-padding="10">
                <ul>
                    <li v-for="file in files">
                        <Row :space-x="19" :space-y="5" v-if="!file.success">
                            <Col width="18" >
                                 <span class="gray-color">{{file.name}}</span>
                            </Col>
                            <Col width="6" >
                                <button class="h-btn h-btn-red h-btn-s" @click.prevent="removeFile(file)">
                                    移除
                                    <i class="h-icon-close"></i>
                                </button>
                            </Col>
                        </Row>
                    </li>
                </ul>
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
import FileUpload from 'vue-upload-component'

export default {
  data() {
    return {
        query: {
            name: null,
            type: null
        },
        headers:{
            "treehole-tocken": Utils.getLocal("token")
        },
        files: [],
        datas: [],
        loading: false,
        page: {
            current: 1,
            total: 200,
            size: 10
        },
        options: {
            max_file_size: '1mb'
        },
        file: [],
        // isUploaded: $refs.upload ? $refs.upload.uploaded : true
    }
  },
  components: {
    FileUpload,
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
                    this.datas = resp.result.data.resources.map(line => {
                        line.url = "/files/"+line.alias
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
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            this.$Message(newFile.name+" - 文件类型不正确!")
            return prevent()
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            this.$Message(newFile.name+" - 文件类型不正确!")
            return prevent()
        }
      }
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile)
        if(this.$refs.upload && this.$refs.upload.uploaded){
            this.$Message("上传完毕")
            this.search()
        }
      }
      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    },
    removeFile(file){
        this.$refs.upload.remove(file)
    },
    startUpload(){
        if(this.files.length > 0){
            this.$refs.upload.active = true
        }else{
            this.$Message("请先选择文件")
        }
    }
  },
  mounted: function(){
      const clipboard = new Clipboard('.copyin');
      this.search()
  }
}
</script>