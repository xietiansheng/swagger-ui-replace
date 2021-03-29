<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location" />
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu" />
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document" />
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting" />
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})

export default class MyMenu extends Vue {
  private isCollapse = false

  private handleClose () {

  }

  private handleOpen () {

  }
}
</script>

<style lang="stylus" scoped>

</style>
