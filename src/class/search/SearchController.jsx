import ExchangeControllerBase from '../ExchangeControllerBase'
import SearchStore from './SearchStore'
import Error from "../Error"

class SearchController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new SearchStore();
  }

  async search(srchText){
    let result = await this.store.search({tit: srchText});

    let resultR = {};

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