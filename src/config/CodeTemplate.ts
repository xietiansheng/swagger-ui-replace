export default class CodeTemplate {
  public static Dart =
    'class Model extends BaseModel {\n' +
    '  !!!for\n' +
    '/// $b\n' +
    '  $d $a = $c;\n' +
    '  !!!for\n' +
    '\n' +
    '  @override\n' +
    '  setJson(Map<String, dynamic> json) {\n' +
    '!!!for\n' +
    '    $a = json[\'attachExtName\'] ?? this.$a;\n' +
    '!!!for\n' +
    '    super.setJson(json);\n' +
    '  }\n' +
    '\n' +
    '  @override\n' +
    '  Model fromJson(Map<String, dynamic> json) {\n' +
    '    return Model()..setJson(json);\n' +
    '  }\n' +
    '}'

  public static JavaScript =
    'const params = {' +
    '\n!!!for' +
    '\n  // $b' +
    '\n  $a: $c,' +
    '\n!!!for' +
    '\n}'

  public static TypeScript =
    'class Model extends BaseModel {' +
    '\n!!!for' +
    '\n  // $b' +
    '\n  $a = $c' +
    '\n!!!for' +
    '\n}'

  public static TypeScriptFile =
    'import { BaseModel, ListModel } from \'jsy-model\'' +
    '\nimport { ApiService } from \'@/api\'' +
    '\nexport class $name:class:model extends BaseModel {' +
    '\n!!!for' +
    '\n  // $b' +
    '\n  $a = $c' +
    '\n!!!for' +
    '\n  constructor (data = {}) {' +
    '\n    super()' +
    '\n    this.setData(data)' +
    '\n  }' +
    '\n}'

  public static QueryParams =
    'export class $name:class:paramsModel {' +
    '\n!!!for' +
    '\n  // $b' +
    '\n  $a = $c' +
    '\n!!!for' +
    '\n  }'

  public static ListModel =
    'export class $name:class:listModel extends ListModel<$name:class:paramsModel, $name:class:model> {' +
    '\ngetList (params: $name:class:paramsModel): Promise<any> {' +
    '\n  return Promise.resolve(undefined)' +
    '\n}' +
    '\n\nmodelClass = $name:class:model' +
    '\n}'

  public static VueFile = `<template>
  <div>
    <el-form inline>
      <el-form-item>
        <jsy-button-list
          :data="['search']"
          @search="queryData(1)"/>
      </el-form-item> 
    </el-form>
    <jsy-table
      :data="listModel"
      @page-change="queryData">
  !!!for     <el-table-column prop="$prop" label="$label" />
  !!!for
    </jsy-table>
  </div>
</template>

<script lang="ts">
import { $name:class:paramsModel, $name:class:listModel } from './model/index'
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',
  data() {
   return {
    listModel: new $name:class:listModel(),
    queryParams: new $name:class:paramsModel()
   }
  },
  methods: {
   queryData(pageNum?:number) {
     this.listModel.query({...this.queryParams,pageNum})
   },
  },
  created(){
    this.queryData(1)
  }
})
</script>

<style lang="stylus" scoped>

</style>
`

  public static Vue = `<template>
  <div>
    <jsy-table
      :data="[]">
  !!!for     <el-table-column prop="$prop" label="$label" />
  !!!for
    </jsy-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',
})
</script>

<style lang="stylus" scoped>

</style>
`
}
