/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.Proxy.XXX生成链接，返回promise
 *      注：若需要参数，this.Proxy.XXX（params）
 */

// import httpAfterHandler from '@/common/js/afterHandler/HttpAfterHandler' // 这里引入http请求后的处理器，没有可以不引入
// import httpPreHandler from '@/common/js/preHandler/HttpPreHandler' // 这里引入http请求前的处理器，没有可以不引入

export default {
  useHttp: true,// 是否开启http
  useHttpZip: false,// 是否开启http压缩
  /**
   * name:请求标识
   * data:请求数据
   *  url:路径
   *  method:请求方式
   *  。。。
   * 注：其他fetch可以传入的参数，也在data里面传入
   */
  // httpPreHandler,
  // httpAfterHandler,
  login: [
    {name: 'login', data: {url: '/login', method: 'post'}, action: 'Login', actionBack: 'Loginr'}, // 登录
    {name: 'logout', data: {url: '/login', method: 'post'}, action: 'Logout', actionBack: 'Logoutr'}, // 登录
    {name: 'getImgCode', data: {url: '/code', method: 'post'}, action: 'GetPicCode', actionBack: 'GetPicCoder'}, // 获取图像验证码
    {name: 'getPhoneCode', data: {url: '/code', method: 'post'}, action: 'GetPhoneCode', actionBack: 'GetPhoneCoder'}, // 获取手机验证码
  ],
  article: [
    {name: 'getArticleList', data: {url: '/home', method: 'post'}, action: 'GetArcicleList', actionBack: 'GetArcicler'}, // 获取文章列表

  ],
  news: [
    {name: 'getNewsList', data: {url: 'newsflash', method: 'post'}, action: 'GetNewsFlashList', actionBack: 'GetNewsFlashList'}, //获取快讯列表
  ]

}
