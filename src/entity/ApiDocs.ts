import HttpUtil from '@/util/HttpUtil'
import { Propertie } from '@/entity/Propertie'
import { Path } from '@/entity/Path'

export const METHOD_TYPE = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace'
]

// 接口切换监听回调（观察者模式）
type PathChangeCallback = (path: Path) => void

export class Definition {
  properties: Propertie[] | object = []
  title = ''
  type = ''
}

export class Tag {
  name: string = ''
  description = ''
  children: Path[] = []
}

/**
* 单例设计，数据缓存，事件派发
* @author xietiansheng
*/
export class ApiDocs {
  fullUrl = ''
  basePath = ''
  definitions: { [key: string]: Definition } = {}
  host = ''
  info: object = {}
  paths: Path[] = []
  securityDefinitions: object = {}
  tags: Tag[] = []
  private static _instance: ApiDocs = new ApiDocs()

  // eslint-disable-next-line no-useless-constructor
  private constructor () {
  }

  async query (url: string) {
    this.fullUrl = url
    const data = await HttpUtil.get(url)
    // 处理一下path数据，方便后期做处理
    const newPaths: Path[] = []
    for (const pathsKey in data.paths) {
      const path = data.paths[pathsKey]
      for (const pathKey in path) {
        const pathElement = path[pathKey]
        pathElement.method = pathKey
        pathElement.name = `${path[pathKey].summary} ${pathsKey} / ${pathKey.toUpperCase()}`
        pathElement.url = pathsKey
        newPaths.push(new Path(pathElement))
      }
    }
    data.paths = newPaths
    // 提前组装好所有tags数据，方便用户进行搜索
    data.tags.forEach((item: any) => {
      item.children = data.paths.filter((path: Path) => path.tags.indexOf(item.name) !== -1)
    })
    Object.assign(this, data)
  }

  async refresh () {
    await this.query(this.fullUrl)
    return this
  }

  static getInstance (): ApiDocs {
    if (!this._instance) {
      this._instance = new ApiDocs()
    }
    return this._instance
  }

  private pathIdChangeCallback: PathChangeCallback[] = []

  static addPathDataChangeListener (callback: PathChangeCallback) {
    this._instance.pathIdChangeCallback.push(callback)
  }

  static setCurPathId (path: Path) {
    this._instance.pathIdChangeCallback.forEach(callback => {
      callback(path)
    })
  }
}
