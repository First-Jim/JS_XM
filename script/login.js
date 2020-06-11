!function ($) {
    $('.fm-button').on('click', function () {
        // console.log($('#loginName').val(), hex_sha1($('#loginPassword').val()));
        $.ajax({
            type: 'post',
            url: 'http://10.31.162.52/JS_2002/xiaomi/php/login.php',
            data: {
                username: $('#loginName').val(),
                password: hex_sha1($('#loginPassword').val())
            }
            
        }).done(function (result) {
            console.log(result);
            if (result) {
                location.href = "index.html";
                localStorage.setItem('username', $('#loginName').val());
            } else {
                $('#login-password').val('');
                $('.tips').html('用户名或者密码错误')
                // alert('');
            }
        });
    });
}(jQuery);