!function($){
    $('#topnav').load('../src/top.html',function(){
        //0.根据本地存储，显示用户信息
        if (localStorage.getItem('username')) {
            $('.login').css('visibility','hidden');
            $('.topbar-info').css('visibility','visible');
            $('.topbar-info .name').html(localStorage.getItem('username'));
        }else{
            $('.topbar-info').hide();
        }
    
        $('.exit_login').on('click', function () {
            $('.login').css('visibility','visible');
            $('.topbar-info').css('visibility','hidden');
            localStorage.removeItem('username');
            header('location:http://10.31.162.52/JS_2002/xiaomi/src/index.html');
        });
    });
    //获取商品列表容器
    $goods = $('.floor_goods_wrap');
    $lis = $('.goods li');
    $search = $("#find_input");

    let array_default = [];//排序前的数组
    let array = [];//排序后的数据
    let prev = null;//上一页
    let next = null;//下一页

    $.ajax({
        url: 'http://10.31.162.52/JS_2002/xiaomi/php/listdata.php',
        dataType:'json'
    }).done(function(data){
        let $strhtml = "<ul>";
        $.each(data,function(index,value){
            // console.log(value);
            $strhtml += `
                
            <li class="floor_goods_wrap_li">
            <a class="floor_goods_img" ><img class='lazy' data-original="${value.goods_small_logo}" width="200" height="200"></a>
            <a class="floor_goods_tit">${value.goods_name}</a>
            <a class="floor_goods_txt">${value.goods_number}</a>
            <a class="floor_goods_price">${value.goods_price}</a>
            <a  href="detail.html?sid=${value.goods_id}" target='_blank'></a>
        </li>

        `;
        });
        $strhtml += '</ul>';
        $goods.html($strhtml);


      //添加懒加载
      $(function () {
        $("img.lazy").lazyload({ effect: "fadeIn" });
    });

    array_default = [];//排序前的数组
    array = [];//排序后的数据
    prev = null;//上一页
    next = null;//下一页
    
    //将页面的li元素加载到两个数组中
    $goods.find('li').each(function (index, element) {
        array[index] = $(this);
        array_default[index] = $(this);
    });

});

    // 分页效果
    $('.page').pagination({
        pageCount:7,//总页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback:function(api){
            // console.log(api.getCurrent());
        $.ajax({
            url: 'http://10.31.162.52/JS_2002/xiaomi/php/listdata.php',
            data:{
                page: api.getCurrent()
            },
            dataType:'json'
        }).done(function(data){
            let $strhtml = "<ul>"
            $.each(data,function(index,value){
                // console.log(value);
                $strhtml += `
                    
                <li class="floor_goods_wrap_li">
                <a class="floor_goods_img" ><img class='lazy' data-original="${value.goods_small_logo}" width="200" height="200"></a>
                <a class="floor_goods_tit">${value.goods_name}</a>
                <a class="floor_goods_txt">${value.goods_number}</a>
                <a class="floor_goods_price">${value.goods_price}</a>
                <a href="detail.html?sid=${value.goods_id}"></a>
                </li>

                `;
            });
            $strhtml += '</ul>';
            $goods.html($strhtml);
            
        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
            array_default = [];//排序前的数组
            array = [];//排序后的数据
            prev = null;//上一页
            next = null;//下一页
            
            //将页面的li元素加载到两个数组中
            $('.floor_goods_wrap li').each(function (index, element) {
                array[index] = $(this);
                array_default[index] = $(this);
            });

        });
        }
    })

    //给排序按钮添加样式
    $('#floor_head span').hover(function(){
        $(this).addClass('active');
    },function(){
        $(this).removeClass('active');
    })
    // 默认排序
    $('span').eq(0).on('click',function(){
        $.each(array_default,function(index,value){
            console.log(value);
            $('.floor_goods_wrap ul').append(value);
            return;
        });
    })

    //点击价格进行升序排序
    $('span').eq(3).on('click',function(){
        //采用冒泡排序，对价格进行排序
        for(let i=0;i<array.length-1;i++){
            for(let j=0;j<array.length -1 -i;j++){
                prev = parseFloat(array[j].find('.floor_goods_price').html());
                next = parseFloat(array[j+1].find('.floor_goods_price').html());
                if(prev>next){
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
        //清空原来的数据，将排序后的元素插进去
        $.each(array,function(index,value){
            $('.floor_goods_wrap ul').append(value);
        })
    })

    
    //点击销量进行将序排序
    $('span').eq(2).on('click',function(){
        //采用冒泡排序，对价格进行排序
        for(let i=0;i<array.length-1;i++){
            for(let j=0;j<array.length -1 -i;j++){
                prev = parseFloat(array[j].find('.floor_goods_txt').html());
                next = parseFloat(array[j+1].find('.floor_goods_txt').html());
                if(prev<next){
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
        //清空原来的数据，将排序后的元素插进去
        $.each(array,function(index,value){
            $('.floor_goods_wrap ul').append(value);
        })
    })
    

}(jQuery);