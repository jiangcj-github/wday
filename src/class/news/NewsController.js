import ExchangeControllerBase from '../ExchangeControllerBase'
import NewsStore from "./NewsStore";
import Error from "../Error";

class NewsController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new NewsStore();
    this.today = Math.round(new Date().getTime()/1000);
  }

  compareDate(time) {
    console.log( `today= ${this.today}  time = ${time} today-time = ${this.today - time}`);
    if(this.today - time < 86400) {
      return "今天";
    }
    return this.today - time > 86400 && this.today - time < 172800 ? "昨天" : new Date(time * 1000).dateHandle("MM-dd");
  }

  async getNewsList(page, pageSize) {
    let result = await this.store.getNewsList(page, pageSize);
    let resultR = [];
    result && Object.keys(result).length >0 && Object.keys(result).forEach(
      key => resultR.push({
        dayDate: key,
        dayCardis: this.compareDate(key),
        cardMonth: new Date(key * 1000).dateHandle("MM"),
        cardDay: new Date(key * 1000).dateHandle("dd"),
        cardWeek: new Date(key * 1000).dateHandle("www"),
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
    let resultR = result && {
      id: result.id,
      time: new Date(result.iss * 1000).dateHandle("HH:mm"),
      title: result.tit,
      content: result.ctt,
      like: result.lik,
      dislike: result.dlk,
      cardMonth: new Date(result.iss * 1000).dateHandle("MM"),
      cardDay: new Date(result.iss * 1000).dateHandle("dd"),
      cardDayis: this.compareDate(result.iss),
      cardWeek: new Date(result.iss * 1000).dateHandle("www"),
    };
    return resultR;
  }

  // 利好利空
  // relateId - 资讯ID,  bool - true(利好),false(利空)
  async voteNews(relateId, bool){
    let data = await this.store.voteNews();
    if(data.ret !== 0){
      //return {msg: Error(data.ret)};
    }
    this.store.saveVote(relateId, bool);
    return {};
  }

  // 是否投票
  isVote(relateId, bool){
    return this.store.isVote(relateId, bool);
  }

}

//静态实例
NewsController.instance = null;

export default function() {
  if(!NewsController.instance){
    NewsController.instance = new NewsController();
  }
  return NewsController.instance;
}