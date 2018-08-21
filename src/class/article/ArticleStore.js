import ExchangeStoreBase from '../ExchangeStoreBase';

export default class ArticleStore extends ExchangeStoreBase {
  constructor() {
    super('article', 'general');
    this.state = {}
  }

  async getArticleList(param) {
    // let resultR = await this.Proxy.getArticleList(param);
    let result = [
      {
        id: 1,
        title: "习近平谈如何打赢脱贫攻坚战",
        content: "坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进入全面小康社会是我们党的庄严承诺。",
        author: "赵四",
        date: "18-01-11",
        favourite: true
      },
      {
        id: 2,
        title: "最高法：妥善审理民间借贷纠纷案件 防范化解各类风险",
        content: "新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥善审理民间借贷案件的通知。",
        author: "赵四",
        date: "18-01-11",
        img: "https://bpic.588ku.com/element_banner/20/18/08/351737d428923be2f258e5b6b58c806d.jpg",
        favourite: false
      },
      {
        id: 3,
        title: "生态福建 交出绿色答卷",
        content: "2016年8月，中共中央办公厅、国务院办公厅印发《关于设立统一规范的国家生态文明试验区的意见》。",
        author: "赵四",
        date: "18-01-11",
        favourite: true
      },
    ];
    return result;
  }

  async getArticleDetail() {
    let result =  {
      id: 2,
      title: "最高法：妥善审理民间借贷纠纷案件 防范化解各类风险",
      content: "新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥善审理民间借贷案件的通知。",
      author: "赵四",
      speak: "我的个性签名",
      date: "18-01-11",
      topImg: "https://bpic.588ku.com/element_banner/20/18/08/351737d428923be2f258e5b6b58c806d.jpg",
      tags: ["智能合约", "BTC", "数字支付"]
    }
    return result;
  }
}