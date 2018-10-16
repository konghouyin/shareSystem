// JavaScript source code


cardMove({
    num: 5,//需要切换的卡片数
    styleName: "style",//卡片对应的class主名---确保class名独立，且按数字序号排列
    direction: [1,1,1,1],//上右下左,1触发，0停止 方向信息
    side: [
        { border: -100, borderSpeed: 50 ,opacity:true , opacitySpeed:500 , end:-500},
        { border: 400, borderSpeed: 50, opacity: true , opacitySpeed:500 , end:700},
        { border: 500, borderSpeed: 40, opacity: true , opacitySpeed:500 , end:800},
        { border: -100, borderSpeed: 50, opacity: true , opacitySpeed:500 , end:-400}
    ],
    style: {
        top: [3.7,2.7,2,1.4,1],//rem布局
        zindex: [10, 9, 8, 7, 6],
        scale:[1,0.96,0.92,0.88,0.84]
    },
    transitionTime: 0.5,
    moveTrue: true,//划出后是否还需要填入队列
    translation2: 2,//加入队列方式，--1：直接出现--2：渐隐出现--3.移动出现
    width:9.5,//输入卡片宽度
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
    change.setAttribute("style", "left:50%;margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[0] + "rem; opacity:1;z-index:" + object.style.zindex[0] + ";transition:none;transform: scale(" + object.style.scale[0] + ", " + object.style.scale[0] + ")");
    for (var i = 2; i <= object.num; i++) {
        var set = document.getElementsByClassName(object.styleName + i)[0];
        set.setAttribute("style", "left:50%;margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[i - 1] + "rem; opacity:1;z-index:" + object.style.zindex[i - 1] + ";transition:all " + object.transitionTime + "s;transform: scale(" + object.style.scale[i - 1] + ", " + object.style.scale[i - 1] + ")");
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

    function _move(e) {
        if (e.touches.length != 1) {
            flag = 1;
            flag1 = 1;
        } else {
            if (flag == 1) {
                flag = 0;
                _start(e);
            }
            
            change.style.marginLeft = "0";
            change.style.left = (e.changedTouches[0].clientX - detX) + "px";
            change.style.top = (e.changedTouches[0].clientY - detY) + "px";

            if (change.offsetLeft > object.side[1].border) {
                _setGo();
                _setOpacity();
            } else if (change.offsetLeft < object.side[3].border) {
                _setGo();
                _setOpacity();
            } else if (change.offsetTop < object.side[0].border) {
                _setGo();
                _setOpacity();
            } else if (change.offsetTop > object.side[2].border) {
                _setGo();
                _setOpacity();
            } else {
                _setBack();
            }
        }
    }
    //触摸中

    function _end(e) {
        if (e.targetTouches.length == 0 && flag1 == 0) {
            if (change.offsetLeft > object.side[1].border && object.direction[1] == 1) {
                _moveto(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 1);
            } else if (change.offsetLeft < object.side[3].border && object.direction[3] == 1) {
                _moveto(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 3);
            } else if (change.offsetTop < object.side[0].border && object.direction[0] == 1) {
                _moveto(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 0);
            } else if (change.offsetTop > object.side[2].border && object.direction[2] == 1) {
                _moveto(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 2)
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
            set.style.top = object.style.top[i - 2] + "rem";
            set.style.transform ="scale(" + object.style.scale[i-2] + ", " + object.style.scale[i-2] + ")"
        }
    }
    //后方卡片向下移动

    function _setBack() {
        for (var i = 2; i <= object.num; i++) {
            var set = document.getElementsByClassName(object.styleName + i)[0];
            set.style.top = object.style.top[i - 1] + "rem";
            set.style.transform = "scale(" + object.style.scale[i - 1] + ", " + object.style.scale[i - 1] + ")"
        }
    }
    //后方卡片向上移动

    function _setOpacity() {
        if (change.offsetLeft > object.side[1].border && object.side[1].opacity == true) {
            change.style.opacity = (1 - ((change.offsetLeft - object.side[1].border) / object.side[1].opacitySpeed)) + "";
        } else if (change.offsetLeft < object.side[3].border && object.side[3].opacity == true) {
            change.style.opacity = (1 - ((object.side[3].border - change.offsetLeft) / object.side[3].opacitySpeed)) + "";
        } else if (change.offsetTop < object.side[0].border && object.side[0].opacity == true) {
            change.style.opacity = (1 - ((object.side[0].border - change.offsetTop) / object.side[0].opacitySpeed)) + "";
        } else if (change.offsetTop > object.side[2].border && object.side[2].opacity == true) {
            change.style.opacity = (1 - ((change.offsetTop - object.side[2].border) / object.side[2].opacitySpeed)) + "";
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
            set.setAttribute("style", "left:50%;margin-left:-" + (object.width / 2) + "rem;top:" + object.style.top[object.num - 1] + "rem; opacity:1;z-index:" + object.style.zindex[object.num - 1] + ";transition:all " + object.transitionTime + "s;transform: scale(" + object.style.scale[object.num - 1] + ", " + object.style.scale[object.num - 1] + ")");
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

    function _moveto(endX, endY, way) {
        var stepX = (endX - startX) / object.side[way].borderSpeed;
        var stepY = (endY - startY) / object.side[way].borderSpeed;
        var min = 17;
        if ((stepX > -10 && stepX < 10)|| (stepY > -10 && stepY < 10))  {
            var stepX = (endX - startX) / min;
            var stepY = (endY - startY) / min; 
           
        }
        if (way == 1 || way == 2) {
            var timer = setInterval(function () {
                if (change.offsetLeft > object.side[1].end || change.offsetTop > object.side[2].end) {
                    clearInterval(timer);
                    _lastMain();
                    _event();
                } else {
                    change.style.left = (change.offsetLeft + stepX) + "px";
                    change.style.top = (change.offsetTop + stepY) + "px";
                    _setOpacity();
                }
            }, 8);
        }
        else {
            var timer = setInterval(function () {
                if (change.offsetTop < object.side[0].end || change.offsetLeft < object.side[3].end) {
                    clearInterval(timer);
                    _lastMain();
                    _event();
                } else {
                    change.style.left = (change.offsetLeft + stepX) + "px";
                    change.style.top = (change.offsetTop + stepY) + "px";
                    _setOpacity();
                }
            }, 8);
        }
    }
    //超出border移动

 }


