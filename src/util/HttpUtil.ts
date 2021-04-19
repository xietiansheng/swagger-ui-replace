import axios from 'axios'

export default class HttpUtil {
  public static async get (url: string): Promise<any> {
    let rspData = ''
    await this.service.get('http://gatewaytest.dahanjsy.com/api/manage/ncc/transferRecord/retrySave/123', {
      headers: {
        Authorization: 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzU2Nzk4OTQ4NjM1OTM4ODE4Iiwibm9uY2UiOiJkYzQyOTE0Zi0yNjY2LTQzYmYtODJiNi0zODkwNGViMWJiNjQiLCJ0aW1lc3RhbXAiOjE2MTg1NjE4MjI3NzAsInVpZCI6IjEzNTY3OTg5NDg2MzU5Mzg4MTgiLCJ1bmFtZSI6IumVv-aymeiejeWuiTAwMSIsIm1vYmlsZSI6IjE1Mjc0OTg5MDgwIiwiZXhwIjoxNjE4NTY5MDIyfQ.V8H1jAagJhRuq6jdqsgyJZCYLEdebP2V4vyH2nj0cASCWbkb0jUtLToGKhSJWzRK8p9N-88iSTTgHo4mvClrINOUAVwpuWr8Mo0qJL7rYF2XV68O-xkMY_uWr5gNiJuOPwh7JxXHl5V4zEeBx8CjmMI9GrJ1OmQROfvvl_UOmWQ'
      }
    })
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
