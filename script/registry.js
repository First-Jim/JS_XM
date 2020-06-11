! function($) {
    let $user = $('#username');
    let $pwd = $('#password');
    let $repwd = $('#repass');
    let $email = $('#email');
    let $tel = $('#tel');
    let $usernameflag = true;
    let $pwdflag = true;
    let $repassflag = true;
    let $emailflag = true;
    let $telflag = true;

    //验证用户名
    $user.on('focus',function(){
        $('.user').html('用户名不为空,中英文均可,最长14个字符或7个中文').css('color', 'red');
    })
    $user.on('input',function(){
        checkuser();
    })
    function checkuser(){
         let nameValue = $user.val();
         if(nameValue !== ''){//用户名不为空的情况下
            let len = nameValue.replace(/[\u4e00-\u9fa5]/g,'hh').length;//将中文替换成英文后计算长度
            // console.log(len);
            if(len <= 14){
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
                    } else {
                        $('.user').html('该用户名已经存在').css('color', 'red');
                        $usernameflag = false;
                    }
                })
            }else{
                $('user').html('用户名长度不符合要求').css('color', 'red');
                $usernameflag = false;
            }

         }else{
            $('user').html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
         }
         
    }

    $pwd.on('blur',function(){
        if($pwd.val() == ''){
            $('.pwd').html('密码不能为空').css('color', 'red');
            $pwdflag = false;
        }
    });
    //验证密码
    $pwd.on('input',function(){
        checkpwd();
    })

    function checkpwd(){
        let pwdVlaue = $pwd.val();
        console.log(pwdVlaue.length);
        if(pwdVlaue.length >=8 && pwdVlaue.length <= 16){
           let reg1 = /(?=\D+\d)/;//条件是首字母不能是数字，但是整个字符串中必须含有1个数字
           let reg2 = /(?=.*[a-z])/;//必须包含一个小写字母，字母可以在任意位置
           let reg3 = /(?=.*[A-Z])/;//必须包含一个大写字母，字母可以在任意位置
           let reg4 = /[a-zA-Z0-9]/;//大小写字母和数字字符最少8个，最多16

           let $count = 0;
           //匹配密码等级
           if(reg1.test(pwdVlaue)){
                $count++;
           }

           if(reg2.test(pwdVlaue)){
                $count++;
           }

           if(reg3.test(pwdVlaue)){
                $count++;
           }

           if(reg4.test(pwdVlaue)){
                $count++;
           }
           switch ($count){
                case 1:
                 $('.tips').html('弱').css('color', 'yellow');
                    $pwdflag = false;
                break;
                case 2:
                case 3:
                    $('.tips').html('中').css('color', 'red');
                    $('.pwd').html('√').css('color', 'green');
                    $pwdflag = true;
                break;
                case 4:
                    $('.tips').html('强').css('color', 'green');
                    $('.pwd').html('√').css('color', 'green');
                   $pwdflag = true;
                break;
           }
           
        }else{
            $('.pwd').html('密码长度不符合要求').css('color', 'red');
            $pwdflag = false;
        }
    }

    $pwd.on('blur',function(){
        if($pwd.val() !== ''){
            if($pwdflag){
                $('.pwd').html('√').css('color', 'green');
            }
            $pwdflag = true;
        }else{
            $('.tips').hide();
            $('.pwd').html('密码不能为空').css('color', 'red');
            $pwdflag = false;
        }
    })

   
    //验证确认密码
    $('#repass').on('input', function() {
      checkrepwd();
    });

    function checkrepwd(){
        $repwdValue = $repwd.val();
        if($repwdValue === ''){
            $('.repwd').html('确认密码不能为空').css('color','red');
            $repassflag = false;
        }else{
            $('.repwd').html('√').css('color', 'green');
            $repassflag = true;
        }

        if($pwd.val() !== $repwd.val()){
            $('.repwd').html('两次密码不一致').css('color','red');
            $repassflag = false;
        }
    }

    //验证邮箱
    $email.on('input',function(){
        let $emailValue = $email.val();
        if($emailValue !== ''){
            let regEmail = /^\w{5,}\@[a-zA-Z0-9]{2,}\.(com|net|org)(\.cn)?$/;
            if(regEmail.test($emailValue)){
                $('.emailtip').html('√').css('color','green');
                $emailflag = true;
            }else{
                $('.emailtip').html('邮箱输入不正确').css('color','red');
                $emailflag = false;
            }
        }else{
            $('.emailtip').html('邮箱不能为空').css('color','red');
            $emailflag = false;
        }
    });

    //验证电话
    $tel.on('input',function(){
        let $telValue = $tel.val();
        if($telValue !== ''){
            let regTel =  /^1\d{10}$/;
            if(regTel.test($telValue)){
                $('.teltip').html('√').css('color','green');
                $telflag = true;
            }else{
                $('.teltip').html('手机号码输入不正确').css('color','red');
                $telflag = false;
            }
        }else{
            $('.teltip').html('手机号码不为空').css('color','red');
            $telflag = false;
        }
    });

    $tel.on('blur',function(){
        let $telValue = $tel.val();
        if($telValue == ''){
        $('.teltip').html('手机号码不为空').css('color','red');
        $telflag = false;
        }
    });

    $('form').on('submit', function() {
        if ($user.val() === '') {
            $('.user').html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        }
        if ($pwd.val() === '') {
            $('.pwd').html('密码不能为空').css('color', 'red');
            $pwdflag= false;
        }
        if ($repwd.val() === '') {
            $('.repwd').html('确认密码不能为空').css('color', 'red');
            $repassflag= false;
        }
        if ($email.val() === '') {
            $('.emailtip').html('邮箱不能为空').css('color', 'red');
            $emailflag= false;
        }
        if ($tel.val() === '') {
            $('.teltip').html('手机号码不能为空').css('color', 'red');
            $telflag= false;
        }

        if (!$usernameflag || !$pwdflag || !$repassflag || !$emailflag || !$telflag) {
            return false; //阻止提交
        }
    });
}(jQuery);