<template>
  <section>
    <el-dialog
      title="代码生成"
      width="1100px"
      style="min-height: 400px"
      :visible.sync="visible"
    >
      <div class="dialog-container">
        <template-config @change="handleTemplateChange" />
        <result-code style="margin-left: 10px" :data="resultCodeText" :language="language" />
      </div>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import ResultCode from '@/components/GeneratorCodeDialog/components/ResultCode.vue'
import TemplateConfig, { CodeType } from '@/components/GeneratorCodeDialog/components/TemplateConfig.vue'
import { Propertie } from '@/entity/Propertie'
import { DialogComponent } from '@/base/BaseComponent'

@Component({
  components: {
    ResultCode,
    TemplateConfig
  }
})
export default class GeneratorCodeDialog extends DialogComponent {
  // 生成结果代码预览
  private resultCodeText = ''
  // 代码模板
  private templateText = ''
  // 代码解析函数
  private templateResolve: Function = () => {}

  // 代码语言
  private language = ''

  private data: Propertie[] = []

  private handleTemplateChange (codeType: CodeType) {
    this.templateText = codeType.template
    this.templateResolve = codeType.resolve
    this.language = codeType.label
    this.resultCodeText = this.templateResolve(this.data, this.templateText)
  }

  open (options: { data: Propertie[] }) {
    this.data = options.data
    this.resultCodeText = this.templateResolve(this.data, this.templateText)
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;

  .el-card:first-child {
    flex: 2;
  }

  .el-card:last-child {
    flex: 3;
  }

}
</style>
