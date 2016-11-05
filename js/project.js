window.onload = function onload(e) {
    var topMenuList = document.querySelectorAll('.menu li')
    Array.prototype.map.call(topMenuList, function (v, i) { //给头部导航添加点击事件
        v.onclick = function () {
            currentIndex = i;
            changeContent(i)
        }
    })

    setHeight() //初始化每个模块的高度
    createMenuLi(maxIndex)  //根据模块数量创建右边按钮导航个数
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', function () { setTimeout(changeIndex(), 1000) }, false);    //添加鼠标滚动监听
    }//W3C
    window.onmousewheel = document.onmousewheel = function () { setTimeout(changeIndex(), 1000) };//IE/Opera/Chrome/Safari
    bannerLunar()   //banner循环播放
    initOpenArea()
}

window.onresize = function () {
    setHeight()
}
function setHeight() {
    var indexDiv = document.querySelectorAll('#container .index-div')
    maxIndex = indexDiv.length
    windowsHeight = getWindowsHeight()
    for (var i = 0; i < maxIndex; i++) {
        indexDiv[i].style.height = windowsHeight + 'px'
    }
}
var currentIndex = 0    //记录当前index
var maxIndex = 0
var windowsHeight = 0
var leader = 0
var open = true
var changeIndex = function (e) {
    e = e || window.event;
    e.stopPropagation()
    if (open) {
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta >= 120) { //当滑轮向上滚动时
                if (currentIndex) {
                    currentIndex -= 1;
                }
            }
            if (e.wheelDelta <= -120) { //当滑轮向下滚动时
                if (currentIndex < maxIndex - 1) {
                    currentIndex += 1;
                }
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail >= 120) { //当滑轮向上滚动时
                if (currentIndex) {
                    currentIndex -= 1;
                }
            }
            if (e.detail <= -120) { //当滑轮向下滚动时
                if (currentIndex < maxIndex - 1) {
                    currentIndex += 1;
                }
            }
        }
    }
    changeContent(currentIndex)
}

function createMenuLi(length) {
    var MenuElm = document.querySelector('.right-nav')
    for (var i = 0; i < length; i++) {
        var dot = document.createElement('li')
        dot.setAttribute('value', i)
        dot.onclick = function () {
            let index = this.getAttribute('value')
            currentIndex = parseInt(index)
            changeContent(index)
        }

        if (!i) {
            dot.setAttribute('class', 'on');
        }
        MenuElm.appendChild(dot)
    }
}
//头部焦点移动
var changeTopIndex = function (index) {
    var topMenuList = document.querySelectorAll('.menu li')
    for (var i = 0; i < topMenuList.length; i++) {
        topMenuList[i].setAttribute('class', '')
    }
    topMenuList[index].setAttribute('class', 'active')
}

//右边导航滚动
var changeRightIndex = function (index) {
    var rightMenuList = document.querySelectorAll('.right-nav li')
    for (var i = 0; i < rightMenuList.length; i++) {
        rightMenuList[i].setAttribute('class', '')
    }
    rightMenuList[index].setAttribute('class', 'on')
}
//修改当前展示的内容
var changeContent = function (currentIndex) {
    var container = document.querySelector('#container')
    var target = -currentIndex * windowsHeight
    if (open) {
        changeTopIndex(currentIndex)
        changeRightIndex(currentIndex)
        var timer = null
        clearInterval(timer)
        timer = setInterval(function () {
            open = false
            if (parseInt(leader - target) !== 0) {
                leader = leader + (target - leader) * 0.07;
                container.style.marginTop = leader + "px";
            } else {
                clearInterval(timer)
                open = true
            }
        }, 10)
    }

}
var getWindowsHeight = function () {
    return document.documentElement.clientHeight
}