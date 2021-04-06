<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>代码模板配置</span>
      <div style="float: right; padding: 3px 0">
        <el-dropdown @command="handleCommandClick">
          <span class="el-dropdown-link">
            {{ curCodeTypeObj.label }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in codeTypeList"
              :key="item.label"
              :command="item"
              v-text="item.label"
            />
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-input
        v-model="curCodeTypeObj.template"
        type="textarea"
        :autosize="{ minRows: 15, maxRows: 20}"
        @change="handleTemplateCodeChange"
      />
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Emit, Vue, Watch } from 'vue-property-decorator'
import CodeTemplate from '@/config/CodeTemplate'
import CodeResolve from '@/config/CodeResolve'
import { Util } from '@/util'

export interface CodeType {
  label: string,
  template: string,
  resolve: Function
}

@Component
export default class TemplateConfig extends Vue {
  // 代码类型与对应模板
  private codeTypeList: CodeType[] = [
    { label: 'JavaScript', template: CodeTemplate.JavaScript, resolve: CodeResolve.JavaScript },
    { label: 'TypeScript', template: CodeTemplate.TypeScript, resolve: CodeResolve.JavaScript },
    { label: 'Vue', template: CodeTemplate.Vue, resolve: CodeResolve.Vue }
  ]

  // 当前代码类型
  private curCodeTypeObj: CodeType = this.codeTypeList[0]

  created () {
    this.templateCodeInit()
    this.sendChangeEmit()
  }

  private handleCommandClick (codeType: CodeType) {
    this.curCodeTypeObj = codeType
    this.templateCodeInit()
    this.sendChangeEmit()
  }

  @Emit('change')
  private sendChangeEmit (): CodeType {
    return this.curCodeTypeObj
  }

  @Watch('curCodeTypeObj.template')
  private handleTemplateInputChange () {
    this.sendChangeEmit()
  }

  handleTemplateCodeChange (val: string) {
    Util.setStorage(this.curCodeTypeObj.label, val)
  }

  private templateCodeInit () {
    const storage = Util.getStorage(this.curCodeTypeObj.label)
    if (storage) {
      this.curCodeTypeObj.template = storage
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
