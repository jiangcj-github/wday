export default {
  /**
   * 使用方法
   *  1.在ProxyConfig配置好相关参数
   *  2.直接this.WebSocket.XXX生成链接，返回promise 为true
   *      注：若需要参数，this.WebSocket.XXX（params）
   *  3.调用this.WebSocket.XXX.get方法获得连接或连接组
   *  4.调用this.WebSocket.getAll返回所有连接
   *  this.emit
   */
  useWebSocket: false,  // 是否开启websocket
  /**
   * name:连接标识，名称
   * url:连接路径
   * size:连接数量，可选，默认为1
   */
  webSocketList: [
    {
      name: 'general', url: '/sub', optionList: {
        // test:{testEmit:{var: 1, op: 2}},
        global: {
          connect: {v: 1, o: 0, s: 0, resOp: 1},//握手
          heartBreak: {v: 1, o: 2, s: 0, resOp: 3},//心跳

        },
      }
    },

  ],
}


