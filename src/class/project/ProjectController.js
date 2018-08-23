import ExchangeControllerBase from '../ExchangeControllerBase'
import ProjectStore from './ProjectStore'
import Error from "../Error";

class ProjectController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new ProjectStore();
    }

    //获取项目列表
    async getProjectList(curPage, pageSize){
        let data = await this.store.getProjectList({
          cp: curPage,
          ps: pageSize
        });
        if(data.ret !== 1 ){
            return {msg: Error[data.ret]};
        }
        return data.data;
    }

    //获取项目详情
    async getProjectDetail(id){
        let data = await this.store.getProjectDetail({
          id: id
        });
        if(data.ret !== 1 ){
            return {msg: Error[data.ret]};
        }
        return data.data;
    }

    //获取首页项目列表
    async getActivityHome(){
        let data = await this.store.getActivity();
        if(data.ret !== 1 ){
            return {msg: Error(data.ret)};
        }
        return data.data;
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