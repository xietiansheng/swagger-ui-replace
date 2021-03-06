// @ts-ignore
import { saveAs } from 'file-saver'

export class Util {
  /**
   * 解析用户输入的swagger地址
   * @param url
   */
  public static parseSwaggerUrl (url: string): string {
    if (!url) {
      return ''
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url
    }
    if (url.substring(url.length - 1) === '/') {
      url = url.substring(0, url.length - 1)
    }
    const position = url.indexOf('/swagger-ui.html')
    if (position !== -1) {
      return url.substring(0, position)
    }
    return url
  }

  /**
   * 转换名称
   * @param refName
   */
  public static transformRefName (refName: string): string {
    return refName.replace('#/definitions/', '')
  }

  /**
   * 复制内容到剪贴板
   */
  public static copyTextToSystem (text: string) {
    const input = document.createElement('textarea')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

  public static generatorFile (text: string, codeType: string) {
    const codeTypeToSuffix = {
      vue: 'vue',
      typescript: 'ts'
    }
    const str = new Blob([text], { type: 'text/plain;charset=utf-8' })
    // @ts-ignore
    saveAs(str, `code.${codeTypeToSuffix[codeType]}`)
  }

  public static setStorage (key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public static getStorage (key: string): string {
    return localStorage.getItem(key) || ''
  }
}
