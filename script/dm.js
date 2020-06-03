
// 1. 购物车部分的显示控制

$('#head_car').hover(function() {
    // div bg
    $(this).css('background', '#FBFEE9');
    // 购物车字体
    $('.head_car_text').css('color', '#FF6700');
    // 窗体
    $('#car_content').css('width', '300px').animate({
        height: '100px'
    }, 500).finish();
}, function() {
    $(this).css('background', '#424242');
    $('.head_car_text').css('color', '#B0B0B0');
    $('#car_content').css('width', '300px').animate({
        height: '0px'
    }, 500);
});

// 2. 导航栏的显示控制
$('.menu_li').hover(function() {
    var $that = $(this);
    // 导航栏字体颜色
    $that.css('color', '#FF6700');
    // hover时，对应的下部菜单
    $('#' + $that.attr('control')).show();
    // 下部菜单的高度需要设定，缺省时0，无法显示
    $('#menu_content_bg').css('border', '1px solid #D0D0D0')
        .height(230);
}, function() {
    var $that = $(this);
    // 复原颜色
    $that.css('color', '#424242');
    $('#' + $that.attr('control')).hide();
    $('#menu_content_bg').height(0)
        .css('border', '0px solid #D0D0D0');
});

// 3. 搜索框获得/失去焦点的显示控制
$(function() {
    var $input = $('#find_input');
    var $wrap = $('#find_wrap');
    var $btn = $('#find_but');

    $input.focus(function() {
        $wrap.css('border', '1px solid #FF6700');
        $btn.css('border-left', '1px solid #FF6700');
    });

    $input.blur(function() {
        $wrap.css('border', '1px solid #F0F0F0');
        $btn.css('border-left', '1px solid #F0F0F0');
    });
});

// 4. 搜索按钮背景颜色显示控制
$('#find_but').hover(function() {
    $(this).css({
        background: '#FF6700',
        color: '#FFFFFF'
    });
}, function() {
    $(this).css({
        background: '#FFFFFF',
        color: '#424242'
    });
});

// 5. 菜单栏的显示控制
$('#banner_menu_wrap>li').hover(function() {
    var $that = $(this);

    $that.css('background', '#FF6700');
    $that.find('div.banner_menu_content').css('border', '1px solid #F0F0F0').show();
}, function() {
    var $that = $(this);

    $that.css('background', 'none');
    $that.find('div.banner_menu_content').css('border', '0px solid #F0F0F0').hide();
});

// 6. 轮播显示控制
$(function() {
    // 自动轮播
    var i = 0;
    var $big_banner_pic = $('#big_banner_pic');
    var picCount = $big_banner_pic.find('li').length;

    function pic_change() {
        var img_i = i * (-1226) + 'px';

        $big_banner_pic.stop(true).animate({ opacity: '0.2' }, 150, function() {
            $big_banner_pic.css('left', img_i);
            $big_banner_pic.stop(true).animate({ opacity: '1' }, 150);
        });
    }

    function loop_i() {
        i += 1;
        //        i = i % picCount;
        if (i >= picCount) {
            i = 0;
        }

        pic_change();
    }

    var change_self_time = setInterval(loop_i, 2500);

    // hover，手动，停止轮播
    var $big_banner_change_wrap = $('#big_banner_change_wrap');
    $big_banner_change_wrap.hover(function() {
        clearInterval(change_self_time);
        $big_banner_change_wrap.find('div').show();
    }, function() {
        change_self_time = setInterval(loop_i, 2500);
        $big_banner_change_wrap.find('div').hide();
    });

    // 相应点击
    $('#big_banner_change_prev').click(function() {
        i += 1;
        if (i >= picCount) {
            i = 0;
        }

        pic_change();
    });

    $('#big_banner_change_next').click(function() {
        i -= 1;
        if (i <= 0) {
            i = picCount - 1;
        }

        pic_change();
    });
});

// 7. 明星单品显示控制
var $lis = $('#head_hot_goods_content li');
$lis.eq(0).css('border-color', '#FF6700');
$lis.eq(1).css('border-color', '#ADFF22');
$lis.eq(2).css('border-color', '#698326');
$lis.eq(3).css('border-color', '#C53729');
$lis.eq(4).css('border-color', '#13B85F');
$lis.eq(5).css('border-color', '#FF6700');
$lis.eq(6).css('border-color', '#ADFF22');
$lis.eq(7).css('border-color', '#698326');
$lis.eq(8).css('border-color', '#C53729');
$lis.eq(9).css('border-color', '#13B85F');

// 8. 明星单品的左右滑动控制
$(function() {
    var currentPos = 0;
    var maxPos = 0;

    function makePosString(pos) {
        return (pos * 988) + 'px';
    }

    var $swipper = $('.swiper-wrapper');

    $('#head_hot_goods_prave').click(function() {
        currentPos--;
        console.log(currentPos);

        if (currentPos * (-1) > maxPos - 1) {
            maxPos++;
            //            console.log(maxPos);
            // $.getJSON('./data/data.json', function(json) {
            //     //                console.log(json);

            //     $swipper.width(maxPos * 988);
            //     $(json['items']).each(function() {
            //         var $li = $('<li></li>');

            //         $li.append('<a><img src="' + this['img'] + '"></a>');
            //         $li.append('<a>' + this['title'] + '</a>');
            //         $li.append('<a>' + this['comment'] + '</a>');

            //         $swipper.append($li);
            //     });
            // });
            // 
        }
        $swipper.stop(true).animate({
            left: makePosString(currentPos)
        }, 450);
    });

    $('#head_hot_goods_next').click(function() {
        currentPos++;
        console.log(currentPos);
        if (currentPos > 0) {
            currentPos = 0;
        }

        $swipper.stop(true).animate({
            left: makePosString(currentPos)
        }, 450);
    });

    $('#head_hot_goods_change>span').hover(function() {
        $(this).css('color', '#FF6700');
    }, function() {
        $(this).css('color', '#BEBEBE');
    });
});

// 9. 底部产品的显示控制
$('li.floor_goods_wrap_li').hover(function() {
    $(this).css({
        'top': '-5px',
        'box-shadow': '0px 15px 35px rgba(0,0,0,0.2)'
    });
}, function() {
    $(this).css({
        'top': '0',
        'box-shadow': 'none'
    });
});

// 10. 底部400电话显示控制
$('.foot_bottom_r>span').hover(function() {
    $(this).css({
        'background': '#FF6700',
        'color': '#FFFFFF'
    });
}, function() {
    $(this).css({
        'background': 'none',
        'color': '#FF6700'
    });
});

