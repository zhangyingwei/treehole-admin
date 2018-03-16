<template>
  <div class="app-header">
    <div class="app-header-title"><a href="#">TreeHole</a></div>
    <div class="float-right app-header-info">
      <span><a v-font="20" href="https://github.com/zhangyingwei/treehole-jekyll" target="_blank"><i class="h-icon-github"></i></a></span>
      <DropdownMenu class-name="app-header-dropdown" placement="bottom-end"
                    :datas="infoMenu"
                    @onclick="trigger"><span>{{loginuser}}</span></DropdownMenu>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loginuser: "",
      infoMenu: [
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' },
      ]
    }
  },
  computed: {
    ...mapState({
      User: 'User'
    })
  },
  methods: {
    trigger(data) {
      if (data == 'logout') {
        Utils.removeLocal('Auth');
        Utils.removeLocal('loginuser');
        Utils.removeLocal('token');
        this.$router.replace('/admin/login');
      }
    }
  },
  mounted: function(){
      this.loginuser = Utils.getLocal("loginuser")
  }
}
</script>
