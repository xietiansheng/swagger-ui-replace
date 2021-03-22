interface Service {
  label: string,
  value: string
}

/**
 * swagger接口地址批量配置
 * 示例：{ label:'测试环境',value:'https://xietiansheng.cn' }
 * 注意：这里不需要后缀，直接填写swagger域名即可
 */
export const serviceList: Service[] = [
  { label: '测试环境', value: 'http://test.cn' },
  { label: '预生产环境', value: 'http://pre.cn' }
]
