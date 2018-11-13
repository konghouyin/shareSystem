var button = document.getElementsByClassName("button");
var input = document.getElementsByTagName('input');
var show = document.getElementsByClassName('message')[0];
var wrap = document.getElementsByClassName('wrapper')[0];


var flag = 1;
button[0].addEventListener('click', function () {
    if (flag == 0) {
        return;
    }
    if (input[0].value.length == 8 && input[1].value != "" && input[2].value != "" && input[3].value != "") {
        for (var i = 0; i < 4; i++) {
            show.children[i + 1].innerHTML += input[i].value;
        }
        wrap.style.opacity = "0";
        show.classList.remove("small");
    } else {
        alert("输入格式有误！")
    }
    flag = 0;
})



button[1].addEventListener('click', function () {
    if (flag == 1) {
        return;
    }
    wrap.style.opacity = "1";
    show.classList.add("small");
    flag = 1;

    for (var i = 0; i < 4; i++) {
        show.children[i + 1].innerHTML = (show.children[i + 1].innerHTML.split('：'))[0] + "：";
    }

})


button[2].addEventListener('click', function () {
    show.style.display = "none";
    var load = document.getElementsByClassName('loading')[0];
    load.style.display = "block";
    for (var i = 0; i < 4; i++) {
        show.children[i + 1].innerHTML = (show.children[i + 1].innerHTML.split('：'))[0] + "：";
    }
    Ajax({
        url: "https://join.xiyoumobile.com/signup/user/add", //请求地址
        type: 'post',   //请求方式
        data: "sid=" + input[0].value + "&name=" + encodeURIComponent(input[1].value)+ "&clazz=" + encodeURIComponent(input[2].value)+ "&sex=" + encodeURIComponent(input[3].value), //请求json参数
        async: true,   //是否异步
    });


})

function Ajax(object) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                var ob = JSON.parse(xhr.response);
                if (ob.code == 0) {
                    alert("报名成功！")
                } else {
                    alert("错误"+ob.message);
                }
                wrap.style.opacity = "1";
                show.classList.add("small");
                show.style.display = "block";
                var load = document.getElementsByClassName('loading')[0];
                load.style.display = "none";
            } else {
                alert("报名失败,网络错误")
                wrap.style.opacity = "1";
                show.classList.add("small");
                show.style.display = "block";
                var load = document.getElementsByClassName('loading')[0];
                load.style.display = "none";
            }
            flag = 1;
            for (var i = 0; i < 4; i++) {
                input[i].value = "";
            }
        }
    })

    if (object.type == "get") {
        xhr.open("get", object.url + "?" + message, object.async);
        xhr.send(null);
    } else if (object.type == "post") {
        console.log(object);
        xhr.open("POST", object.url, object.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("authorization", "Basic eGl5b3UzZzp4aXlvdTNnZnoxNTUqKi8v");
        xhr.send(object.data);


        //xhr.open("POST", "https://join.xiyoumobile.com/signup/user/add",true);
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //xhr.setRequestHeader("authorization", "Basic eGl5b3UzZzp4aXlvdTNnZnoxNTUqKi8v");

        xhr.send(object.data);

    }
}



//"sid=04152062&name=%E5%BC%A0%E9%98%B3%E9%98%B3&clazz=%E7%BD%91%E7%BB%9C1502&sex=%E5%A5%B3"
//sid: 04152062
//name: 张阳阳
//clazz: 网络1502
//sex: 女