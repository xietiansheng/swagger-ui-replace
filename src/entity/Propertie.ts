import { ApiDocs } from '@/entity/ApiDocs'
import { Path } from '@/entity/Path'
import { Util } from '@/util'

export class Propertie {
  name = ''
  type = ''
  format = ''
  description = ''
  required = false
  level = ''
  $ref = ''
  items: { format: string, type: string, $ref: string } | undefined
  children: Propertie[] = []
  childDefinition: Path | undefined
  schema: { $ref: '' } | undefined

  constructor (props?: any) {
    Object.assign(this, props)
    let refName = props.$ref || (props.items && props.items.$ref) || (props.schema && (props.schema.$ref || props.schema.items.$ref))
    // 如果当前这个属性是个链接，则直接查找子级类数据
    if (refName) {
      refName = Util.transformRefName(refName)
      const definition = ApiDocs.getInstance().definitions[refName]
      if (definition.properties && !Array.isArray(definition.properties)) {
        const properties: Propertie[] = []
        for (const propKey in definition.properties) {
          // @ts-ignore
          const propertie = definition.properties[propKey]
          // 将所有自己数据转为参数对象，向下递归所有数据
          properties.push(new Propertie({
            ...propertie,
            name: propKey
          }))
        }
        definition.properties = properties
      }
      this.childDefinition = new Path({ ...definition })
      this.children = (definition.properties as Propertie[])
    }
  }
}
