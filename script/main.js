

//0.加载公共文件

$('#nav').load("../src/top.html");
$('#footer').load("../src/footer.html");
$('#home').load("../src/home.html");

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
    // alert('qq');
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

//11.获取商品列表容器
const goods = document.querySelector('.goods');
const item1 = document.querySelector('.item1');
const item2 = document.querySelector('.item2');
const swiperitem = document.querySelector('.swiper-wrapper');
const item3 = document.querySelector('.item3');
const search = document.querySelector("#nav #find_input");
// console.log(search);
const searchResult = document.querySelector("#find_wrap ul");
const hours = document.querySelector('.countdown #hours');
const minu = document.querySelector('.countdown #minus');
const seconds = document.querySelector('.countdown #seconds');

// 按属性进行分类
function groupBy(objArray, prop) {
    return objArray.reduce(function(acc, obj) {
        var key = obj[prop];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, []);
}


$.ajax({
    url: 'http://10.31.162.52/JS_2002/xiaomi/php/alldata.php',
    dataType: 'json'
}).done(function(data) {
    // console.log(data);
    // 商品种类
    var result = groupBy(data, 'cat_one_id');
    console.log(result);
    // console.log(result['内衣配饰']);
    let obj1 = result['手机相机'];
    let obj2 = result['海外购'];
    let obj3 = result['智能设备'];

    $.each(obj1,function(index,value){
        // console.log(value); 
        
        item1.insertAdjacentHTML("beforeend", `
            
        <li class="floor_goods_wrap_li">
        <a class="floor_goods_img" ><img class='lazy' data-original="${value.goods_small_logo}" width="200" height="200"></a>
        <a class="floor_goods_tit">${value.goods_name}</a>
        <a class="floor_goods_txt">${value.goods_number}</a>
        <a class="floor_goods_price">${value.goods_price}</a>
        <a href="detail.html?sid=${value.goods_id}"></a>
     </li>

      `)

    });

    $.each(obj2,function(index,value){
        // console.log(value); 
        
        item2.insertAdjacentHTML("beforeend", `
            
        <li class="floor_goods_wrap_li">
        <a class="floor_goods_img" ><img class='lazy' data-original="${value.goods_small_logo}" width="200" height="200"></a>
        <a class="floor_goods_tit">${value.goods_name}</a>
        <a class="floor_goods_txt">${value.goods_number}</a>
        <a class="floor_goods_price">${value.goods_price}</a>
        <a href="detail.html?sid=${value.goods_id}"></a>
     </li>

      `)

    });
    $.each(obj3,function(index,value){
        // console.log(value); 
        
        item3.insertAdjacentHTML("beforeend", `
            
        <li class="floor_goods_wrap_li">
        <a class="floor_goods_img" ><img class='lazy' data-original="${value.goods_small_logo}" width="200" height="200"></a>
        <a class="floor_goods_tit">${value.goods_name}</a>
        <a class="floor_goods_txt">${value.goods_number}</a>
        <a class="floor_goods_price">${value.goods_price}</a>
        <a href="detail.html?sid=${value.goods_id}"></a>
     </li>

      `)

    });

    //添加懒加载
    $(function () {
        $("img.lazy").lazyload({ effect: "fadeIn" });
    });


    
// 8. 明星单品的左右滑动控制

$(function() {
    var currentPos = 0;
    var maxPos = 15;

    function makePosString(pos) {
        return (pos * 988) + 'px';
    }
    var $swipper = $('.swiper-wrapper');
    //左边
    $('#head_hot_goods_prave').click(function() {
        currentPos--;
        // 动态添加数据
        if (currentPos*(-1)  > maxPos-1) {
            maxPos++;
            $swipper.width(maxPos * 988 + 48);
            $.each(obj1,function(index,value){
                // console.log(value); 
                console.log(value);
                swiperitem.insertAdjacentHTML("beforeend", `
                  
                
                    <li>
                        <a><img src="${value.goods_small_logo}"></a>
                        <a>${value.goods_price}</a>
                        <a>${value.goods_name}</a>
                    </li>
        
              `)
        
            });

        }  

        $swipper.stop(true).animate({
            left: (makePosString(currentPos))
        }, 450);
    });
    //右边
    $('#head_hot_goods_next').click(function() {
        currentPos++;
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




})






// 搜索框
function hehe(data) {
    console.log(data);
    let arr = data.result;
    let strhtml = "";
    for (let value of arr) {
        console.log(value);
        strhtml +=
            '<li><a href="https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=' +
            value[0] +
            '">' +
            value[0] +
            "</a></li>";
    }
    searchResult.innerHTML = strhtml;
}
// search.oninput = function() {
//     searchResult.style.display = 'block';
//     let cs = document.querySelector("#hehe");
//     if (cs) {
//         document.body.removeChild(cs);
//     }
//     let cScript = document.createElement("script");
//     cScript.id = "hehe";
//     cScript.src =
//         "https://suggest.taobao.com/sug?code=utf-8&q=" +
//         this.value +
//         "&_ksTS=1589511383777_273&callback=hehe&k=1&area=c2c&bucketid=14";

//     document.body.appendChild(cScript);
// };
// $("#find_wrap ul").mouseenter(function() {
//     $(this).css('border', '1px solid #333')
//     $('#find_wrap ul li').css('background', '#fff');
//     $('#find_wrap ul li a').css('color', '#776533');
// }).mouseleave(function() {
//     $('#find_wrap ul').css("display", "none")
// });

//倒计时
(function() {
    let timer = setInterval(() => {
        let nowtime = new Date();
        let future = new Date("2020/06/18 21:30:00");
        let timeSum = future.getTime() - nowtime.getTime();
        let day = parseInt(timeSum / 1000 / 60 / 60 / 24);
        let hour = parseInt(timeSum / 1000 / 60 / 60 % 24);
        let minu = parseInt(timeSum / 1000 / 60 % 60);
        let sec = parseInt(timeSum / 1000 % 60);
        let millsec = parseInt(timeSum % 1000);
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        minu = minu < 10 ? "0" + minu : minu;
        sec = sec < 10 ? "0" + sec : sec;
        if (millsec < 10) {
            millsec = "00" + millsec;
        } else if (millsec < 100) {
            millsec = "0" + millsec;
        }
        if (timeSum < 0) {
            clearInterval(timer);
            return;
        }
        hours.innerText = hour;
        minus.innerText = minu;
        seconds.innerText = sec;
    }, 1);
})();