import axios from 'axios'

export default class HttpUtil {
  public static async get (url: string) {
    const isProduction = process.env.NODE_ENV === 'production'
    const { data } = await this.service.get(`${isProduction ? '/swagger/query?url=' : ''}${url}`)
    return data
  }

  private static service = axios.create({
    timeout: 50000
  })
}
