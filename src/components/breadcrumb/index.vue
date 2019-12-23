<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in list" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      list: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isMain(first)) {
        matched = [{ path: '/', meta: { title: '控制台首页' } }].concat(matched)
      }

      this.list = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      console.log(this.list)
    },
    isMain (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase()
    }
  }
}
</script>

<style>

</style>
