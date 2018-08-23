import ExchangeStoreBase from '../ExchangeStoreBase';

export default class NewsStore extends ExchangeStoreBase {
  constructor(props) {

    super(props);

    this.state = {}
  }

  async getNewsList() {
    let result = [
      {
        "dte": 1934833541,
        "dta": [{"id": "1", "tit": "哇大碗大碗大碗大碗大碗的阿瓦达", "ctt": "哇大碗大碗大碗大碗大碗的阿瓦达哇大碗大碗大碗大碗大碗的阿瓦达哇大碗大碗大碗大碗大碗的阿瓦达", "ist": 0, "lik": 0, "dsl": 0},
          {"id": "2", "tit": "单位fee发发发哇哇方法哇我发", "ctt": "单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发", "ist": 0, "lik": 0, "dsl": 0},
          {"id": "2", "tit": "单位fee发发发哇哇方法哇我发", "ctt": "单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发", "ist": 0, "lik": 0, "dsl": 0},
          {"id": "2", "tit": "单位fee发发发哇哇方法哇我发", "ctt": "单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发", "ist": 0, "lik": 0, "dsl": 0}]
      },
      {
        "dte": 1234855555, "dta": [{"id": "3", "tit": "啊吴大维打撒发我份啊方法的", "ctt": "啊吴大维打撒发我份啊方法的啊吴大维打撒发我份啊方法的啊吴大维打撒发我份啊方法的", "ist": 0, "lik": 0, "dsl": 0},
          {"id": "3", "tit": "啊吴大维打撒发我份啊方法的", "ctt": "啊吴大维打撒发我份啊方法的啊吴大维打撒发我份啊方法的啊吴大维打撒发我份啊方法的", "ist": 0, "lik": 0, "dsl": 0}]
      },
      {
        "dte": 1514866666,
        "dta": [{"id": "4", "tit": "啊伟大光荣我去问问千千万万强强我", "ctt": "啊伟大光荣我去问问千千万万强强我啊伟大光荣我去问问千千万万强强我啊伟大光荣我去问问千千万万强强我", "ist": 0, "lik": 0, "dsl": 0}]
      },
      {
      "dte": 1444837777, "dta": [{"id": "5", "tit": "让他很疼很疼任何人提及一天又一天一天", "ctt": "让他很疼很疼任何人提及一天又一天一天让他很疼很疼任何人提及一天又一天一天让他很疼很疼任何人提及一天又一天一天让他很疼很疼任何人提及一天又一天一天", "ist": 0, "lik": 0, "dsl": 0}]
      },
      {
        "dte": 1334838888,
        "dta": [{"id": "1", "tit": "哇大碗大碗大碗大碗大碗的阿瓦达", "ctt": "哇大碗大碗大碗大碗大碗的阿瓦达哇大碗大碗大碗大碗大碗的阿瓦达哇大碗大碗大碗大碗大碗的阿瓦达", "ist": 0, "lik": 0, "dsl": 0},
          {"id": "2", "tit": "单位fee发发发哇哇方法哇我发", "ctt": "单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发单位fee发发发哇哇方法哇我发", "ist": 0, "lik": 0, "dsl": 0}]
      },
      {
        "dte": 1534839999, "dta": [{"id": "3", "tit": "啊吴大维打撒发我份啊方法的", "ctt": "啊吴大维打撒发我份啊方法的啊吴大维打撒发我份啊方法的啊吴大维打撒发我份啊方法的", "ist": 0, "lik": 0, "dsl": 0}]
      },
      {
        "dte": 1534111111,
        "dta": [{"id": "4", "tit": "啊伟大光荣我去问问千千万万强强我", "ctt": "啊伟大光荣我去问问千千万万强强我啊伟大光荣我去问问千千万万强强我啊伟大光荣我去问问千千万万强强我", "ist": 0, "lik": 0, "dsl": 0}]
      },
      {
        "dte": 1522833541, "dta": [{"id": "5", "tit": "让他很疼很疼任何人提及一天又一天一天", "ctt": "让他很疼很疼任何人提及一天又一天一天让他很疼很疼任何人提及一天又一天一天让他很疼很疼任何人提及一天又一天一天让他很疼很疼任何人提及一天又一天一天", "ist": 0, "lik": 0, "dsl": 0}]
      }];
    return result;
  }

  async getNewsDetail() {
    let result = {
      id: 3,
      title: "生态福建 交出绿色答卷",
      content: "2016年8月，中共中央办公厅、国务院办公厅印发《关于设立统一规范的国家生态文明试验区的意见》。",
      author: "赵四",
      date: "18-01-13"
    };
    return result;
  }

}