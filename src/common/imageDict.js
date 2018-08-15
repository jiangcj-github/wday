//图片索引表 - view中使用
//命名规则： $_文件名 : url(...)
//禁止跨模块引用，需要引用其他模块的图片，需要在自己的模块内重复声明变量。

let header = {
    $icon_coin_five : "/static/web/icon_coin_five@3x.png",
};


export default function (){
    return Object.assign({},
        header,
    );
}