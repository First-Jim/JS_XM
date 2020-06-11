

//0.加载公共文件
$('#footer').load("../src/footer.html");

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
    // // 2. 导航栏的显示控制
    // $('.menu_li').hover(function() {
        
    //     // console.log
    //     var $that = $(this);
    //     // 导航栏字体颜色
    //     $that.css('color', '#FF6700');
    //     // hover时，对应的下部菜单
    //     $('#' + $that.attr('control')).show();
    //     // 下部菜单的高度需要设定，缺省时0，无法显示
    //     $('#menu_content_bg').css('border', '1px solid #D0D0D0')
    //         .height(230);
    // }, function() {
    //     var $that = $(this);
    //     // 复原颜色
    //     $that.css('color', '#424242');
    //     $('#' + $that.attr('control')).hide();
    //     $('#menu_content_bg').height(0)
    //         .css('border', '0px solid #D0D0D0');
    // });

});

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
    // 1.获取元素
    const $banner = $("#big_banner_pic_wrap");
    const $change_wrap = $("#big_banner_change_wrap");
    const $ulPic = $("#big_banner_pic")
    const $liPic = $("#big_banner_pic_wrap ul").children();
    const $liBtn = $("#big_banner_pic_wrap ol").children();
    const $leftArrow = $("#big_banner_change_prev");
    const $rightArrow = $("#big_banner_change_next");
    let $index = 0;
    let $timer = null;

     // 克隆第一个图片加在最后，达到无缝轮播
     $cloneLi = $liPic.first().clone(true, true);
    // 获取第一张图片的宽度
    $liPicWidth = $liPic.eq(0).width();
    // console.log($liPicWidth);
    $ulPic.append($cloneLi).css({
        // 获取整个图片容器ul的宽度
        width: $ulPic.children().length * $liPicWidth
    });
    console.log($ulPic.width());//4500 


    //2.点击下面切换按钮，求出当前位置索引
    $liBtn.on('click', function() {
        // 这里的-1是为了后面index++时下标从0开始
        $index = $(this).index() -1;
        picPos();
    });
    //3.显示左右按钮
    //当鼠标移入图片区域，清除定时器,移除时，开启定时器
    $change_wrap.hover(function() {
        console.log($banner.width());
        $leftArrow.show();
        $rightArrow.show();
        clearInterval($timer);
    }, function() {
        $leftArrow.hide();
        $rightArrow.hide();
        $timer = setInterval(() => {
            picPos();
        }, 3000)
    });

    //4.切换左右按钮
    //左箭头
    $rightArrow.on('click', function() {
        picPos();
    });

    // 右箭头
    $leftArrow.on('click', function() {
        $index -= 2;
        picPos();
    });
    //封装一个左右点击
    function picPos() {
        $index++;
        // 点击的是右箭头
        if ($index === $liBtn.length + 1) {
            $ulPic.css({
                left: 0
            });
            $index = 1;
        }
        // 点击的是左箭头
        if ($index === -1) {
            $ulPic.css({
                left: -$liBtn.length * $liPicWidth
            });

            $index = $liBtn.length - 1;
        }
        // 5.将图片的切换和小圆点的背景切换同步
        //给小圆点添加样式
        if ($index === $liBtn.length) {
            console.log($liBtn.eq(0));
            $liBtn.eq(0).addClass('active').siblings('ol li').removeClass('active');
        } else {
            $liBtn.eq($index).addClass('active').siblings('ol li').removeClass('active');
        }
        //点击下面的小圆点
        $ulPic.stop(true).animate({
            left: -$index * $liPicWidth
        });
    }


    // 6.自动轮播
    $timer = setInterval(() => {
        picPos();
    }, 2000)

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

let obj1 = null;
$.ajax({
    url: 'http://10.31.162.52/JS_2002/xiaomi/php/alldata.php',
    dataType: 'json'
}).done(function(data) {
    // console.log(data);
    // 商品种类
    var result = groupBy(data, 'cat_one_id');
    console.log(result);
    // console.log(result['内衣配饰']);
     obj1 = result['手机相机'];
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


})


   
// 8. 小米闪购的左右滑动控制

$(function() {
    

    let currentPos = 0;
    //当前已有数据
    let maxPos = 1;
   
    //每次移动的距离
    function makePosString(pos) {
        return (pos * 988) + 'px';
    }
    let $swipper = $('.swiper-wrapper');
    //左边按钮
    $('#head_hot_goods_prave').click(function() {
        var $that = $(this);
        currentPos--;
        // 动态添加数据
        console.log(currentPos*(-1),maxPos-1);
        if (currentPos*(-1)  >= maxPos-1) {
            maxPos++;
            $swipper.width(maxPos * 988);

            //渲染商品
            $.each(obj1,function(index,value){
                // console.log(index); 
                swiperitem.insertAdjacentHTML("afterbegin", `
                    <li>
                        <a><img src="${value.goods_small_logo}" ></a>
                        <a>${value.goods_price}</a>
                        <a>${value.goods_name}</a>
                    </li>

                `)
                //判断当数据全部展示完全，就禁用左边的按钮
                let maxleft = parseInt($swipper.css("left"))*(-1);

                // console.log(maxleft);
                if(maxleft > 12000){
                    // $that.off('click');
                    $that.css({
                        'pointer-events':'none',
                        'background':'#fff'
                    })
                }
            });
            // //添加懒加载
            // $(function () {
            //     $("img.lazy").lazyload({ effect: "fadeIn" });
            // });   

        }  

        $swipper.stop(true).animate({
            left: (makePosString(currentPos))
        }, 450);
        });

        //右边按钮
        $('#head_hot_goods_next').click(function() {
            // 设置左边按钮可点击
          $('#head_hot_goods_prave').css({
            'pointer-events':'auto',
          })
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

// 回到顶部
(function(){
    let btn = $('.home-tool-bar a:last-child');
    btn.on('click',function(){
      $('html,body').animate({
        scrollTop:0
      },800)
    });
})();



