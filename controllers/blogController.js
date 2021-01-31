const model = require("../models/blogModels")

module.exports = {
    async welcome(ctx) {
        let results = await model.getBlogs();
        let loginUser = ctx.session.loginUser;

        console.log(results);
        //报错Malicious Path 原因： index前加了斜线
        await ctx.render('index', {
            blogs: results,
            user: loginUser,

        });
    }, async getBlogDetail(ctx) {
        let loginUser = ctx.session.loginUser;
        let { blogId } = ctx.params;
        ctx.request.body.blogId = blogId;
        console.log('getblog',ctx.request.body);
        console.log(ctx.session.username);
        let results = await model.getBlogById(blogId);
        if (results.length > 0) {
            let { blog_id, title, content, post_time } = results[0];
            let blogInfo = {
                // user: loginUser,
                blog_id,
                title,
                content,
                post_time,
            };
            blogInfo.comments = [];
            for (let i = 0; i < results.length; i++) {
                let obj = results[i];
                blogInfo.comments.push({
                    comm_id: obj.comm_id,
                    comm_content: obj.comm_content,
                    comm_post_time: obj.comm_post_time,
                    username: obj.username
                });
            }
            console.log(blogInfo);

            await ctx.render("blog-detail", {
                blog: blogInfo,
                user: loginUser,
            });
        } else {
            await ctx.render("error", {
                message: '该条文章不存在！'
            });
        }
    }, async write(ctx) {
        //接收表单数据
        try {
            var user_id = ctx.session.userId;

            let user = ctx.request.body;
            user.user_id = user_id;
            // console.log('write' ,userId);
            console.log(user);

            let results = await model.saveBlogData(user);
            if (results.insertId) {//判断insertId是否有正常直
                // await ctx.render('login');
                console.log('文章上传成功');
                ctx.redirect("/")
            } else {
                await ctx.render('error');
            }
        } catch (err) {
            console.log(err);
        }

        // }
    }, async discuss(ctx) {
        //接收表单数据
        var { blogId } = ctx.params;
        var user_id = ctx.session.userId;
        let user = ctx.request.body;
        user.user_id = user_id;
        user.blog_id = blogId;

        
        console.log(user);
        let results = await model.saveDisscus(user);
        if (results.insertId) {//判断insertId是否有正常直
            // await ctx.render('login');
            console.log('评论');
            ctx.redirect("/")
        } else {
            await ctx.render('error');
        }
        //}
    },

};
