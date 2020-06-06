"use strtic";

//加载公共文件

$('#nav').load("../src/top.html");
$('#footer').load("../src/footer.html");
$('#home').load("../src/home.html");

//获取商品列表容器
const goods = document.querySelector('.goods');
const floor_goods_wrap = document.querySelector('.floor_goods_wrap');
const main_show_box = document.querySelector('#main_show_box');
const cart_one_title = document.querySelector('#cart_one_title');

const lis = document.querySelector('.goods li');
const search = document.querySelector("#nav #find_input");
// console.log(search);
const searchResult = document.querySelector("#find_wrap ul");
const hours = document.querySelector('.countdown #hours');
const minu = document.querySelector('.countdown #minus');
const seconds = document.querySelector('.countdown #seconds');
// $ajax({
//     url: 'http://localhost/JS_2002/xiaomi/php/alldata.php',
//     success: function(data) {
//         // console.log(JSON.parse(data));
//         let obj = JSON.parse(data);
//         for (let value of obj) {
//             // console.log(value);
//             goods.insertAdjacentHTML("beforeend", `
//             <li class="floor_goods_wrap_li">
//             <a class="floor_goods_img" ><img src="${value.goods_small_logo}"></a>
//             <a class="floor_goods_tit">${value.goods_name}</a>
//             <a class="floor_goods_txt">${value.goods_number}</a>
//             <a class="floor_goods_price">${value.goods_price}</a>
//             <a href="detail.html?sid=${value.goods_id}"></a>
//             </li>
//             `);
//         }
//     }
// });



// 按属性进行分类
function groupBy(objArray, prop) {
    return objArray.reduce(function(acc, obj) {
        var key = obj[prop];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}


//渲染首页数据
$.ajax({
    url: 'http://localhost/JS_2002/xiaomi/php/alldata.php',
    dataType: 'json'
}).done(function(data) {
    // console.log(data);
    var result = groupBy(data, 'cat_one_id');

    console.log(result);


    let arr = [];

    let obj = {};
    $.each(result, function(attr, objarr) {

        // console.log(attr, objarr);

        arr.push(attr);

        // console.log(arr[attr.length]);
        // $('.cart_one_id').html(arr[attr.length]);
        // for (let i = 0; i < attr.length; i++) {
        //     console.log(attr);
        // }
        console.log(arr.length);
        let str = `

               <div id="floor_1">
            <div id="floor_head">
                <span class="title_span cart_one_id">
                   ${attr}
                </span>
            </div>
        </div>

     `


        cart_one_title.innerHTML = str;
        // floor_goods_wrap.insertAdjacentHTML("beforeend", `


        //     `);
        $.each(objarr, function(i, item) {
            obj = item;


            let goodsList = goods.insertAdjacentHTML("beforeend", `
              <li class="floor_goods_wrap_li">
              <a class="floor_goods_img" ><img src="${obj.goods_small_logo}"></a>
              <a class="floor_goods_tit">${obj.goods_name}</a>
              <a class="floor_goods_txt">${obj.goods_number}</a>
              <a class="floor_goods_price">${obj.goods_price}</a>
           <a href="detail.html?sid=${obj.goods_id}"></a>
           </li>

                `)

        });


    });

    console.log(arr);
    //    for (let i = 0; i < arr.length; i++) {

    //     floor_goods_wrap.insertAdjacentHTML("beforebegin", `
    //           <div id="floor_1">
    //                <div id="floor_head">
    //                    <span class="title_span cart_one_id">${arr[i]}</span>
    //                </div>
    //            </div>

    //        `)
    // }
})

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
        let future = new Date("2020/06/09 21:30:00");
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