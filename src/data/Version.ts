import { Util } from '@/util'
import FinalValue from '@/util/FinalValue'
// @ts-ignore
import config from '../../package.json'

export interface VersionHistory {
  version: string,
  func: { id: string, message: string }[],
  issue: { id: string, message: string }[],
  timestamp: string
}

export class Version {
  public static getVersion (): string {
    return config.version
  }

  public static getOldVersion (): string {
    return Util.getStorage(FinalValue.APP_VERSION)
  }

  public static readonly history: VersionHistory[] = [
    {
      version: '2.1.5',
      issue: [],
      func: [
        { id: '215f1', message: '字符串默认值由单引号改为双引号（后期增加默认值配置项）' }
      ],
      timestamp: '2021/05/21'
    },
    {
      version: '2.1.4',
      issue: [],
      func: [
        { id: '214f1', message: '接口选择框增加清空操作' }
      ],
      timestamp: '2021/04/08'
    },
    {
      version: '2.1.3',
      issue: [
        { id: '213i1', message: '修复部分接口返回参数数据错误问题。' }
      ],
      func: [
        { id: '213f1', message: '接口搜索支持路径大小写模糊搜索' },
        { id: '213f2', message: '优化接口选择时请求方式的显示样式' }
      ],
      timestamp: '2021/04/06'
    },
    {
      version: '2.1.2',
      issue: [
        { id: '212i1', message: '修复部分接口生成参数错误问题。' }
      ],
      func: [
        { id: '212f1', message: '新增Gitee跳转（源码+文档）。' },
        { id: '212f2', message: '新增<复制请求路径>按钮，支持一键复制请求路径。' },
        { id: '212f3', message: '新增请求方式显示' }
      ],
      timestamp: '2021/04/02'
    },
    {
      version: '2.1.1',
      issue: [
        { id: '211i1', message: '修复部分接口无法正常生成代码问题。' },
        { id: '211i2', message: '修复部分swagger地址无法正常解析问题。' }
      ],
      func: [
        { id: '211f1', message: '增加更多功能按钮，用户可配置存储多个服务器地址。' },
        { id: '211f2', message: '增加版本更新日志提示。' }
      ],
      timestamp: '2021/03/30'
    },
    {
      version: '2.1.0',
      issue: [],
      func: [
        { id: '210f1', message: '自动保存用户输入的模板，下次使用生成代码直接使用上次的模板。' },
        { id: '210f2', message: '自动保存用户输入的Swagger地址。' },
        { id: '210f3', message: '优化接口选择器样式。' }
      ],
      timestamp: '2021/03/25'
    },
    {
      version: '2.0.0',
      issue: [],
      func: [
        { id: '200f1', message: '全新Swagger替代工具2.0版本发布！' }
      ],
      timestamp: '2021/03/20'
    }
  ]
}
