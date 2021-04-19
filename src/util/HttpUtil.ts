import axios from 'axios'

export default class HttpUtil {
  public static async get (url: string): Promise<any> {
    let rspData = ''
    try {
      const res = await this.service.get(url)
      rspData = res.data
    } catch (e) {
      // 可能出现跨域跨域，使用node服务中转请求
      try {
        const res = await this.service.get('/swagger/query?url=' + url)
        rspData = res.data
      } catch (e) {
        throw new Error(e)
      }
    }
    return rspData
  }

  private static service = axios.create({
    timeout: 10000
  })
}
