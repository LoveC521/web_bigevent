$(function(){
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    let form = layui.form
    let layer = layui.layer
    form.verify({
        // 校验密码是否规范
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]

        // 校验两次密码是否一致
        ,repwd: function(value) {
            let password = $('.reg-box [name=password]').val()
            if(password !== value)
                return '两次密码不一致！'
        }
    })

    // 监听注册表单
    $('#form-reg').on('submit', function(e){
        e.preventDefault()
        $.post(
            '/api/reguser',
            {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            function(res) {
                if(res.status !== 0)
                    return layer.msg(res.message)
                layer.msg('注册成功！请登录')

                // 模拟人的点击行为
                $('#link_login').click()
            }
        )

    })

    // 监听登录表单
    $('#form_login').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0)
                    return layer.msg('登录失败')
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})