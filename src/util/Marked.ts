import marked from 'marked'
import highlight from 'highlight.js'

export default class Marked {
  public static _initFlag = false
  public static marked (markedCode: string, language:string): string {
    if (!this._initFlag) { this.init() }
    const resultCode =
      '```' + language +
      `\n${markedCode}\n` +
      '```'
    return marked(resultCode, { sanitize: true })
  }

  static init () {
    marked.setOptions({
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      highlight (code, lang) {
        if (lang && highlight.getLanguage(lang)) {
          return highlight.highlight(lang, code, true).value
        } else {
          return highlight.highlightAuto(code).value
        }
      }
    })
  }
}
