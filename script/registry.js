! function($) {
    let $user = $('#username');
    let $usernameflag = true;
    let $pwdflag = true;
    $user.on('blur', function() {
        $.ajax({
            type: 'post',
            url: 'http://10.31.162.52/JS_2002/xiaomi/php/registry.php',
            data: {
                username: $user.val()
            }
        }).done(function(result) {
            if (!result) { //不存在
                $('.user').html('√').css('color', 'green');
                $usernameflag = true;
                $('.user').html('');
            } else {
                $('.user').html('该用户名已经存在').css('color', 'red');
                $usernameflag = false;
            }
        })
    });
    // 事件委托表单验证
    $('.regbox').on('blur', 'input', function(e) {
        // alert(this);
        let value = $(this).val();
        if (value === '') {
            alert('no');
        }
        // console.log(this, value);

    });

    // $('#password').on('blur', function() {
    //     if(){}
    // })

    $('#repass').on('blur', function() {
        if (!$('#password').val() === '') {
            $('.pwd').html('请输入的密码').css('color', 'red');
            if (!$('#repass').val() === '') {
                $('.pwd').html('请您确认密码').css('color', 'red');
            }
        }
        $('.pwd').html("");
        $pwdflag = $('#password').val() == $('#repass').val();
        if (!$pwdflag) {
            $('.pwd').html('两次输入的密码不一致').css('color', 'red');
            return false;
        }
        $('.pwd').html('√').css('color', 'green');
    });


    $('form').on('submit', function() {
        if ($user.val() == '') {
            $('.user').html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        }
        if (!$usernameflag) {
            return false; //阻止提交
        }
    });
}(jQuery);