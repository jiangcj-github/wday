import ExchangeControllerBase from '../ExchangeControllerBase'
import ArticleStore from "./ArticleStore";

class ArticleController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new ArticleStore();

  }

  async getArticleList(page, num) {
    let result = await this.store.getArticleList(page, num);
    console.log("result in controller", result);
    let resultR = [];
    result && result.map((v, index) => {
      resultR.push({
        id: v.id,
        author: v.aut,
        title: v.tit,
        content: v.pre,
        // content: v.content,
        img: v.img,
        like: v.lke,
        read: v.rad,
        date: new Date(v.ist * 1000).dateHandle("MM-dd HH:mm")
      })
    });

    return resultR;
  }

  async getArticleDetail() {
    let result = await this.store.getArticleDetail();

    return result;
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