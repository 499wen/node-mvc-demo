'use strict';

var fs = require('fs');

function addMapping(router, mapping) {
    // 循环出 每个文件暴露的 模块对象
    for (var j in mapping) {
        if (j.startsWith('GET')) {

            // 取出路由
            var path = j.substring(4)
            router.get(path, mapping[j]);

        } else if (j.startsWith('POST')) {
            var path = j.substring(5);
            router.post(path, mapping[j]);
        }

    }
}

function addController(router) {
    // 获取根目录 
    const ROOT = (__dirname + '/').replace(/\\/g, '/'); // 将目录中的 \ 换成 /
    
    // 引入 根目录下的 controller 目录( 同步读取 )
    let files = fs.readdirSync(ROOT + 'controllers');

    // 将controller 中的.js 文件过滤
    let js_file = files.filter((f) => {
        return f.endsWith('.js');
    })

    // 配置路由
    for (let i of js_file) {
        // 引入每个模块文件
        var mapping = require(ROOT + 'controllers/' + i);

        addMapping(router, mapping)
    }
}

module.exports = () => {
    let router = require('koa-router')();
    addController(router);

    // 添加路由中间件
    return router.routes();
}