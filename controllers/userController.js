const model = require("../models/userModels")

module.exports = {
    async login(ctx) {
        //接收表单数据

        let { username, password } = ctx.request.body;
        //安全验证
        //连接数据库

        let userData = await model.getUserByNameAndPwd(username, password);
        console.log(userData);
        var user_id = userData[0].user_id;
        // console.log('userdata',user_id);
        if (userData.length > 0) {
            //重定向 重新回到指定路由 不允许传送数据

            ctx.session.loginUser = username;
            //文章发布用到id

            ctx.session.userId = user_id;
            // console.log(ctx.session);
            ctx.redirect("/")
        } else {
            await ctx.render("error", {
                message: "登陆失败 用户名或密码不正确"
            });
        }
    },
    async regist(ctx) {
        //接收表单数据
        console.log(ctx.request.body);
        let { username, password, nickname } = ctx.request.body;
        //安全验证
        if (username.trim().length == 0) {
            await ctx.render("error", {
                message: "用户名不能为空"
            });
        } else {
            //连接数据库
            let results = await model.saveUserData({ username, password, nickname });
            if (results.insertId) {//判断insertId是否有正常直
                // await ctx.render('login');
                ctx.session.loginUser = username;

                ctx.redirect("/login", {
                    user: ctx.session.loginUser,

                });
            } else {
                await ctx.render('error');
            }
        }
    }, async checkUser(ctx) {

        let { username } = ctx.query;
        //安全验证
        //连接数据库

        let userData = await model.getUserDataByName(username);
        console.log(userData);
        if (userData.length > 0) {
            //重定向 重新回到指定路由 不允许传送数据
            ctx.body = "fail"

        } else {
            ctx.body = "success"
        }
    }
}