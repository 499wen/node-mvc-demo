var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    })
        
}

var fn_singin = async (ctx, next) => {
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password;
    
    if(email === 'wen2237380164@126.com' && password === '6496623322') {
        ctx.render('singin-ok.html', {
            title: 'Sing In OK',    
            name: 'Mr Node'
        })
    } else {
        ctx.render('singin-no.html', {
            title: 'Sing In NO',
            name: '账号密码输入有误！'
        })
    }

}

module.exports = {
        'GET /': fn_index,
        'POST /singin': fn_singin
    };