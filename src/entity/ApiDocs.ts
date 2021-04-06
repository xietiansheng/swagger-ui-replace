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
  // 这个只用来选择路径，防止污染源数据导致级联选择器报错
  pathOptions: Tag[] = []
}
