import CodeResolve from '@/config/CodeResolve'
import CodeTemplate from '@/config/CodeTemplate'

export default class FileCodeUtil {
  static generator (config: any) {
    const tsCode = '`' + CodeResolve.JavaScript(config.properties, CodeTemplate.TypeScriptFile) +
      '\n\n' + CodeResolve.JavaScript(config.parameters, CodeTemplate.QueryParams) + '' +
      '\n\n' + CodeTemplate.ListModel + '' +
      '`'
    const vueCode = '`' + CodeResolve.Vue(config.properties, CodeTemplate.VueFile) + '`'
    let text = `
    const fs = require('fs')
    fs.mkdir('./${config.folderName}', err => {
      if (err) {
        return console.error(err)
      }
      // 植入ts代码
      fs.mkdirSync('./${config.folderName}/model')
      fs.writeFileSync('./${config.folderName}/model/index.ts', ${tsCode})
      fs.writeFileSync('./${config.folderName}/index.vue', ${vueCode})
    })
    `
    // 替换modelName listModelName
    text = text.replaceAll('$name:class:model', config.modelName)
    text = text.replaceAll('$name:class:listModel', config.listModelName)
    text = text.replaceAll('$name:class:paramsModel', config.paramsModelName)
    const str = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(str, 'code.js')
  }
}
