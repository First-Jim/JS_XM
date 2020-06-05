    $('#nav').load("../src/top.html");
    $('#footer').load("../src/footer.html");
    //1.获取地址栏的id
    let id = location.search.substring(1).split('=')[1];
    const spic = document.querySelector('#spic');
    const wrap = document.querySelector('.wrap');
    const spic_img = document.querySelector('#spic img');
    const pname = document.querySelector('.p-name a');
    const loadpcp = document.querySelector('.loadpcp');
    const btn = document.querySelector('.p-btn a');
    const count = document.querySelector('#count');
    const mask = document.querySelector('#mask');
    const max = document.querySelector('#max');


    $ajax({
        url: 'http://localhost/JS_2002/project/php/detail.php',
        data: {
            sid: id
        },
        success: function(data) {
            let objdata = JSON.parse(data);
            wrap.style.backgroundImage = `url(${objdata.url})`;
            spic_img.sid = objdata.sid;
            pname.innerHTML = objdata.title;
            loadpcp.innerHTML = objdata.price;
        }
    });

    //2.进入购物车
    //cookie存储：商品的sid和商品的数量
    //arrsid : 存放商品的sid    [1,3,5,7,9]
    //arrnum : 存放商品的数量    [12,35,67,22,11]
    //点击加入购物车按钮，商品第一次购买，创建商品展示列表，第一次之后再购买，数量累加。

    let arrsid = []; //存放商品的sid
    let arrnum = []; //存放商品的数量


    //先获取cookie才能进行点击次数的判断(第一次，还是第一次之后)
    //提前约定cookie键值(cookiesid/cookienum)
    //cookie.set('cookiesid',arrsid,10);
    //cookie.set('cookienum',arrnum,10);

    //函数将cookie取出，变成数组。
    function cookievalue() {
        if (cookie.get('cookiesid') && cookie.get('cookienum')) {
            arrsid = cookie.get('cookiesid').split(','); //获取的cookie变成数组
            arrnum = cookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    //通过判断确认是否是第一次加入购物车
    btn.onclick = function() {
        //获取当前商品的id
        cookievalue();
        if (arrsid.indexOf(id) !== -1) { //存在，不是第一次
            //arrnum[arrsid.indexOf(id)] //通过id找对应的数量
            //存在的数量+当前新加的数量
            let num = parseInt(arrnum[arrsid.indexOf(id)]) + parseInt(count.value);
            arrnum[arrsid.indexOf(id)] = num;
            cookie.set('cookienum', arrnum, 10);

        } else { //第一次添加商品
            arrsid.push(id);
            let num = parseInt(count.value);
            arrnum.push(num);
            cookie.set('cookiesid', arrsid, 10);
            cookie.set('cookienum', arrnum, 10);
        }
        alert('商品已经加入购物车了');
    }

    wrap.addEventListener('mouseenter', mouseHandler);

    function mouseHandler(e) {
        if (e.type === "mouseenter") {
            mask.style.display = max.style.display = "block"
            this.addEventListener("mouseleave", mouseHandler);
            this.addEventListener("mousemove", mouseHandler);
        } else if (e.type === "mousemove") {
            // 获取min块的相对视口位置，矩形
            move(e.clientX, e.clientY);
        } else if (e.type === "mouseleave") {
            mask.style.display = max.style.display = "none"
            this.removeEventListener("mouseleave", mouseHandler);
            this.removeEventListener("mousemove", mouseHandler);
        }
        // console.log(this);
        // console.log(this.style.backgroundImage.replace("url(", "").replace(")", ""));
        console.log(this.style.backgroundImage); //url("https://img.alicdn.com/bao/uploaded/i1/2275024826/TB2xNbvdxlmpuFjSZPfXXc9iXXa_!!2275024826.jpg_200x200q90.jpg_.webp")
        let src = this.style.backgroundImage.replace("url(", "").replace(")", "")
        max.style.backgroundImage = `url(${src})`;
    }

    function move(mouseX, mouseY) {
        // 返回元素的大小及其相对于视口的位置。
        var rect = wrap.getBoundingClientRect();
        x = mouseX - mask.offsetWidth / 2 - rect.x;
        y = mouseY - mask.offsetHeight / 2 - rect.y;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > wrap.offsetWidth - mask.offsetWidth) x = wrap.offsetWidth - mask.offsetWidth;
        if (y > wrap.offsetHeight - mask.offsetHeight) y = wrap.offsetHeight - mask.offsetHeight;
        mask.style.left = x + "px";
        mask.style.top = y + "px";
        max.style.backgroundPositionX = -x * (max.offsetWidth / mask.offsetWidth) + "px";
        max.style.backgroundPositionY = -y * (max.offsetHeight / mask.offsetHeight) + "px";

    }