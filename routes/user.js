//引入Koa-router路由
const Router = require('@koa/router');
const router = new Router();

let controller = require("../controllers/userController")

// const Koa = require("koa");
// const app = new Koa();
// const bodyParser = require('koa-bodyparser');
// // 使用ctx.body解析中间件
// app.use(bodyParser());

//登录页
router.get('/login', async (ctx) => {
  //一定要从session中取值使用
  let loginUser = ctx.session.loginUser;
  
  let userId = ctx.session.user_id;
  
  await ctx.render('login', {
    user: loginUser,
    user_id : userId 
  });
});

//注册页
router.get('/regist', async (ctx) => {
  let loginUser = ctx.session.loginUser;
  
  await ctx.render('regist', {
    user: loginUser,
    
  });
});

router.get('/checkUser', controller.checkUser);

//登陆路由
router.post('/login', controller.login);

//注册页数据
router.post('/regist', controller.regist);

module.exports = router;


// //首页文章信息获取
// function getBlogData(username, password) {
//     return new Promise((resolve, reject) => {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query(
//                     'SELECT * FROM t_blog ',
//                     // `SELECT * FROM t_user where username = "${username}" and password = "${password}" `,
//                     function (error, results) {
//                         //释放连接 连接池
//                         connection.release();
//                         if (error) {
//                             reject(err);
//                         } else {
//                             resolve(results);
//                         }
//                     }
//                 );
//             }
//         });
//     })
// };

// //封装异步操作 
// function getUserData(username, password) {
//     return new Promise((resolve, reject) => {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query(
//                     'SELECT * FROM t_user where username = "' + username + '" and password = "' + password + '" ',
//                     // `SELECT * FROM t_user where username = "${username}" and password = "${password}" `,
//                     function (error, results) {
//                         //释放连接 连接池
//                         connection.release();
//                         if (error) {
//                             reject(err);
//                         } else {
//                             resolve(results);
//                         }
//                     }
//                 );
//             }
//         });
//     })
// };

// //注册页保存信息
// function saveUser(user){
//     return new Promise((resolve, reject) => {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query(
//                     `INSERT INTO t_user set ?`,
//                     //?是被user传值
//                     user,
//                     function (error, results) {
//                         //释放连接 连接池
//                         connection.release();
//                         if (error) {
//                             reject(err);
//                         } else {
//                             resolve(results);
//                         }
//                     }
//                 );
//             }
//         });
//     })
// }