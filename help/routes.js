/**
 * key对应目录，value对应路由
 *  xx为前缀 本地环境为localhost:8000 线上环境为域名
 *  ........未完待续
 * */
const routesHelp = {
  //welcome
  "pages/welcome/index.jsx": "xx/welcome", //welcome页面
  "pages/welcome/login/index.jsx": "xx/welcome/login", //登录页面
  "pages/welcome/register/index.jsx": "xx/welcome/register", //注册页面

  //dashboard
  "pages/dashboard/$id$.jsx": "xx/dashboard/:id?", //此处应该是可选动态路由

  //rank
  "pages/rank/index.jsx": "xx/rank", //排行榜

  //mission_hall
  "pages/mission_hall/index.jsx": "xx/mission_hall",  //任务大厅

  //account
  "pages/account/index.jsx": "xx/account"

};
