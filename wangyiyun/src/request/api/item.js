import service from '..';
//获取歌单详情页的数据
export function getMusicItemList(id){
    return service({
        method: 'GET',
        url: '/playlist/detail?id=' + id
    })
}

//获取所有歌曲
export function getAllMusicList(id){
    return service({
        method: 'GET',
        url: '/playlist/track/all?id=' + id + '&limit=20&offset=0'
    })
}

//获取歌词
export function getMusicLyric(id){
    return service({
        method: 'GET',
        url: '/lyric?id=' + id
    })
}