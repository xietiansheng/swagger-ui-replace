<template>
  <el-card>
    <el-form inline label-width="60px">
      <el-form-item label="swagger地址" label-width="120px" :error="swaggerInputMsg">
        <el-select
          v-model="queryParams.serviceUrl"
          placeholder="请输入"
          style="width: 280px"
          filterable
          allow-create
          default-first-option
          @change="handleServiceChange"
          @keyup.enter.native="handleServiceChange"
        />
      </el-form-item>
      <el-form-item label="项目" label-width="50px">
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
            :value="item.url || item.location"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接口" label-width="60px">
        <select-path ref="selectPathRef" :options="pathOptions" />
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 10px" type="primary" @click="handleRefreshClick">刷新</el-button>
        <el-button type="primary" @click="handleOpenSwagger">
          <i class="el-icon-position" />
          打开Swagger
        </el-button>
        <el-button type="primary" icon="el-icon-setting">
        <!--        <el-button type="primary" @click="()=>{$refs.generatorCodeFileXRef.open()}" v-text="'生成文件'" />-->
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

  // 项目数据
  projectList: Project[] = []
  // 接口数据
  pathOptions: Tag[] = []
  // 当前controller层
  private tagName = ''
  // swagger输入框
  private swaggerInputMsg = '请输入任意swagger地址，系统将自动解析'

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
    // 监听path改动，用于swagger页面跳转定位
    ApiDocs.addPathDataChangeListener(path => {
      // @ts-ignore
      this.tagName = path.tags[0]
    })
  }

  async handleServiceChange () {
    this.projectList = []
    this.swaggerInputMsg = ''
    this.pathOptions = []
    this.queryParams.serviceUrl = Util.parseHttpUrl(this.queryParams.serviceUrl)
    // 清除上一次保存的项目
    if (this.queryParams.projectUrl) {
      this.queryParams.projectUrl = ''
    }
    this.projectList = await HttpUtil.get(this.queryParams.serviceUrl + FinalValue.API_PROJECT_URL)
    Util.setStorage(FinalValue.STORAGE_SERVICE_URL, this.queryParams.serviceUrl)
  }

  async handleProjectChange () {
    const fullUrl = this.queryParams.serviceUrl + this.queryParams.projectUrl
    await ApiDocs.getInstance().query(fullUrl)
    this.pathOptions = ApiDocs.getInstance().pathOptions
    Util.setStorage(FinalValue.STORAGE_PROJECT_URL, this.queryParams.projectUrl)
  }

  handleRefreshClick () {
    ApiDocs.getInstance().refresh()
    this.$message.success({
      showClose: true,
      message: '刷新成功',
      duration: 800
    })
  }

  handleOpenSwagger () {
    if (!this.queryParams.serviceUrl) {
      this.$message.warning('请输入swagger地址！')
      return
    }
    const project = this.projectList.filter(project => project.url === this.queryParams.projectUrl)[0]
    const link = this.queryParams.serviceUrl
    const projectLink = project ? `?urls.primaryName=${project.name}#/${this.tagName}` : ''
    window.open(`${link}/swagger-ui.html${projectLink}`)
  }
}
</script>

<style lang="scss">
</style>
