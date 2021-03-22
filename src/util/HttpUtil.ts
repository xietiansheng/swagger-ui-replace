import axios from 'axios'

export default class HttpUtil {
  public static async get (url: string) {
    const { data } = await this.service.get(url)
    return data
  }

  private static service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 2000
  })
}
