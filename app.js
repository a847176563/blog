const Koa = require('koa');
//引入Koa-router路由
const session = require('koa-session');
//引入ejs模板引擎
const views = require("koa-views");
const path = require('path');
//引入静态资源
const staticPath = require("koa-static");
const app = new Koa();

const bodyParser = require('koa-bodyparser');
// 使用ctx.body解析中间件
app.use(bodyParser());

app.use(staticPath(path.join(__dirname, '/public')));


//加载模板引擎
app.use(
    views(path.join(__dirname, '/views'), {
        extension: 'ejs',
    })
);

app.keys = ['Myblog_key$$'];
app.use(session(app));

//引入路由模块
const user = require("./routes/user");
const blog = require("./routes/blog");
app.use(user.routes()).use(user.allowedMethods());
app.use(blog.routes()).use(blog.allowedMethods());
app.listen(80);
console.log("Ok");