//图片索引表 - view中使用
//命名规则： $_文件名 : url(...)
//禁止跨模块引用，需要引用其他模块的图片，需要在自己的模块内重复声明变量。

let imageDict = {
    $_back_white : "/static/web/back_white@3x.png",
};

let login = {
    $_back_white : "/static/web/back_white@3x.png",
};

let header = {
    $_back_white : "/static/web/back_white@3x.png",
};

export default function (){
    return Object.assign({},
        imageDict,
        login,
        header
    );
}