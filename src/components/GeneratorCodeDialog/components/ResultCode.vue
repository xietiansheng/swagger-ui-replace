<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>结果预览</span>
      <div style="float: right; padding: 3px 0">
        <el-button type="text" @click="handleCopyCodeClick">复制代码</el-button>
      </div>
    </div>
    <div style="overflow:auto;height: 400px" v-html="markedText" />
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Marked from '@/util/Marked'
import { Util } from '@/util'

@Component
export default class ResultCode extends Vue {
  @Prop(String) readonly data: any
  @Prop(String) readonly language: any
  private markedText = ''

  @Watch('data')
  private dataWatch () {
    this.markedText = Marked.marked(this.data, this.language)
  }

  created () {
    this.markedText = Marked.marked(this.data, this.language)
  }

  private handleCopyCodeClick () {
    Util.copyTextToSystem(this.data)
    this.$message.success('复制成功！')
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../node_modules/highlight.js/styles/default.css";
</style>
