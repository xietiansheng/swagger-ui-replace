import { Propertie } from '@/entity/Propertie'
import FinalValue from '@/util/FinalValue'

export default class CodeResolve {
  /**
   * JavaScript代码解析
   * @param properties
   * @param val
   * @constructor
   */
  public static JavaScript = (properties: Propertie[], val: string) => {
    let resultCode = ''
    const { header, props, footer } = CodeResolve.transformTemplate(val)
    // 替换变量
    properties.forEach((propertie: Propertie) => {
      resultCode += props.replace(/\$a|\$b|\$c/g, (a, b) => {
        // @ts-ignore
        const typeValue = FinalValue.TYPE_TO_VALUE[propertie.type]
        return a.replace('$a', propertie.name)
          .replace('$b', propertie.description)
          .replace('$c', typeValue)
      })
      resultCode = resultCode.trim()
    })
    return header + resultCode + footer
  }

  public static Vue = (properties: Propertie[], val: string) => {
    let resultCode = ''
    // 找到模板中需要渲染的参数
    const { header, props, footer } = CodeResolve.transformTemplate(val)
    // 替换变量
    properties.forEach((propertie: Propertie) => {
      resultCode += props.replace(/\$prop|\$label/g, (a, b) => {
        return a.replace('$prop', propertie.name)
          .replace('$label', propertie.description)
      })
    })
    return header + resultCode + footer
  }

  private static transformTemplate (val: string): { header: string, props: string, footer: string } {
    const header = val.substring(0, val.indexOf(FinalValue.FOR_KEY))
    const props = val.substring(val.indexOf(FinalValue.FOR_KEY) + FinalValue.FOR_KEY.length, val.lastIndexOf(FinalValue.FOR_KEY))
    const footer = val.substring(val.lastIndexOf(FinalValue.FOR_KEY) + FinalValue.FOR_KEY.length, val.length)
    return {
      header,
      props,
      footer
    }
  }
}
