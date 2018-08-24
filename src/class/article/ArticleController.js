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
        img: `http://192.168.55.125/image/origin/${v.img}`,
        like: v.lke,
        read: v.rad,
        date: new Date(v.ist * 1000).dateHandle("MM-dd HH:mm")
      })
    });

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
      date: new Date(result.ist * 1000).dateHandle("MM-dd HH:mm"),
      topImg: `http://192.168.55.125/image/origin/${result.img}`,
      tags: result.lab,
      read: result.red,
      like: result.lke
    }: {};

    // let result =  {
    //   id: 2,
    //   title: "最高法：妥善审理民间借贷纠纷案件 防范化解各类风险",
    //   content: "新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥善审理民间借贷案件的通知。",
    //   author: "赵四",
    //   speak: "我的个性签名",
    //   date: "18-01-11",
    //   topImg: "https://bpic.588ku.com/element_banner/20/18/08/351737d428923be2f258e5b6b58c806d.jpg",
    //   tags: ["智能合约", "BTC", "数字支付"]
    // };
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