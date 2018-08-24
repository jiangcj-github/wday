import ExchangeStoreBase from '../ExchangeStoreBase'

export default class ConfigStore extends ExchangeStoreBase {
  constructor(count) {
    super("config", "general");
    this.state = {
      language: this.Storage.language.get() || "zh-CN",
      timestamp: Date.now(),
    }
  }

  setLanguage(lang){
    this.state.language = lang;
    this.Storage.language.set(lang);
  }

  setTimestamp(timestamp){
    this.state.timestamp = timestamp;
  }

  get timestamp(){
    return this.state.timestamp;
  }

  get language(){
    return this.state.language;
  }

}