export default class FinalValue {
  // 请求相关数据
  public static readonly API_URL = '/api/manage/v2/api-docs'
  public static readonly API_PROJECT_URL = '/swagger-resources'

  // 颜色
  public static readonly PRIMARY_COLOR = '#409EFF'

  // 缓存相关
  public static readonly APP_VERSION = 'app_version'
  public static readonly STORAGE_SERVICE_URL = 'service_value'
  public static readonly STORAGE_SERVICE_LIST = 'service_list'
  public static readonly STORAGE_PROJECT_URL = 'project_value'

  // 代码模板相关
  public static readonly FOR_KEY = '!!!for'
  public static readonly TYPE_TO_VALUE = {
    number: 0,
    integer: 0,
    string: '\'\'',
    boolean: false,
    array: '[]'
  }
}
