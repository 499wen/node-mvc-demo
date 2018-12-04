'use strict';

// 引入 模块
const nunjucks = require('nunjucks');
// koa 、 koa-router 、 koa-bodyparser 、 koa-static
const bodyParser = require('koa-bodyparser');
var Koa = require('koa');
const app = new Koa();
const templating = require('./templating') // 模板引擎
const controller = require('./controller') // 

/*
 * isProduction 是否为 production 环境 
 *      如果是，就使用缓存，如果不是，就关闭缓存
 *      在开发环境下，关闭缓存后，我们修改View，可以直接刷新浏览器看到效果。
 *      否则，每次修改都必须重启Node程序，会极大地降低开发效率
 */
const isProduction = process.env.NODE_ENV === 'production';

if(! isProduction){
    const stat = require('koa-static');
    app.use(stat(__dirname, 'static'));   //  引入静态文件目录
}

// 添加 post请求 中间件
app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method}  ${ctx.request.url}`)
    await next(); // 调用下一个 中间件 middleware
}) 

// 添加 路由中间件
app.use(controller())

app.listen(3000);

console.log('Server is port http://127.0.0.1:3000');