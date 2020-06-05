"use strtic";
$('#topnav').load('../src/top.html');
$('#home').load('../src/home.html');
//获取商品列表容器
const goods = document.querySelector('.goods');
const lis = document.querySelector('.goods li');
const search = document.querySelector("#find_input");
const searchResult = document.querySelector("#find_wrap ul");
const hours = document.querySelector('.countdown #hours');
const minu = document.querySelector('.countdown #minus');
const seconds = document.querySelector('.countdown #seconds');

$ajax({
    url: 'http://localhost/JS_2002/xiaomi/php/render.php',
    success: function(data) {
        console.log(JSON.parse(data));
        let obj = JSON.parse(data);
        for (let value of obj) {
            goods.insertAdjacentHTML("beforeend", `
            <li class="floor_goods_wrap_li">
            <a class="floor_goods_img" ><img src="${value.url}"></a>
            <a class="floor_goods_tit">${value.title}</a>
            <a class="floor_goods_txt">${value.sailnumber}</a>
            <a class="floor_goods_price">${value.price}</a>
            <a href="detail.html?sid=${value.sid}"></a>
            </li>
            `);

        }
    }
});