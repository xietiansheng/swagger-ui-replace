<template>
  <el-card>
    <el-form inline label-width="60px">
      <el-form-item label="后端环境" label-width="90px">
        <el-select
          v-model="queryParams.serviceUrl"
          placeholder="请选择"
          @change="handleServiceChange"
        >
          <el-option
            v-for="item in serviceList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目">
        <el-select
          v-model="queryParams.projectUrl"
          placeholder="请选择"
          filterable
          @change="handleProjectChange"
        >
          <el-option
            v-for="(item,index) in projectList"
            :key="index"
            :label="item.name"
            :value="item.url"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接口地址" label-width="80px">
        <select-path ref="selectPathRef" :options="pathOptions" />
      </el-form-item>
      <el-form-item>
        <!--<el-button type="primary" @click="()=>{$refs.generatorCodeFileRef.open()}" v-text="'生成代码'" />-->
        <el-button style="margin-left: 10px" type="primary" @click="handleRefreshClick">刷新</el-button>
        <el-button type="primary" @click="handleOpenSwagger">
          <i class="el-icon-position" />
          打开Swagger
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 生成代码文件弹窗 -->
    <generator-code-file-dialog ref="generatorCodeFileRef" />
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiDocs, Tag } from '@/entity/ApiDocs'
import FinalValue from '@/util/FinalValue'
import HttpUtil from '@/util/HttpUtil'
import { Project } from '@/views/index/components/SearchHeader/entity/Project'
import GeneratorCodeFileDialog from '@/components/GeneratorCodeFileDialog/index.vue'
import SelectPath from '@/views/index/components/SearchHeader/components/SelectPath.vue'
import { Util } from '@/util'
import { serviceList } from '@/config/Services'

@Component({
  components: {
    GeneratorCodeFileDialog,
    SelectPath
  }
})
export default class SearchHeader extends Vue {
  // 请求参数
  private queryParams: { serviceUrl: string, projectUrl: string, pathId: string } = {
    serviceUrl: '',
    projectUrl: '',
    pathId: ''
  }

  // 服务器数据
  private serviceList = serviceList
  // 项目数据
  projectList: Project[] = []
  // 接口数据
  pathOptions: Tag[] = []

  async mounted () {
    // 从缓存中读取数据
    const serviceUrl = Util.getStorage(FinalValue.STORAGE_SERVICE_URL)
    if (serviceUrl) {
      this.queryParams.serviceUrl = serviceUrl
      await this.handleServiceChange()
    }
    const projectUrl = Util.getStorage(FinalValue.STORAGE_PROJECT_URL)
    if (projectUrl) {
      this.queryParams.projectUrl = projectUrl
      await this.handleProjectChange()
    }
  }

  async handleServiceChange () {
    this.projectList = await HttpUtil.get(this.queryParams.serviceUrl + FinalValue.API_PROJECT_URL)
    Util.setStorage(FinalValue.STORAGE_SERVICE_URL, this.queryParams.serviceUrl)
    ApiDocs.getInstance().tags = []
    this.pathOptions = []
  }

  async handleProjectChange () {
    const fullUrl = this.queryParams.serviceUrl + this.queryParams.projectUrl
    await ApiDocs.getInstance().query(fullUrl)
    this.pathOptions = ApiDocs.getInstance().tags
    Util.setStorage(FinalValue.STORAGE_PROJECT_URL, this.queryParams.projectUrl)
  }

  handleRefreshClick () {
    ApiDocs.getInstance().refresh()
  }

  handleOpenSwagger () {
    if (!this.queryParams.serviceUrl) {
      this.$message.warning('请选择后端环境！')
      return
    }
    const project = this.projectList.filter(project => project.url === this.queryParams.projectUrl)[0]
    const link = this.queryParams.serviceUrl
    const projectLink = project ? `/swagger-ui.html?urls.primaryName=${project.name}` : ''
    window.open(link + projectLink)
  }
}
</script>

<style lang="scss">
</style>
