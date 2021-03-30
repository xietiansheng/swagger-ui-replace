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
