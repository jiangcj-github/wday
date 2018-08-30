import ExchangeControllerBase from '../ExchangeControllerBase'
import SearchStore from './SearchStore'
import Error from "../Error"
import UserController from "../user/UserController";

class SearchController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new SearchStore();
  }

  compareDate(time) {
    console.log( `today= ${this.today}  time = ${time} today-time = ${this.today - time}`);
    if(this.today - time < 86400) {
      return "今天";
    }
    return this.today - time > 86400 && this.today - time < 172800 ? "昨天" : new Date(time * 1000).dateHandle("MM-dd");
  }

  async search(srchText, type, page, pageSize){
    let result = await this.store.search({
        tit:    srchText,
        typ:    type,
        ps:     pageSize,
        cp:     page,
    });
    if(result.ret !== 0){
        return {msg: Error(result.ret)};
    }
    console.log('search result !->', result);
    let data = result.data;
    let resultR = {
        total:   0,
        list:    [],
    };
    let parseProject = item =>{
        let resItem = {
            id:             item.id,
            logo:           item.lgo,
            name:           item.nme,
            fullName:       item.enm,
            badgeList:      item.cw || [],
            minNum:         item.min && item.min.value,
            minUnit:        item.min && item.min.unit,
            maxNum:         item.max && item.max.value,
            maxUnit:        item.max && item.max.unit,
            actualNum:      item.act && item.act.value,
            actualUnit:     item.act && item.act.unit,
            startTime:      item.sd * 1000,
            endTime:        item.fd * 1000,
            recvCoin:       item.cur || [],
            heat:           item.hot,
            icoPrices:      [],
            isCollect:      UserController().isCollect(1, item.id),
            type:           type,
        };
        resItem.step = resItem.minNum && (resItem.actualNum / resItem.minNum * 100).fix(0);     // 进度
        return resItem;
    };
    let parseArticle = item =>({
        id:           item.id,
        author:       item.aut,
        title:        item.tit,
        content:      item.pre,
        img:          item.img && (item.img.indexOf("http") >-1 ? item.img : `http://192.168.55.125/image/origin/${item.img}`),
        like:         item.ln,
        read:         item.rn,
        tags:         item.lab || ["美国XXX", "你美国a"],
        date:         new Date(item.iss * 1000).dateHandle("MM-dd HH:mm"),
        isCollect:    UserController().isCollect(2, item.id),
    });
    let parseNews = item =>({
      // dayDate: item,
      // dayCardis: this.compareDate(item),
      // cardMonth: new Date(item * 1000).dateHandle("MM"),
      // cardDay: new Date(item * 1000).dateHandle("dd"),
      // cardWeek: new Date(item * 1000).dateHandle("www"),
      // news: result[item].map(v => {
      //   return {
      //     id: v.id,
      //     title: v.tit,
      //     content: v.ctt,
      //     issueTime: v.iss,
      //     like: v.lik,
      //     dislike: v.dlk
      //   }
      // })

    });
    let parseFunc = {1: parseProject, 2: parseArticle, 3: parseNews}[type];
    if(data){
      await UserController().initCollect();
      resultR.total = data.all;
      console.log('search data :', data);
      data.lst && data.lst.forEach(item => resultR.list.push(parseFunc(item)));

      console.log('search resultR :', resultR);

    }
    return resultR;
  }

}

//静态实例
SearchController.instance = null;

export default function() {
  if(!SearchController.instance){
    SearchController.instance = new SearchController();
  }
  return SearchController.instance;
}