import ExchangeControllerBase from '../ExchangeControllerBase'
import NewsStore from "./NewsStore";

export default class NewsController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new NewsStore();
  }


  async getNewsList() {
    let result = await this.store.getNewsList();
    let resultR = [];

    result && result.map((v, index) => {
      resultR.push({
        dayDate: v.dte,
        news: v.dta.map((item, index2) => {
          return {
            id: item.id,
            title: item.tit,
            content: item.ctt,
            issueTime: item.ist,
            like: item.lik,
            dislike: item.dsl
            // TODO 收藏字段
          };
        })
      })
    });
    console.log("news R",resultR);
    return resultR;
  }

  async getNewsDetail() {
    let result = await this.store.getNewsDetail();
    console.log(result);
    return result;
  }

}