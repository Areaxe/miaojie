function bannerLunar() {
    var bannerList = document.querySelectorAll('.banner img')
    var bannerNav = document.querySelector('.banner-nav')
    for (var i = 0; i < bannerList.length; i++) {
        var dot = document.createElement('li')
        dot.setAttribute('value', i)
        if (!i) {
            dot.setAttribute('class', 'active')
        }
        dot.onclick = function () {
            changeBanner(parseInt(this.getAttribute('value')), bannerList)
            changeBannerNav(this.getAttribute('value'))
        }
        bannerNav.appendChild(dot)
    }
    bannerNavList = bannerNav.querySelectorAll('li')
    var bannerIndex = 0;
    setInterval(function () {
        if (bannerIndex < bannerList.length - 1) {
            bannerIndex++
        } else if (bannerIndex === bannerList.length - 1) {
            bannerIndex = 0
        }
        changeBanner(bannerIndex, bannerList)
        changeBannerNav(bannerIndex)

    }, 5000)
}
var bannerNavList = '';

function changeBanner(index, domList) {
    for (var i = 0; i < domList.length; i++) {
        domList[i].setAttribute('class', '');
    }
    domList[index].setAttribute('class', 'show');
}
function changeBannerNav(index) {
    for (var i = 0; i < bannerNavList.length; i++) {
        bannerNavList[i].setAttribute('class', '');
    }
    bannerNavList[index].setAttribute('class', 'active');
}