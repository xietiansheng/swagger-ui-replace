# Swagger前端替换工具

- 在线地址：[http://xietiansheng.cn/swagger-replace-tools](http://xietiansheng.cn/swagger-replace-tools)
- Gitee：[https://gitee.com/XieTS/swagger-replace-tools](https://gitee.com/XieTS/swagger-replace-tools)

### 开发背景

*原生Swagger页面对于前端开发者来说并不是很友好，页面交互能力主要存在如下问题：*

1. 后端修改了某个接口，前端需要先找对该接口对应的controller层，接着在该controller下挨个查找，耗时耗力.
2. 请求参数请求结果众多字段复制粘贴，大量重复操作.
3. 新的页面开发，大量代码反复书写，劳心费力.


### 功能汇总

1. 接口搜索：支持当前项目下所有接口一键搜索.
2. 参数预览：请求参数，返回参数类型注释预览.
3. 代码生成：目前支持请求，返回参数一键生成JavaScript、TypeScript、Vue代码生成.
4. 代码模板：支持代码模板高度可配置，满足所有代码生成需求.
5. 代码文件生成（内测中）：支持一键生成文件代码，完美解决新项目重复书写代码问题.

### 使用环境

> 线上项目能够覆盖绝大多数使用场景，解析完Swagger地址之后会优先使用本地请求去请求swagger内容，在本地请求跨域的情况下（例如公网测试环境swagger跨域）则会使用node服务器代理当前请求来解决跨域问题，以下是两种情况的使用方式：

 * 本地使用：
```
    1. npm run install
    2. 配置 vue.config.js proxy的target代理地址解决跨域问题 
    3. npm run serve
```
    
 - 线上使用：
    - [http://xietiansheng.cn/swagger-replace-tools](http://xietiansheng.cn/swagger-replace-tools)

### 操作手册

- 项目选择，参数预览

   - 输入任意swagger地址（域名 + 端口），可以打开任意swagger页面量复制地址，系统会自动解析出标准的swagger地址。
   - 选择对应的项目。
   - 选择对应的接口，支持搜索。
   - 选择需要生成的层级代码点击生成代码按钮。
   
       *系统会将所有选择缓存至本地，下次打开自动读取*
   
   
- 代码模板配置
  
  - 找到对应的参数层级，点击生成代码。
  - 配置左侧代码模板，模板语法如下：
    - $a：属性key
    - $b：属性注释
    - $c：属性默认值
    - !!!for：循环语句，$a,$b,$c需要包裹在!!!for中才会生效
    - 所有模板配置系统会自动缓存到本地
    
#### 模板语法示例

```javascript

// 后端接口请求参数
  key    -  注释    - 值 
skuName  - 商品名称 - T恤
skuCode  - 商品码   - SKU20210331 
skuPrice - 商品价格 - 200 

// 代码模板配置
const data = {
!!!for
  // $b
  $a = $c
!!!for

  // 这里输入任意代码，都会被复制到结果当中
  constructor(){
    super()
  }
}

// 替换结果
const params = {
  // 商品名称
  skuName: '',
  // 商品码
  skuCode: '',
  // 商品价格
  skuPrice: '',

  // 这里输入任意代码，都会被复制到结果当中
  constructor (data = {}) {
    super()
    this.setData(data)
  }
}
```
