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
    const { header, props, footer } = CodeResolve.transformTemplate(val)
    const body = CodeResolve.transformPropToText({
      props,
      properties,
      callbackFn: (data, propertie) => {
        return data.replace(/\$a|\$b|\$c|\$d/g, (a, b) => {
          // @ts-ignore
          const typeValue = FinalValue.TYPE_TO_VALUE[propertie.type]
          // @ts-ignore
          const typeToDartType = FinalValue.TYPE_TO_DARTTYPE[propertie.type]
          return a.replace('$a', propertie.name)
            .replace('$b', propertie.description)
            .replace('$c', typeValue)
            .replace('$d', typeToDartType)
        })
      }
    })
    return header + body + footer
  }

  public static Vue = (properties: Propertie[], val: string) => {
    // 找到模板中需要渲染的参数
    const { header, props, footer } = CodeResolve.transformTemplate(val)
    const body = CodeResolve.transformPropToText({
      props,
      properties,
      callbackFn: (data, propertie) => {
        return data.replace(/\$prop|\$label/g, (a, b) => {
          return a.replace('$prop', propertie.name)
            .replace('$label', propertie.description)
        })
      }
    })
    return header + body + footer
  }

  private static transformPropToText (options: { properties: Propertie[], props: string, callbackFn: (data: string, propertie: Propertie) => string }): string {
    let resultCode = ''
    // 循环props内部的for语法
    const forStrList: MatchStr[] = CodeResolve.findForStrList(options.props)
    forStrList.forEach((matchStr: MatchStr) => {
      if (matchStr.type === 'for') {
        // 替换变量
        options.properties.forEach((propertie: Propertie) => {
          resultCode += options.callbackFn(matchStr.data, propertie)
        })
      } else {
        resultCode += matchStr.data
      }
    })
    return resultCode
  }

  private static transformTemplate (val: string): { header: string, props: string, footer: string } {
    const header = val.substring(0, val.indexOf(FinalValue.FOR_KEY))
    const props = val.substring(val.indexOf(FinalValue.FOR_KEY), val.lastIndexOf(FinalValue.FOR_KEY) + FinalValue.FOR_KEY.length)
    const footer = val.substring(val.lastIndexOf(FinalValue.FOR_KEY) + FinalValue.FOR_KEY.length, val.length)
    return {
      header,
      props,
      footer
    }
  }

  /**
   * 寻找所有for语句
   * @param targetText 目标文本
   * @private
   * @return string[] 已移除的结果数组
   */
  private static findForStrList (targetText: string): MatchStr[] {
    const forKeyLength = FinalValue.FOR_KEY.length
    const forKey = FinalValue.FOR_KEY
    const tempTargetText = targetText
    const resultArr: MatchStr[] = []
    let startIndex = -1
    const recursiveFunc = function (text: string) {
      const position = text.indexOf(forKey)
      if (position < 0) return
      // 还没有找到过for语句，当前是第一个
      if (startIndex === -1) {
        // 去掉第一个回车
        startIndex = 0
        // 有别的语句插在了两个for中间，需要做特殊处理，把这个特殊语句复制下来
        if (position !== 0) {
          resultArr.push({ type: 'string', data: text.substring(0, position) })
        }
      } else {
        resultArr.push({ type: 'for', data: text.substring(startIndex, position) })
        startIndex = -1
      }
      // 把第一个回车去掉
      recursiveFunc(text.substring(position + forKeyLength + 1))
    }
    recursiveFunc(tempTargetText)
    return resultArr
  }
}

interface MatchStr {
  type: 'for' | 'string',
  data: string
}
