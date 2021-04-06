import Vue from 'vue'
import Vuex from 'vuex'
import { Path } from '@/entity/Path'
import { ApiDocs } from '@/entity/ApiDocs'
import HttpUtil from '@/util/HttpUtil'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiDocs: new ApiDocs(),
    curPath: new Path(),
    fullUrl: ''
  },
  mutations: {
    SET_CUR_PATH (state: any, curPath:Path) {
      state.curPath = curPath
    },
    SET_API_DOCS (state: any, apiDocs: ApiDocs) {
      state.apiDocs = apiDocs
    },
    SET_FULL_URL (state: any, url: ApiDocs) {
      state.fullUrl = url
    }
  },
  actions: {
    async queryApiDocs ({ commit }, url) {
      if (url) {
        commit('SET_FULL_URL', url)
      }
      const data = await HttpUtil.get(url || this.state.fullUrl)
      // 处理一下path数据，方便后期做处理
      const newPaths: Path[] = []
      for (const pathsKey in data.paths) {
        const path = data.paths[pathsKey]
        for (const pathKey in path) {
          const pathElement = path[pathKey]
          pathElement.method = pathKey
          pathElement.name = `${path[pathKey].summary} ${pathsKey}`
          pathElement.url = pathsKey
          newPaths.push(new Path(pathElement))
        }
      }
      data.paths = newPaths
      data.tags.forEach((item: any) => {
        item.children = data.paths.filter((path: Path) => path.tags.indexOf(item.name) !== -1)
      })
      // 提前组装好所有tags数据，方便用户进行搜索
      data.pathOptions = JSON.parse(JSON.stringify(data.tags))
      Object.assign(this, data)
      commit('SET_API_DOCS', data)
    }
  }

})
