import './libs/RSAUtil';

const encrypt = new JSEncrypt();
let rsaPublicKeyFlag = false;

export default class ControllerBase {
  constructor() {

  }

  static RSAsetPublicKey(key){
      encrypt.setPublicKey(key);
      rsaPublicKeyFlag = true
  }

  static RSAencrypt(data){
      if(!rsaPublicKeyFlag){
          return 'please set rsa publickey in method RSAsetPublicKey'
      }
      return encrypt.encrypt(data);
  }

}
