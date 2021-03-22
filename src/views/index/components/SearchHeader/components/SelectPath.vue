<template>
  <el-cascader
    v-model="pathId"
    :options="options"
    filterable
    style="width: 300px"
    placeholder="选择接口"
    :props="cascaderProps"
    @change="handlePathChange"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ApiDocs, Tag } from '@/entity/ApiDocs'
import { Path } from '@/entity/Path'
import { Propertie } from '@/entity/Propertie'
import { Util } from '@/util'

@Component
export default class SelectPath extends Vue {
  private cascaderProps = {
    label: 'name',
    value: 'operationId'
  }

  private pathId = ''
  @Prop(Array) readonly options: Tag[] | undefined

  handlePathChange (val: string) {
    const operationId = val[1]
    const filterPaths = ApiDocs.getInstance().paths.filter(item => item.operationId === operationId)
    this.handleProperties(filterPaths[0])
  }

  private handleProperties (path: Path) {
    // 处理请求参数
    if (path.parameters && path.parameters.length) {
      this.transformParameters(path.parameters)
    }
    this.transformProperties(path)
    ApiDocs.setCurPathId(path)
  }

  transformProperties (path: Path) {
    // @ts-ignore
    const refName = path.responses['200'] && path.responses['200'].schema && (path.responses['200'].schema.$ref || path.responses['200'].schema.items.$ref)
    if (refName) {
      const definition = ApiDocs.getInstance().definitions[Util.transformRefName(refName)]
      for (const propertiesKey in definition.properties) {
        // @ts-ignore
        path.properties.push(new Propertie({ ...definition.properties[propertiesKey], name: propertiesKey }))
      }
    }
  }

  transformParameters (parameters: Propertie[]) {
    parameters.forEach(item => {
      // @ts-ignore
      const refName = item.schema && (item.schema.$ref || item.schema.items.$ref)
      if (refName) {
        const { properties } = ApiDocs.getInstance().definitions[Util.transformRefName(refName)]
        item.children = []
        for (const propertiesKey in properties) {
          // @ts-ignore
          item.children.push(new Propertie({ ...properties[propertiesKey], name: propertiesKey }))
        }
      }
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
