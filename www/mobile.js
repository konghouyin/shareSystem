var tell = document.getElementsByClassName('i')[0];
var input = document.getElementsByTagName('input');
var button = document.getElementsByClassName('button')[0];
var box = document.getElementsByClassName('baoming')[0];




document.addEventListener("touchmove", function (e) {
    e.preventDefault();
}, false);//禁止页面滑动

button.addEventListener('click', function () {  
    var first = document.getElementsByClassName('first')[0];
    first.style.opacity = "0";
    box.style.display = "block";
    box.style.height = document.body.clientHeight + "px";
    setTimeout(function () {
        var wrap = document.getElementsByClassName('wrap')[0];
        wrap.style.height = "0";
        first.style.display = "none";
    }, 1000)
})
//首屏按钮


var flagys = 0;
tell.addEventListener('click', function () {
    var message = document.getElementsByClassName('message')[0];
    if (flagys == 0) {
        message.setAttribute("style","opacity:1;width:7.5rem;")
        flagys = 1;
    } else {
        message.setAttribute("style", "opacity:0;width:0;")
        flagys = 0;
    }
})
//隐私声明


input[0].addEventListener("keydown", function(){
    input[0].style.borderBottom = "0.05rem solid #aaa";
})
input[1].addEventListener("keydown", function () {
    input[1].style.borderBottom = "0.05rem solid #aaa";
})


input[1].addEventListener('focus', function () {
    var tittle = document.getElementsByClassName('tittle')[1];
    tittle.style.marginTop = "0.9rem";
    tittle.scrollIntoView();
})

input[1].addEventListener('blur', function () {
    var tittle = document.getElementsByClassName('tittle')[1];
    tittle.style.marginTop = "2rem";
})
//文本框事件

var wrap = document.getElementsByClassName('wrap-input')[0];//移动卡片
var baoming = document.getElementsByClassName('button')[1];
var flagBao = 2;//2正常，1输入有误
var flaggo = 0;//ajax节流
var timer1;//loader定时器
var timer2;//position-class
baoming.addEventListener('click', function () {
    var wrong = document.getElementsByClassName('wrong')[0];
    wrong.innerHTML = "";

    if (input[0].value.length != 8) {
        input[0].style.borderBottom = "0.05rem solid #f40";
        wrong.innerHTML += "学号输入有误  ";
        flagBao = 1;
    }
    if (input[1].value.length == 0) {
        input[1].style.borderBottom = "0.05rem solid #f40";
        wrong.innerHTML += "  请输入密码";
        flagBao = 1;
    }
    if (flagBao == 2 && flaggo == 0 ) {
        flaggo = 1;
        Ajax({
            url: "http://47.95.207.40:8088/signup/user/register", //请求地址
            type: 'post',   //请求方式
            data: "username="+input[0].value+"&password="+input[1].value , //请求json参数
            async: true,   //是否异步
        });

        wrap.classList.add('boxshadow');
        timer2 = setTimeout(function () { wrap.classList.add('position'); },1300)
        timer1 = setTimeout(function () {
            var load = document.getElementsByClassName("loader")[0];
            var text = document.getElementsByClassName("text")[0];
            load.style.display = "block";
            text.style.display = "block";
        }, 1600)
    } else {
        flagBao = 2;
    }
})
//报名按钮

var timeLast = 0;//前端超时设置

function Ajax(object) {
    timeLast = 0;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            timeLast = 1;
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                var person = JSON.parse(xhr.response);
                if (person.code == 0) {
                    var message = document.getElementById("wing");
                    message.innerHTML = "报名成功";
                    var success = document.getElementsByClassName('ticket')[0];
                    success.style.display = "block";
                    setTimeout(function () {
                        var back = document.getElementsByClassName('wrap-baoming')[0];
                        back.style.opacity = "0";
                        success.children[0].style.opacity = "1";
                    }, 200)
                    setTimeout(function () {
                        reset();
                        success.children[1].style.opacity = "1";
                    }, 800)
                    setTimeout(function () {
                        success.children[2].style.opacity = "1";
                    }, 1600)
                } else if (person.code == -4){
                    var message = document.getElementById("wing");
                    message.innerHTML = "已报名";
                    var success = document.getElementsByClassName('ticket')[0];
                    success.style.display = "block";
                    setTimeout(function() {
                        var back = document.getElementsByClassName('wrap-baoming')[0];
                        back.style.opacity = "0";
                        success.children[0].style.opacity = "1";
                    }, 200)
                    setTimeout(function() {
                        reset();
                        success.children[1].style.opacity = "1";
                    }, 800)
                    setTimeout(function() {
                        success.children[2].style.opacity = "1";
                    }, 1600)
               
                } else if (person.code == -2) {
                    wrong("学号或密码错误");
                    
                } else if (person.code == -3) {
                    wrong("网络错误");
                }
            } else {
                wrong("网络错误");
            }
            flaggo = 0;
        }
    };



    function reset() {
        //对话框移动回来+清空
        wrap.style.transition = "none";
        clearTimeout(timer2);
        wrap.classList.remove('position');
        wrap.classList.remove('boxshadow');
        var load = document.getElementsByClassName("loader")[0];
        var text = document.getElementsByClassName("text")[0];
        console.log(load);
        clearTimeout(timer1);
        load.style.display = "none";
        text.style.display = "none";
        input[0].value = "";
        input[1].value = "";
        setTimeout(function () {
            wrap.style.transition = "all 1s";
        }, 100)
    }
    //输入框复位函数
    function wrong(message) {
        var wrong = document.getElementsByClassName('wrong')[1];
        wrong.style.display = "block";

        setTimeout(function () {
            wrong.children[0].children[1].innerHTML = message;
            var back = document.getElementsByClassName('wrap-baoming')[0];
            back.style.opacity = "0";
            wrong.children[0].style.opacity = "1";
            wrong.children[0].style.top = "5rem";
        }, 200)
        setTimeout(function () {
            reset();
            wrong.children[0].children[0].style.opacity = "1";
            wrong.children[0].children[0].style.transform = "scale3d(1,1,1)";

        }, 400)
    }


    setTimeout(function () {
        if (timeLast == 0) {
            xhr.onreadystatechange = null;
            var wrong = document.getElementsByClassName('wrong')[1];
            wrong.style.display = "block";
            setTimeout(function (message) {
                wrong.children[0].children[1].innerHTML = "网络错误";
                var back = document.getElementsByClassName('wrap-baoming')[0];
                back.style.opacity = "0";
                wrong.children[0].style.opacity = "1";
                wrong.children[0].style.top = "5rem";
            }, 200)
            setTimeout(function () {
                reset();
                wrong.children[0].children[0].style.opacity = "1";
                wrong.children[0].children[0].style.transform = "scale3d(1,1,1)";

            }, 1000)
            flaggo = 0;
        }
    }, 6000);


    console.log(object.type == 'post', object);
    if (object.type == 'get') {
        xhr.open("get", object.url + "?" + message, object.async);
        xhr.send(null);
    } else if (object.type == 'post') {
        xhr.open("post", object.url, object.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(object.data);
    }
}



var back = document.getElementById('back');
back.addEventListener('click', function () {
    var success = document.getElementsByClassName('ticket')[0];
    success.style.display = "none";
    var back = document.getElementsByClassName('wrap-baoming')[0];
    back.style.opacity = "1";
    success.children[0].style.opacity = "0";
    success.children[1].style.opacity = "0";
    success.children[2].style.opacity = "0";

})

var back1 = document.getElementById('back1');
back1.addEventListener('click', function () {
    var wrong = document.getElementsByClassName('wrong')[1];
    wrong.style.display = "none";
    var back = document.getElementsByClassName('wrap-baoming')[0];
    back.style.opacity = "1";
    wrong.children[0].style.opacity = "0";
    wrong.children[0].style.top = "-15rem";
    wrong.children[0].children[0].style.opacity = "0";
    wrong.children[0].children[0].style.transform = "scale3d(3,3,3)";
})