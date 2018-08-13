import ExchangeStoreBase from '../ExchangeStoreBase'

export default class ConfigStore extends ExchangeStoreBase {
  constructor(count) {
    super("config", "general");
    let language = this.getQuery("language") === '0' ? "zh-CN" : this.getQuery("language") === '1' ? "en-US" : undefined;
    language && this.Storage.language.set(language);
    this.state = {
      language: this.Storage.language.get() || "en-US",
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