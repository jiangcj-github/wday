import ExchangeControllerBase from '../ExchangeControllerBase'
import NewsStore from "./NewsStore";
import Error from "../Error";

class NewsController extends ExchangeControllerBase {
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
    let resultR = result && {
      id: result.id,
      time: new Date(result.iss * 1000).dateHandle("HH:mm"),
      title: result.tit,
      content: result.ctt,
      like: result.lik,
      dislike: result.dlk,
      cardMonth: new Date(result.iss * 1000).dateHandle("M") + "月",
      cardDay: new Date(result.iss * 1000).dateHandle("dd"),
      cardDayis: result.iss,
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