<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    active-text-color="#ffd04b"
    @close="handleClose"
  >
    <div style="height: 100px;text-align: center;line-height: 100px">
      logo区域
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location" />
        <span slot="title">功能设置</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">Swagger地址配置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location" />
        <span slot="title">代码模板配置</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">JSON代码</el-menu-item>
        <el-menu-item index="2-2">生成文件配置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document" />
        <span slot="title">项目地址</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">Github</el-menu-item>
        <el-menu-item index="3-2">Gitee</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="4">
      <i class="el-icon-document" />
      <span slot="title">操作手册</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})

export default class MyMenu extends Vue {
  private isCollapse = false

  private handleClose () {

  }

  private handleOpen () {

  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  height: 100%
}
</style>
