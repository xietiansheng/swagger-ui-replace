<template>
  <el-dialog
    title="配置代码文件参数"
    width="400px"
    style="min-height: 400px"
    :visible.sync="visible"
    :close-on-click-modal="false"
  >
    <div class="dialog-container">
      <el-form inline label-width="120px">
        <el-form-item label="文件夹名称">
          <el-input v-model="formData.folderName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="实体类名">
          <el-input v-model="formData.modelName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="数组实体类名">
          <el-input v-model="formData.listModelName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="参数实体类名">
          <el-input v-model="formData.paramsModelName" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div class="flex align-center justify-center" style="margin-top: 20px">
        <el-button style="width: 120px" type="info" @click="visible = false" v-text="'取消'" />
        <el-button
          style="width: 120px"
          type="primary"
          @click="handleGeneratorClick"
          v-text="'生成'"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import FileCodeUtil from '@/components/GeneratorCodeFileDialog/util/FileCodeUtil'
import { Path } from '@/entity/Path'
import { DialogComponent } from '@/base/BaseComponent'

export default class GeneratorCodeFileDialog extends DialogComponent {
  private formData = {
    folderName: 'my-view',
    modelName: 'MyModelName',
    listModelName: 'MyListModel',
    paramsModelName: 'MyQueryParams'
  }

  get curPath (): Path {
    return this.$store.state.curPath
  }

  private handleGeneratorClick () {
    // 组装所有数据
    FileCodeUtil.generator({ ...this.curPath, ...this.formData })
    this.close()
  }
}
</script>

<style lang="scss" scoped>
</style>
