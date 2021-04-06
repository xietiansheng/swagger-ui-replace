<template>
  <div class="cascader-block">
    <el-cascader
      v-model="pathId"
      :options="options"
      filterable
      style="width: 300px"
      placeholder="选择接口"
      :props="cascaderProps"
      popper-class="path-popper"
      :filter-method="filterMethod"
      @change="handlePathChange"
    >
      <template slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span
          v-if="data.method"
          :style="`margin-left: 10px;font-size:12px;font-weight:bold;color:${methodColorMap[data.method]}`"
        >
          {{ data.method.toUpperCase() }}
        </span>
      </template>
    </el-cascader>
    <div class="method" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ApiDocs, Tag } from '@/entity/ApiDocs'
import { Path } from '@/entity/Path'
import { Propertie } from '@/entity/Propertie'
import { Util } from '@/util'
import { Color } from '@/config/Color'

@Component
export default class SelectPath extends Vue {
  private pathId = ''

  @Prop(Array) readonly options: Tag[] | undefined
  @Prop(Boolean) readonly crossDomain: boolean | undefined

  private cascaderProps = {
    label: 'name',
    value: 'operationId'
  }

  private methodColorMap = Color.METHOD_COLOR_MAP

  get apiDoc (): ApiDocs {
    return this.$store.state.apiDocs
  }

  handlePathChange (val: string) {
    const operationId = val[1]
    const filterPaths = this.apiDoc.paths.filter(item => item.operationId === operationId)
    this.handleProperties(filterPaths[0])
  }

  filterMethod (node: any, keyword: string) {
    const { text } = node
    return text.toUpperCase().indexOf(keyword.toUpperCase()) !== -1
  }

  private handleProperties (path: Path) {
    // 处理请求参数
    if (path.parameters && path.parameters.length) {
      this.transformParameters(path)
    }
    this.transformProperties(path)
    this.$store.commit('SET_CUR_PATH', path)
  }

  transformParameters (path: Path) {
    if (path.parameters && path.parameters.length && !(path.parameters[0] instanceof Propertie)) {
      path.parameters = path.parameters.map(item => {
        return new Propertie({ ...item })
      })
    }
  }

  transformProperties (path: Path) {
    // @ts-ignore
    const refName = path.responses['200'] && path.responses['200'].schema && (path.responses['200'].schema.$ref || path.responses['200'].schema.items.$ref)
    if (refName) {
      const definition = this.apiDoc.definitions[Util.transformRefName(refName)]
      if (!path.properties.length) {
        for (const propertiesKey in definition.properties) {
          // @ts-ignore
          path.properties.push(new Propertie({ ...definition.properties[propertiesKey], name: propertiesKey }))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cascader-block {
  position: relative;
}
</style>
