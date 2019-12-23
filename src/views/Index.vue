<template>
  <el-container>
    <el-aside :width="sidebar.opened ? '200px' : '64px'">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          background-color="#304156"
          text-color="#bfcbd9"
          :default-active="activeMenu"
          active-text-color="#409EFF"
          :collapse="!sidebar.opened"
          :collapse-transition="false"
          unique-opened
          router
        >
          <el-menu-item index="/main">
            <i class="icon-home"></i>
            <span slot="title">控制台首页</span>
          </el-menu-item>
          <template v-for="(item, index) in menuList">
            <el-submenu :index="index" :key="item.id" v-if="item.children">
              <template slot="title">
                <i :class="item.icon?item.icon:'icon-menu'"></i>
                <span>{{ item.title }}</span>
              </template>

              <template v-for="(subItem) in item.children">
                <el-submenu
                  class="nest-menu"
                  :index="'/'+subItem.router"
                  :key="subItem.id"
                  v-if="subItem.children"
                >
                  <template slot="title">
                    <i :class="subItem.icon?subItem.icon:'icon-menu'"></i>
                    <span>{{ subItem.title }}</span>
                  </template>

                  <el-menu-item
                    v-for="(subSubItem) in subItem.children"
                    :index="'/'+subSubItem.router"
                    :key="subSubItem.id"
                  >
                    <i :class="subSubItem.icon?subSubItem.icon:'icon-file-text'"></i>
                    <span slot="title">{{ subSubItem.title }}</span>
                  </el-menu-item>
                </el-submenu>

                <el-menu-item :index="'/'+subItem.router" :key="subItem.id" v-else>
                  <i :class="subItem.icon?subItem.icon:'icon-file-text'"></i>
                  <span slot="title">{{ subItem.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>

            <el-menu-item :index="'/'+item.router" :key="item.id" v-else>
              <i :class="item.icon?item.icon:'icon-file-text'"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <nav-bar
        :is-active="!sidebar.opened"
        @toggleClick="toggleSideBar"
      ></nav-bar>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </section>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getIndexInfo } from '@/api/app'
import navBar from '@/components/navbar'
export default {
  components: {
    navBar
  },
  computed: {
    key () {
      return this.$route.path
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    ...mapGetters(['sidebar'])
  },
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.getIndexInfo()
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    getIndexInfo () {
      getIndexInfo().then(res => {
        this.menuList = res.data.menus
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body{
  background: #f8f8f8
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  background: #304156;
}

.el-menu {
  border-right: none;
}
.el-menu [class^="icon-"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
}

.nest-menu .el-submenu > .el-submenu__title,
.el-submenu .el-menu-item {
  background-color: #1f2d3d !important;
}
.el-main {
  background: #f8f8f8;
  padding: 0;
}
.app-main{
  padding:10px;
  font-size: 14px;
}
</style>
