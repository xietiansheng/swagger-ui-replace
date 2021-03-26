import axios from 'axios'

export default class HttpUtil {
  public static async get (url: string) {
    const { data } = await this.service.get('/swagger/query?url=' + url)
    return data
  }

  private static service = axios.create({
    timeout: 50000
  })
}
