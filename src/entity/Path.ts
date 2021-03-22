import { Propertie } from '@/entity/Propertie'
import { Tag } from '@/entity/ApiDocs'

export class Path {
  consumes: string[] = []
  operationId: string = ''
  responses: {} = {}
  parameters: Propertie[] = []
  properties: Propertie[] = []
  summary: string = ''
  tags: Tag[] = []
  method: string = ''
  url: string = ''

  constructor (props?: {}) {
    Object.assign(this, props)
  }
}
