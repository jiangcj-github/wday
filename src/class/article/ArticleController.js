import ExchangeControllerBase from '../ExchangeControllerBase'
import ArticleStore from "./ArticleStore";
import UserController from  "../user/UserController";

class ArticleController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new ArticleStore();

  }

  async getSearchArticleList(page, pageSize) {
    // let result = await this.store.getSearchArticleList(page, pageSize);
    let result = await this.getArticleList(page, pageSize);
    result.total = 221;
    console.log('search article', result);
    return result;

  }

  async getArticleList(page, num) {
    let result = await this.store.getArticleList(page, num);
    let resultR = [];
    await UserController().initCollect();
    result.list && result.list.map((v, index) => {
      resultR.push({
        id: v.id,
        author: v.aut,
        title: v.tit,
        content: v.pre,
        // content: v.content,
        img: v.img && (v.img.indexOf("http") >-1 ? v.img : `http://192.168.55.125/image/origin/${v.img}`),
        like: v.ln,
        read: v.rn,
        date: new Date(v.iss * 1000).dateHandle("MM-dd HH:mm"),
        isCollect: UserController().isCollect(2, v.id)
      })
    });
    console.log("result in view", resultR);
    return resultR;
  }

  async getArticleDetail(id) {
    let result = await this.store.getArticleDetail(id);
    console.log("result",result);
    let resultR = Object.keys(result).length > 0 ? {
      title: result.tit,
      content: result.ctt,
      author: result.aut,
      speak: result.aut,
      date: new Date(result.iss * 1000).dateHandle("MM-dd HH:mm"),
      // 根据图片有无http 来判断显示网络图片还是服务器图片
      topImg: result.img && (result.img.indexOf("http") >-1 ? result.img : `http://192.168.55.125/image/origin/${result.img}`),
      tags: result.lab,
      like: result.ln
    }: {};

    return resultR;
  }

}

//静态实例
ArticleController.instance = null;

export default function() {
  if(!ArticleController.instance){
    ArticleController.instance = new ArticleController();
  }
  return ArticleController.instance;
}