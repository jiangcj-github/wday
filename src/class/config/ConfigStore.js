import ExchangeStoreBase from '../ExchangeStoreBase'

export default class ConfigStore extends ExchangeStoreBase {
  constructor(count) {
    super("config", "general");

    //初始化语言
    let language = ["zh-CN","en-US"][this.getQuery("language")] || undefined;
    language && this.Storage.language.set(language);

    this.state = {
      language: this.Storage.language.get() || "zh-CN",
    }
  }

  changeLanguage(lang){
    this.state.language = lang;
    this.Storage.language.set(lang);
  }

  get language(){
    return this.state.language;
  }

}