import ExchangeStoreBase from '../ExchangeStoreBase';

export default class ArticleStore extends ExchangeStoreBase {
  constructor() {
    super('article', 'general');
    this.state = {}
  }

  async getArticleList(page, num) {
    let resultR = await this.Proxy.getArticleList({cp:page, ps:num});
    return resultR.data || [];
  }

  async getArticleDetail(id) {
    let resultR = await this.Proxy.getArticleDetail({id:id});
    let result =  {
      id: 2,
      title: "最高法：妥善审理民间借贷纠纷案件 防范化解各类风险",
      content: "新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥善审理民间借贷案件的通知。",
      author: "赵四",
      speak: "我的个性签名",
      date: "18-01-11",
      topImg: "https://bpic.588ku.com/element_banner/20/18/08/351737d428923be2f258e5b6b58c806d.jpg",
      tags: ["智能合约", "BTC", "数字支付"]
    };
    return resultR.data || {};
  }
}