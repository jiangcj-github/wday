import ExchangeControllerBase from '../ExchangeControllerBase'
import ProjectStore from './ProjectStore'

class ProjectController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new ProjectStore();
    }

    //获取首页项目列表
    async getActivityHome(){
        let data = await this.store.getActivity();
        if(data.ret !== 1 ){
            return Promise.resolve({msg: ""});
        }
        return Promise.resolve(data.data);
    }

}

//静态实例
ProjectController.instance = null;

export default function () {
    if(!ProjectController.instance){
        ProjectController.instance = new ProjectController();
    }
    return ProjectController.instance;
}