//图片索引表 - view中使用
//命名规则： $_文件名 : url(...)
//禁止跨模块引用，需要引用其他模块的图片，需要在自己的模块内重复声明变量。

let header = {
    $icon_coin_five : "/static/web/icon_coin_five@3x.png",
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

let news = {};
export default function () {
  return Object.assign({},

    header,
    article,
    common
  );
}