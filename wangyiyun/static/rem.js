//设置页面自动适配当前宽度，字体自动放大缩小。

function remSize(){
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth; //获取设备宽度

    if(deviceWidth >= 750){
        deviceWidth = 750;
    }
    if(deviceWidth <= 320){
        deviceWidth = 320;
    }
//设置文档字体暂时不懂
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    document.querySelector('body').style.fontSize = '0.3rem';
}
remSize();
//当窗口发生变化时调用
window.onresize = function(){
    remSize();
}