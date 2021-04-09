<template>
  <el-card class="code-container">
    <header slot="header" class="flex align-center">
      <span class="flex-1 text-bold">返回参数列表</span>
      <el-button type="text" style="padding: 0" @click="handleGeneratorDialogOpen(curPath)">生成代码</el-button>
    </header>
    <div style="box-sizing: border-box;padding: 0 20px 10px 20px">
      <el-input
        v-model="filterText"
        placeholder="字段、注释搜索"
        prefix-icon="el-icon-search"
        clearable
      />
    </div>
    <section class="result-block">
      <el-tree
        ref="treeRef"
        :data="curPath.properties"
        node-key="name"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
      >
        <div slot-scope="{ node, data }" class="custom-tree-node">
          <div class="show">
            <p style="font-size: 12px;color: #888888">// {{ data.description }}</p>
            <p style="color: #880000;font-weight: bold;">
              {{ data.name }}
              <span style="font-size: 12px;color: #888888;user-select: none">({{ data.type }})</span>
            </p>
          </div>
          <el-button
            v-if="data.children && data.children.length"
            class="operation"
            type="text"
            @click="handleGeneratorDialogOpen(data.childDefinition)"
          >
            生成代码
          </el-button>
        </div>
      </el-tree>
    </section>
    <generator-code-dialog ref="codeDialogRef" />
  </el-card>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { Propertie } from '@/entity/Propertie'
import GeneratorCodeDialog from '@/components/GeneratorCodeDialog/index.vue'
import { Path } from '@/entity/Path'
import { ElTree } from 'element-ui/types/tree'
import { DialogComponent } from '@/base/BaseComponent'

@Component({
  components: {
    GeneratorCodeDialog
  }
})

export default class ResponseCode extends Vue {
  @Ref('treeRef') readonly treeRef!: ElTree<any, any>
  @Ref() readonly codeDialogRef!: DialogComponent
  private filterText = ''

  get curPath (): Path {
    return this.$store.state.curPath
  }

  @Watch('filterText')
  private filterTextWatch (val: string) {
    this.treeRef.filter(val)
  }

  filterNode (value: string, data: Propertie) {
    if (!value) return true
    // 字段key+字段名模糊搜索
    return data.name.toUpperCase().indexOf(value.toUpperCase()) !== -1 || data.description.toUpperCase().indexOf(value.toUpperCase()) !== -1
  }

  private handleGeneratorDialogOpen (path: Path) {
    console.log(this.codeDialogRef, '<---------->this.codeDialogRef')
    this.codeDialogRef.open({ data: path.properties })
  }
}
</script>

<style lang="scss" scoped>
.code-container {
  display: flex;
  flex-direction: column;

  /deep/ .el-card__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
  }

  .result-block {
    overflow: auto;

    /deep/ .el-tree {
      height: 100%;
      overflow: auto;

      .el-tree-node__expand-icon {
        font-size: 20px;
      }

      .el-tree-node__content {
        height: auto;
      }

      .custom-tree-node {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        width: 100%;
        padding: 0 8px;
        height: 40px;
        box-sizing: border-box;

        .show {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-family: monospace;
        }

        .operation {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
