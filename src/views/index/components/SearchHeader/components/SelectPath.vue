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
      @change="handlePathChange"
    />
    <div class="method" />
  </div>
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

  @Prop(Boolean) readonly crossDomain: boolean | undefined

  get apiDoc (): ApiDocs {
    return this.$store.state.apiDocs
  }

  handlePathChange (val: string) {
    const operationId = val[1]
    const filterPaths = this.apiDoc.paths.filter(item => item.operationId === operationId)
    this.handleProperties(filterPaths[0])
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
      if (!Array.isArray(path.properties) || !((path.properties as Propertie[])[0] instanceof Propertie)) {
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
