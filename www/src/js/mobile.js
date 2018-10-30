// JavaScript source code
var page = 0;

cardMove({
    num: 7,//需要切换的卡片数
    styleName: "style",//卡片对应的class主名---确保class名独立，且按数字序号排列
    direction: [1,1,1,1],//上右下左,1触发，0停止 方向信息
    side: [
        { border: -50, borderSpeed: 30 ,opacity:true , opacitySpeed:800 , end:-500},
        { border: 400, borderSpeed: 30, opacity: true , opacitySpeed:500 , end:800},
        { border: 500, borderSpeed: 30, opacity: true , opacitySpeed:500 , end:800},
        { border: -100, borderSpeed: 30, opacity: true , opacitySpeed:500 , end:-500}
    ],
    style: {
        top: [2.7, 2.4, 2.2, 2, 1.9, 1.8, 1.7],//rem布局
        zindex: [10, 9, 8, 7, 6, 5, 4],
        scale:[1,1,1,1,1,1,1]
    },
    transitionTime: 0.5,
    moveTrue: true,//划出后是否还需要填入队列
    translation2: 2,//加入队列方式，--1：直接出现--2：渐隐出现--3.移动出现
    width: 9.5,//输入卡片宽度
    animation: function (i) {
        var div1 = document.getElementsByClassName('circle')[i-1];
        div1.classList.add("animation_down");
        var div2 = document.getElementsByClassName('pic1')[i - 1];
        div2.classList.add("animation_logo");
        var div3 = document.getElementsByClassName('pic2')[i - 1];
        div3.classList.add("animation_top");
        var div = document.getElementsByTagName('h3')[i - 1];
        div.classList.add("animation_up");
        setTimeout(function () {
            div1.classList.add("animation_shake3");
            div2.classList.add("animation_shake1");
            div3.classList.add("animation_shake2");
        }, 2300)
    },
    remove: function (i) {
        var div1 = document.getElementsByClassName('circle')[i - 1];
        div1.classList.remove("animation_down");
        var div2 = document.getElementsByClassName('pic1')[i - 1];
        div2.classList.remove("animation_logo");
        var div3 = document.getElementsByClassName('pic2')[i - 1];
        div3.classList.remove("animation_top");
        var div = document.getElementsByTagName('h3')[i - 1];
        div.classList.remove("animation_up");
        setTimeout(function () {
            div1.classList.remove("animation_shake3");
            div2.classList.remove("animation_shake1");
            div3.classList.remove("animation_shake2");
        }, 2300)
    }
    //ps：项目需设置rem布局,添加绝对定位,设置class名为主名加数字（1-n）,设置卡片样式
    //_moveto函数设置移动低速限制
});

function cardMove(object) {
    document.addEventListener("touchmove", function (e) {
        e.preventDefault();
    }, { passive: false, capture: false });
    //禁止页面滑动
    var flag = 0,flag1 = 0;
    var detX, detY;
    var startX, startY;

    var change = document.getElementsByClassName(object.styleName + '1')[0];
    change.setAttribute("style", "margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[0] + "rem;left:50%; opacity:1;z-index:" + object.style.zindex[0] + ";transition:none;transform: scale(" + object.style.scale[0] + ", " + object.style.scale[0] + ")");
    for (var i = 2; i <= object.num; i++) {
        var set = document.getElementsByClassName(object.styleName + i)[0];
        set.setAttribute("style", "margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[i - 1] + "rem;left:50%; opacity:1;z-index:" + object.style.zindex[i - 1] + ";transition:all " + object.transitionTime + "s;transform: scale(" + object.style.scale[i - 1] + ", " + object.style.scale[i - 1] + ")");
    }
    //dom初始化   

    function _start(e) {
        change.style.transition = "none";
        for (var i = 2; i <= object.num; i++) {
            var set = document.getElementsByClassName(object.styleName + i)[0];
            set.style.transition = "all " + object.transitionTime + "s";
        }
        detX = e.changedTouches[0].clientX - change.offsetLeft;
        detY = e.changedTouches[0].clientY - change.offsetTop;
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
    }
    //触摸开始
    var pok=0;//一半
    function _move(e) {
        if (pok == 0) {
            pok ++;
            return;
        }
        if (e.touches.length != 1) {
            flag = 1;
            flag1 = 1;
        } else {
            if (flag == 1) {
                flag = 0;
                _start(e);
            }

            change.setAttribute("style", "left:" + (e.changedTouches[0].clientX - detX) + "px;margin-left:0;top:"+ object.style.top[0] +"rem;opacity:1;z-index:" + object.style.zindex[0]+1 + ";transition:none;transform: scale(" + object.style.scale[0] + ", " + object.style.scale[0] + ")");

            if (change.offsetLeft > object.side[1].border) {
                _setGo();
                _setOpacity();
            } else if (change.offsetLeft < object.side[3].border) {
                _setGo();
                _setOpacity();
            }else {
                _setBack();
            }
        }
        pok = 0;
    }
    //触摸中

    function _end(e) {

        var x = e.changedTouches[0].clientX;

        if (e.targetTouches.length == 0 && flag1 == 0) {
            if (change.offsetLeft > object.side[1].border && object.direction[1] == 1) {
                _moveto(x, 1);
            } else if (change.offsetLeft < object.side[3].border && object.direction[3] == 1) {
                _moveto(x, 3);
            } else {
                change.setAttribute("style", "left:50%;margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[0] + "rem; opacity:1;z-index:" + object.style.zindex[0] + ";transition:all " + object.transitionTime + "s");
                _setBack();
            }
        } else if (e.targetTouches.length == 0){
            change.setAttribute("style", "left:50%;margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[0] + "rem; opacity:1;z-index:" + object.style.zindex[0] + ";transition:all " + object.transitionTime + "s");
            _setBack();
            flag1 = 0;
        }
    }
    //触摸脱离

    change.addEventListener('touchstart', _start, { passive: false });
    change.addEventListener('touchmove', _move, { passive: false });
    change.addEventListener('touchend', _end, { passive: false });
    //添加事件

    function _setGo() {
        for (var i = 2; i <= object.num; i++) {
            var set = document.getElementsByClassName(object.styleName + i)[0];
            set.setAttribute("style", "margin-left: -4.75rem; top: " + object.style.top[i - 2] + "rem; left:50%; opacity: 1; z-index: " + object.style.zindex[i - 2] + "; transition: all 0.5s ease 0s; transform:scale(" + object.style.scale[i - 2] + ", " + object.style.scale[i - 2] + ")");
        }
    }
    //后方卡片向下移动

    function _setBack() {
        for (var i = 2; i <= object.num; i++) {
            var set = document.getElementsByClassName(object.styleName + i)[0];
            set.setAttribute("style", "margin-left: -4.75rem; top: " + object.style.top[i - 1] + "rem; left:50%; opacity: 1; z-index: " + object.style.zindex[i - 1] + "; transition: all 0.5s ease 0s; transform:scale(" + object.style.scale[i - 1] + ", " + object.style.scale[i - 1] + ")");
        }
    }
    //后方卡片向上移动

        function _setOpacity() {


        if (change.offsetLeft > object.side[1].border && object.side[1].opacity == true) {
            change.style.opacity = (1 - ((change.offsetLeft - object.side[1].border) / object.side[1].opacitySpeed)) + "";
        } else if (change.offsetLeft < object.side[3].border && object.side[3].opacity == true) {
            change.style.opacity = (1 - ((object.side[3].border - change.offsetLeft) / object.side[3].opacitySpeed)) + "";
        } 
    }
    //设置透明度（移除border后）

    function _lastAdd() {
        for (var i = 1; i <= object.num; i++) {
            var set = document.getElementsByClassName(object.styleName + i)[0];
            set.style.zIndex = object.style.zindex[i-1] + "";
        }
        if (object.moveTrue == true) {
            set = document.getElementsByClassName(object.styleName + object.num)[0];
            set.setAttribute("style", "left:50%;margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[object.num - 1] + "rem ; opacity:1;z-index:" + object.style.zindex[object.num - 1] + ";transition:all " + object.transitionTime + "s;transform: scale(" + object.style.scale[object.num - 1] + ", " + object.style.scale[object.num - 1] + ")");
            if (object.translation2 == 1) {
                set.style.transition = "none";
            } else if (object.translation2 == 2) {
                set.style.transition = "opacity "+object.transitionTime + "s";
            }
        }
    }
    //后移卡片限制

    function _lastMain() {
        var set1 = document.getElementsByClassName(object.styleName + 1)[0];
        for (var i = 2; i <= object.num; i++) {
            var set = document.getElementsByClassName(object.styleName + i)[0];
            set.classList.remove(object.styleName + (i));
            set.classList.add(object.styleName + (i - 1));
        }
        set1.classList.remove(object.styleName + 1);
        set1.classList.add(object.styleName + object.num);
        _lastAdd();        
    }
    //class类名递增

    function _event() {
        change.removeEventListener('touchstart', _start, {passive:false});
        change.removeEventListener('touchmove', _move, { passive: false });
        change.removeEventListener('touchend', _end, { passive: false } )

        change = document.getElementsByClassName(object.styleName + '1')[0];

        change.addEventListener('touchstart', _start,{ passive: false });
        change.addEventListener('touchmove', _move, { passive: false });
        change.addEventListener('touchend', _end, { passive: false });

    }
    //事件解除与绑定

    function _moveto(endX, way) {
        var stepX = (endX - startX) / object.side[way].borderSpeed;

        if (way == 1) {
            var timer = setInterval(function () {
                if (change.offsetLeft > object.side[1].end) {
                    clearInterval(timer);
                    _lastMain();
                    _event();
                } else {
                    change.setAttribute("style", "left:" + (change.offsetLeft + stepX) + "px;margin-left:0;top:" + object.style.top[0] +  "rem;opacity:1;z-index:" + object.style.zindex[0] + 1 + ";transition:none;transform: scale(" + object.style.scale[0] + ", " + object.style.scale[0] + ")");
                    _setOpacity();
                }
            },4);
        }
        else {
            var timer = setInterval(function () {
                if (change.offsetLeft < object.side[3].end) {
                    clearInterval(timer);
                    _lastMain();
                    _event();
                } else {
                    change.setAttribute("style", "left:" + (change.offsetLeft + stepX) + "px;margin-left:0;top:" +  object.style.top[0]  + "rem;opacity:1;z-index:" + object.style.zindex[0] + 1 + ";transition:none;transform: scale(" + object.style.scale[0] + ", " + object.style.scale[0] + ")");
                    _setOpacity();
                }
            }, 4);
        }
        page++;
        if (page % 7 != 0 && page % 7 != (object.num-1)) {
            object.animation(page%7);
        }
        if (page % 7 != 1 && page % 7 != 0) {
            object.remove(page % 7 - 1);
        }

    }
    //超出border移动

 }

var point = document.getElementsByClassName('tranform');
for (var i = 0; i < point.length; i++) {
    (function (i) {
        point[i].addEventListener('click', function () {
            var letter = document.getElementsByClassName('letter')[i];
            var div = document.getElementsByClassName('main')[i];
            letter.addEventListener('click', function () {
                div.classList.remove('clear');
                letter.classList.remove("letter2");
            }, {once:true})
            div.classList.add('clear');
            letter.classList.add("letter2");

        },true)
    })(i);
}

