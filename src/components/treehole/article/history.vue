<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                历史文章管理
            </div>
            <div class="h-panel-bar" v-padding="10">
                <Form mode="inline" :model="toolbar">
                    <FormItem prop="name">
                        <div class="h-input">
                            <Search @search="search" v-model="toolbar.title" showSearchButton placeholder="请输入文章标题"></Search>
                        </div>
                    </FormItem>
                    <FormItem prop="flag">
                        <SwitchList :small="true" v-model="toolbar.flag" :datas="flagList"></SwitchList>
                    </FormItem>
                </Form>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" prop="id" :width="100" ></TableItem>
                    <TableItem title="标题" prop="title" :width="200" ></TableItem>
                    <TableItem title="简介" :width="300">
                        <template slot-scope="props">
                            <Tooltip theme="white" placement="right">
                                <span v-if="props.data.desc && props.data.desc.length<=20" class="text-hover desc-text">{{props.data.desc}}</span>
                                <span v-if="props.data.desc && props.data.desc.length>20" class="text-hover desc-text">{{props.data.desc.substr(0,30)}}...</span>
                                <div slot="content">
                                    {{props.data.desc}}
                                </div>
                            </Tooltip>
                        </template>
                    </TableItem>
                    <TableItem title="访问地址" prop="url"></TableItem>
                    <TableItem title="类别">
                        <template slot-scope="props">
                            <span class="h-tag h-tag-bg-yellow">{{props.data.kind}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="标签" prop="tags">
                        <template slot-scope="props">
                            <span v-for="kind in props.data.kinds" class="h-tag h-tag-bg-green">{{kind}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="允许评论" :width="100">
                        <template slot-scope="props">
                            <i v-if="props.data.allowCommone" class="h-icon-check"></i>
                            <i v-if="!props.data.allowCommone" class="h-icon-close"></i>
                        </template>
                    </TableItem>
                    <TableItem title="状态">
                        <template slot-scope="props">
                            <span v-if="props.data.statu === 1" class="h-tag h-tag-bg-green">已发布</span>
                            <span v-if="props.data.statu === 2" class="h-tag h-tag-bg-primary">未发布</span>
                            <span v-if="props.data.statu === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="300" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s" @click="remove(datas, props.data)">
                                发布
                                <i class="h-icon-edit"></i>
                            </button>
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
        datas: [
            {
                id: 5,
                title: '2017年总结',
                desc: "元旦已",
                url: "http://blog.zhangyingwei.com/admin/articles/history",
                kind: "生活呀生活",
                kinds: [
                    "生活",
                    "总结"
                ],
                allowCommone: true,
                statu: 2
            },
            {
                id: 6,
                title: '2017年总结',
                desc: "元旦已经过去有几天了，前段时间回了趟家。回来就感冒了，今天感觉比较严重，所以请假输液，完事之后回家睡了一觉，现在趁着老婆还没下班回家，总结总结2017. 回想一下2017年，过的还真快。仿佛时间一下子就过去了。真是应了古人的那句白驹过隙日月如梭。好了，感慨的话就不多说了，从以下几方面总结一下。",
                url: "http://blog.zhangyingwei.com/admin/articles/history",
                kind: "生活呀生活",
                kinds: [
                    "生活",
                    "总结"
                ],
                allowCommone: false,
                statu: 1
            },
            {
                id: 7,
                title: '2017年总结',
                desc: "元旦已经过去有几天了，前段时间回了趟家。回来就感冒了，今天感觉比较严重，所以请假输液，完事之后回家睡了一觉，现在趁着老婆还没下班回家，总结总结2017. 回想一下2017年，过的还真快。仿佛时间一下子就过去了。真是应了古人的那句白驹过隙日月如梭。好了，感慨的话就不多说了，从以下几方面总结一下。",
                url: "http://blog.zhangyingwei.com/admin/articles/history",
                kind: "生活呀生活",
                kinds: [
                    "生活",
                    "总结"
                ],
                allowCommone: true,
                statu: 1
            }
        ],
        page: {
            current: 1,
            total: 200
        }
    }
  },
  methods: {
    search(data){
        if (data) {
            this.$Message(this.toolbar.title)
        }
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
