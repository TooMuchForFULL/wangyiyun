import service from "..";

//获取首页轮播图数据
export function getBanner(){
    return service({
        method: 'GET',
        url: '/banner?type=2',
    })
}

//获取发现好歌单
export function getMusicList(){
    return service({
        method:'GET',
        url:'/personalized?limit=10'
    })
}


//搜索页面的搜索功能
export function getSearch(keyword){
    return service({
        method:'GET',
        url:'/cloudsearch?keywords=' + keyword
    })
}

//登录页面的登录功能
export function loginApi(data){
    return service({
        method:'GET',
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}

//获取用户详情
export function getUser(id){
    return service({
        method:'GET',
        url:`/user/detail?uid=${id}`
    })
}