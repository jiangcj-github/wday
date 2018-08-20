//图片索引表 - view中使用
//命名规则： $_文件名 : url(...)
//禁止跨模块引用，需要引用其他模块的图片，需要在自己的模块内重复声明变量。

let header = {
    $icon_coin_five: "/static/web/icon_coin_five@3x.png",       //示例币种图标
    $icon_logo: "/static/web/icon_logo_mrbd@3x.png",             //logo
    $icon_menu_quit: "/static/web/icon_menu_quit@3x.png",       //退出
    $icon_collect_big_normal: "/static/web/icon_collect_big_normal@3x.png",  //收藏
};
let footer = {
    $icon_logo_white_mrbd: "/static/web/icon_logo_white_mrbd@3x.png",   //logo
};

let article = {
  $_good_normal: "/static/web/icon_lh_normal@3x.png",
  $_good_hover: "/static/web/icon_lh_hover@3x.png",
  $_good_selected: "/static/web/icon_lh_selected@3x.png",
  $_good_selected_hover: "/static/web/icon_lh_selected_hover@3x.png",
};

let common = {
  $_good_normal: "/static/web/icon_good_normal@3x.png",
  $_good_hover: "/static/web/icon_good_hover@3x.png",
  $_good_selected: "/static/web/icon_good_selected@3x.png",
  $_good_selected_hover: "/static/web/icon_good_selected_hover@3x.png",

  $_bad_normal: "/static/web/icon_bad_normal@3x.png",
  $_bad_hover: "/static/web/icon_bad_hover@3x.png",
  $_bad_selected: "/static/web/icon_bad_selected@3x.png",
  $_bad_selected_hover: "/static/web/icon_bad_selected_hover@3x.png",

  $_share_hover: "/static/web/icon_lhlk_share_hover@3x.png",
  $_share_normal: "/static/web/icon_lhlk_share_normal@3x.png",
  $_pop_link: "/static/web/icon_pop_link@3x.png",
};

let news = {
  $_news_next_normal: "/static/web/icon_next_normal@3x.png",

};

let search = {
  $_no_result : "/static/web/img_empty_one@3x.png"
}

let project = {
   $_icon_project_xmjs : "/static/web/icon_project_xmjs@3x.png",
   $_icon_project_dbxq : "/static/web/icon_project_dbxq@3x.png",
   $_icon_project_xmys : "/static/web/icon_project_xmys@3x.png",
   $_icon_project_rdpj : "/static/web/icon_project_rdpj@3x.png",
   $_icon_project_yhdf : "/static/web/icon_project_yhdf@3x.png",
   $_icon_project_tdjs : "/static/web/icon_project_tdjs@3x.png",
   $_icon_project_lxt : "/static/web/icon_project_lxt@3x.png",
   $_icon_project_xgwz : "/static/web/icon_project_xgwz@3x.png",
};

export default function () {
  return Object.assign({},
    news,
    header,
    footer,
    article,
    common,
    search,
    project
  );
}