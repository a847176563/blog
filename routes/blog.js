const Koa = require("koa");
//引入Koa-router路由
const Router = require('@koa/router');
const router = new Router();
let controller = require("../controllers/blogController")

//首页
router.get('/', controller.welcome);

//传递ID形式 服务器进行查找
router.get("/blog/detail/:blogId", controller.getBlogDetail);

//发表文章
router.get('/write', async (ctx) => {
    let loginUser = ctx.session.loginUser;
    
    // console.log('write' ,userId);
    await ctx.render('write', {
      user: loginUser,
      
    });
  });

router.post('/write', controller.write);

module.exports = router;