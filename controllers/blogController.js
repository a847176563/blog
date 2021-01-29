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
        let { blogId } = ctx.params;
        let results = await model.getBlogById(blogId);
        if (results.length > 0) {
            let { blog_id, title, content, post_time } = results[0];
            let blogInfo = {
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
    },
};
