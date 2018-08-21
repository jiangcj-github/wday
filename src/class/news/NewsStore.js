import ExchangeStoreBase from '../ExchangeStoreBase';

export default class NewsStore extends ExchangeStoreBase {
  constructor(props) {

    super(props);

    this.state = {}
  }

  async getNewsList() {
    let result = [
      {
        "date": 15,
        "data": [
          {
            "id": "",
            "title": "阿三大王达瓦达瓦达瓦达瓦阿瓦达",
            "content": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊over",
            "Issue": 0,
            "like": 0,
            "dislike": 0
          },
          {
            "id": "",
            "title": "吊带袜大王的fee分分分分分",
            "content": "瓦达达娃大碗大碗大苏打实打实大大阿斯顿啊实打实的哇大碗大碗大碗大碗大碗哇大王的伟大阿瓦达阿瓦达over",
            "Issue": 0,
            "like": 0,
            "dislike": 0
          }
        ]
      },
      {
        "date": 16,
        "data": [
          {
            "id": "",
            "title": "阿伟大碗大碗大碗大碗大碗大碗大碗大碗的",
            "content": "阿瓦达伟大伟大伟大而非v让给他人认同你有人叫你容易受到v突然间听到方式v保护费over",
            "Issue": 0,
            "like": 0,
            "dislike": 0
          },
          {
            "id": "",
            "title": "知道v记录第四届立法欸进了房间垃圾垃圾记录",
            "content": "手机逛街迥然零件表面卡拉国际频道收看v谁叫你是冏大神囧死爱滴哦啊都共计金额哦股票魔鬼的over",
            "Issue": 0,
            "like": 0,
            "dislike": 0
          }
        ]
      }
    ];
    return result;
  }

  async getNewsDetail() {
    let result = {
      id: 3,
      title: "生态福建 交出绿色答卷",
      content: "2016年8月，中共中央办公厅、国务院办公厅印发《关于设立统一规范的国家生态文明试验区的意见》。",
      author: "赵四",
      date: "18-01-13"
    };
    return result;
  }

}