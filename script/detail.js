!function($){
    $('#nav').load("../src/top.html",function(){
            //0.根据本地存储，显示用户信息
        if (localStorage.getItem('username')) {
            $('.login').css('visibility','hidden');
            $('.topbar-info').css('visibility','visible');
            $('.topbar-info .name').html(localStorage.getItem('username'));
        }
    
        $('.exit_login').on('click', function () {
            $('.login').css('visibility','visible');
            $('.topbar-info').css('visibility','hidden');
            localStorage.removeItem('username');
            header('location:http://10.31.162.52/JS_2002/xiaomi/src/index.html');
        });
    });
    $('#footer').load("../src/footer.html");
    //1.获取地址栏的id
    let $sid = location.search.substring(1).split('=')[1];
    // 小图
    const $smallpic = $('#smallpic');
    //大图
    const $bigpic = $('#bigpic');
    //关键字
    const $keyword = $('font');
    const $title = $('.title');
    //mask遮罩层
    const $mask = $('#mask');
    //商品类别
    const $company_info = $('.company-info');
    // 价格
    const $price_info = $('.price-info');
    //大图容器
    const $product_bigpic = $('.product-bigpic');
    //小图容器
    const $magnify_glass = $('.magnify-glass');
    //小图列表
    const $list = $('.list');
    //左右箭头
    const $prev = $('.prev-btn');
    const $next = $('.next-btn');
     //如果$id不存在，默认$id = 1
     if (!$sid) {
        $sid = 1;
    }
    //2.将id传给后端
    $.ajax({
        url: 'http://10.31.162.52/JS_2002/xiaomi/php/getgoods_id.php',
        data: {
            sid: $sid
        },
        dataType:'json'
    }).done(function(data){
        console.log(data);
        $smallpic.attr('src',data.goods_small_logo);
        //给图片添加唯一id
        $smallpic.attr('sid',data.goods_id);
        $bigpic.attr('src',data.goods_big_logo);
        $keyword.html(data.goods_name);
        $title.html(data.cat_three_id);
        $company_info.html(data.cat_one_id);
        $price_info.html(data.goods_price);
        // 渲染小图
        let $slipic = data.goods_piclisurl.split(',');
        // console.log($slipic);
        let $strhtml = '';
        $.each($slipic, function(index, value) {
            $strhtml += '<li><img src="' + value + '"/>></li>';
        });
        $('.list').html($strhtml);
    });
    //渲染小图


    //放大镜效果
    // 遮罩层/大图的容器 = 小图/大图
    // 大图的放大尺寸
    $bigpic.width($product_bigpic.width() * $magnify_glass.width() / $mask.width());
    $bigpic.height($product_bigpic.height() * $magnify_glass.height() / $mask.height());

    //比例
    let $scale = $bigpic.width() / $smallpic.width();

    $magnify_glass.hover(function(){
        $mask.css('visibility','visible');
        $product_bigpic.css('visibility','visible');

        $(this).on('mousemove',function(ev){
            // 计算mask距离小图容器的左边和上面的距离
            //ev.pageX === mouseX  原生js中
            let $leftValue = ev.pageX - $magnify_glass.offset().left - $mask.width() /2;
            console.log(ev.pageX,$magnify_glass.offset().left,$mask.width() /2);
            let $topValue = ev.pageY - $magnify_glass.offset().top - $mask.height() /2;
            if($leftValue < 0){
                $leftValue = 0;
            }else if($leftValue >= $magnify_glass.width() - $mask.width()){
                $leftValue = $magnify_glass.width() - $mask.width();
            }

            if($topValue < 0){
                $topValue = 0;
            }else if($topValue >= $magnify_glass.height() - $mask.height()){
                $topValue = $magnify_glass.height() - $mask.height();
            }

            $mask.css({
                left:$leftValue,
                top:$topValue
            });

            $bigpic.css({
                left: -$scale * $leftValue,
                top: - $scale * $topValue
            })
        });
    },function(){
        $mask.css('visibility','hidden');
        $product_bigpic.css('visibility','hidden');
    });
    

    //下面列表中小图的切换
    $('.slide-img .list').on('click','li',function(){
        // $(this).css('border','2px solid #ff6700');
        let $imgsrc = $(this).find('img').attr('src');
        $smallpic.attr('src',$imgsrc);
        $bigpic.attr('src',$imgsrc);
    });

    //左右箭头事件
    let $nums = 6;//显示的列表的图片个数
    //点击左边
    $prev.on('click',function(){
        let $lists = $('.list li');
        if($nums > 6){
            $nums --;
            console.log($nums);
            // $next.css('color','#666');
            if($nums <=6 ){
                $prev.css('color','#fff');
            }
            $('.list').animate({
                left: -($nums - 6) * $lists.eq(0).outerWidth(true)
            })
        }
    });
    
     //点击右边
     $next.on('click',function(){
        let $lists = $('.list li');

        if($lists.size() > $nums){
            $nums ++;
            console.log($nums);
            // $next.css('color','#666');
            if($nums <=6 ){
                // $prev.css('color','#fff');
            }
            $('.list').animate({
                left: -($nums - 6) * $lists.eq(0).outerWidth(true)
            })
        }
    });
    console.log($('#cart-item-quanlity').val());
    //购物车本地存储
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    
    //取出cookie,才能判断是第一次还是多次点击
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    $('#add-cart').on('click',function(){
        //获取之前添加在图片上的id
        let $sid = $(this).parents('.mi-detail').find('#smallpic').attr('sid');
        cookietoarray();//先查找本地储存有没有数据
        if($.inArray($sid,arrsid) !== -1){//代表本地存储中有商品 的数据，数量直接增加
            //先取出cookie中存在商品的数量，再加上现在加的数量
            // alert('yiyou');
            let $totalnums = parseInt(arrnum[$.inArray($sid,arrsid)]) + parseInt($('#cart-item-quanlity').val());
            arrnum[$.inArray($sid,arrsid)] = $totalnums;
            $.cookie('cookienum',arrnum,{expires:10,path:'/'});
        } else{
            // 第一次添加
            arrsid.push($sid);
            $.cookie('cookiesid',arrsid,{expires:10,path:'/'});
            arrnum.push($('#cart-item-quanlity').val());
            $.cookie('cookienum',arrnum,{expires:10,path:'/'});
        }
        //添加购物车后，返回信息
        if (localStorage.getItem('username')) {
            $('.buytips').css('visibility','visible');
        }else{
            $('.logintips').css('visibility','visible');

        }
    });



    //顶部悬浮
    function suspended(){
        //克隆一个盒子，并设置新的属性
        let $clonebox  = $('.topNav-bar').clone(true,true).attr('id', 'NewBox');
        // console.log($clonebox);
        $(document.body).append($clonebox);
        $clonebox.css({
            'width':'100%',
            'position': 'fixed',
            'top': '-70px',
            'margin':'auto'
        });
        $(window).on('scroll',function(){
            let $top=$(window).scrollTop();
            // $('title').html($top);
            if($top>=200){
                $('#NewBox').stop(true).animate({
                    top:0
                });
            }else{
                $('#NewBox').stop(true).animate({
                    top:-70
                })
            }
        });

    }
    suspended();
}(jQuery);

!(function($){
    // .step加减数量
    $('.quantity-add').on('click', function() {
        let $count = $('#cart-item-quanlity').val();
        $count++;
        $('#cart-item-quanlity').val($count);
        $('.buytips').css('visibility','hidden');
    });
    
    
    $('.quantity-down').on('click', function() {
        let $count = $('#cart-item-quanlity').val();
        $count--;
        if ($count < 1) {
            $count = 1;
        }
        $('#cart-item-quanlity').val($count);
        $('.buytips').css('visibility','hidden');

    });
    
    
    $('#cart-item-quanlity').on('input', function() {
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $('.buytips').css('visibility','hidden');

    }); 
})(jQuery);
