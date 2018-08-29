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
    {name: 'login', data: {url: '/api/v1/user/', method: 'post'}, action: 'uli', actionBack: 'ulir'}, // 登录
    {name: 'logout', data: {url: '/api/v1/user/', method: 'post'}, action: 'ulo', actionBack: 'ulor'}, // 登出
    {name: 'getCode', data: {url: '/api/v1/user/', method: 'post'}, action: 'uac', actionBack: 'uacr'}, // 获取验证码
  ],
  article: [
    {name: 'getArticleList', data: {url: '/api/v1/home/', method: 'post'}, action: 'hgl', actionBack: 'hgrlr'}, // 获取首页文章列表
    {name: 'getArticleDetail', data: {url: '/api/v1/home/', method: 'post'}, action: 'hgr', actionBack: 'hgrr'}, // 获取首页文章列表
    {name: 'getSearchArticleList', data: {url: '/api/v1/search/', method: 'post'}, action: 'sgr', actionBack: 'sgrr'}, // 获取文章搜索列表
  ],
  news: [
    {name: 'getNewsList', data: {url: '/api/v1/newsflash/', method: 'post'}, action: 'ngl', actionBack: 'nglr'}, //获取快讯列表
    {name: 'getNewsDetail', data: {url: '/api/v1/newsflash/', method: 'post'}, action: 'ngi', actionBack: 'ngir'}, //获取快讯详情
    {name: 'getSearchNewsList', data: {url: '/api/v1/search/', method: 'post'}, action: 'sgr', actionBack: 'sgrr'}, // 获取快讯搜索列表
    {name: 'voteNews', data: {url: '', method: 'post'}, action: '', actionBack: ''}, //利好利空
  ],
  project: [
    {name: 'getProjectList', data: {url: '/api/v1/project/', method: 'post'}, action: 'pgl', actionBack: 'pglr'}, // 获取项目列表
    {name: 'getProjectDetail', data: {url: '/api/v1/project/', method: 'post'}, action: 'pgi', actionBack: 'pgir'}, // 获取项目详情
  ],
  home: [
    {name: 'getHomeProjects', data: {url: '/api/v1/home/', method: 'post'}, action: 'hga', actionBack: 'hgar'}, // 获取首页项目列表
  ],
  header: [
    {name: 'getMarket', data: {url: '/api/v1/home/', method: 'post'}, action: 'hgd', actionBack: 'hgdr'}, // 获取头部市场数据
  ],
  user: [
    {name: 'getCollect', data: {url: '/api/v1/user/', method: 'post'}, action: 'ugf', actionBack: 'ugfr'}, // 收藏列表
    {name: 'setCollect', data: {url: '/api/v1/user/', method: 'post'}, action: 'ucf', actionBack: 'ucfr'}, // 添加，取消收藏
  ],
  search: [
    {name: 'search', data: {url: '/api/v1/search/', method: 'post'}, action: 'sgr', actionBack: 'sgrr'}, // 搜索
  ],
}
