<template>
  <div class="container flex-jsb" :style="{width:isActive ? 'calc(100% - 64px)':'calc(100% - 200px)'}">
    <div class="flex flex-ac">
      <i
        :class="{ 'is-active': isActive }"
        class="icon-indent-dec hamburger"
        @click="toggleClick"
      ></i>
      <breadcrumb class="breadcrumb-container" />
    </div>

    <div class="flex flex-ac">
      <el-dropdown class="admin-container" trigger="click">
        <div class="avatar-wrapper">
          {{ username }}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/admin/pass">
            <el-dropdown-item>
              <i class="el-icon-lock"> 修改密码</i>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <i class="el-icon-switch-button" @click="logout"> 安全退出</i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/breadcrumb'
export default {
  components: {
    Breadcrumb
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    },
    logout () {
      MessageBox.confirm('您确定退出吗？', '提示信息', {
        type: 'warning',
        showClose: false
      })
        .then(async () => {
          await this.$store.dispatch('admin/logout')
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 50px;
  background: #fff;
  position: fixed;
  box-shadow: 0 1px 4px rgba(0, 21, 48, 0.08);
  padding: 0 20px;
  transition: width .28s;
  top: 0;
}
.hamburger {
  font-size: 20px;
  cursor: pointer;
  margin-right: 30px;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
