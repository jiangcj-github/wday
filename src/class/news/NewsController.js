import ExchangeControllerBase from '../ExchangeControllerBase'
import NewsStore from "./NewsStore";

export default class NewsController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new NewsStore();
  }

  async getNewsList(page, pageSize) {
    let result = await this.store.getNewsList(page, pageSize);
    let resultR = [];
    result && Object.keys(result).length >0 && Object.keys(result).forEach(
      key => resultR.push({
        dayDate: key,
        news: result[key].map(v => {
          return {
            id: v.id,
            title: v.tit,
            content: v.ctt,
            issueTime: v.iss,
            like: v.lik,
            dislike: v.dlk
          }
        })
      })
    );
    console.log("快讯接口返回 = ", resultR);
    return resultR;
  }

  async getNewsDetail(id) {
    let result = await this.store.getNewsDetail(id);
    console.log(211,result);
    let resultR = result.data && {
      id: result.data.id,
      time: new Date(result.data.iss * 1000).dateHandle("HH:mm"),
      title: result.data.tit,
      content: result.data.ctt,
      like: result.data.like,
      dislike: result.data.dlk,
      cardMonth:  new Date(result.data.iss * 1000).dateHandle("M") + "月",
      cardDay:  new Date(result.data.iss * 1000).dateHandle("dd"),
      cardDayis:  new Date(result.data.iss * 1000).dateHandle("MM-dd"),
      cardWeek: new Date(result.data.iss * 1000).dateHandle("www"),
    };
    console.log(2112,resultR);
    return resultR;
  }

}