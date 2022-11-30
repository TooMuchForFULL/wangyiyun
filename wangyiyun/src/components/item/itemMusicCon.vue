<template>
    <div class="itemMusicCon">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
        <span class="playCount">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-24gl-play"></use>
            </svg>
            {{changeCount(playlist.playCount)}}
        </span>
        <div class="imgRight">
            <div class="title">{{playlist.name}}</div>
            <div class="author">
                <img :src="playlist.creator.avatarUrl" alt="" class="authorimg">
                <div>{{playlist.creator.nickname}}</div>
            </div>
            <div class="intro">{{playlist.description}}</div>
        </div>
        <div class="oppation">
            <span>
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-ego-fav"></use>
            </svg>{{changeCount(playlist.subscribedCount)}}
            </span>
            <span>
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jianyi"></use>
            </svg>{{changeCount(playlist.commentCount)}}
            </span>
            <span>
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang_o"></use>
            </svg>{{changeCount(playlist.shareCount)}}
            </span>
            
        </div>
    </div>
</template>

<script>
export default{
    props:['playlist'],

    methods:{
        changeCount:function(num){
            if(num >= 100000000){
                return (num/100000000).toFixed(1) + '亿';
            }else if(num >= 10000){
                return (num/10000).toFixed(1) + '万';
            }else return num;
        },
        //判断是否能读取到数据，空则返回本地数据
        choose:function(props){
            if(props.playlist.creator = ''){
                props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator;
        };
        }
    }

}
</script>

<style>
.itemMusicCon{
    width: 100%;
    height: 4rem;
    padding: .3rem .2rem;
    position: relative;
    color: #fff;
}
.itemMusicCon .bgimg{
    width: 35%;
}
.playCount{
    position: absolute;
    top: 0.3rem;
    left: 0.9rem;
    display: flex;
    align-items: center;
}
.imgRight{
    width: 60%;
    position: absolute;
    top: 0.2rem;
    right: 0.1rem;
}
.title{
    height: 1rem;
    font-weight: 800;
    font-size: .35rem;
    margin: .05rem .3rem .3rem 0;
}
.author{
    display: flex;
    align-items: center;
    margin-top: 0.45rem;
}
.authorimg{
    width: 10%;
    border-radius: .20rem;
    margin-right: 0.1rem;
}
.intro{
    height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0.25rem;
    font-size: 0.3rem;
}
.oppation{
    width: 100%;
    position: absolute;
    bottom: 0.1rem;
    left: 0rem;
    display: flex;
    justify-content: space-around;
    
}
.oppation span{
    display: flex;
    align-items: center;
}
.oppation span svg{
    width: .7rem;
    height: .7rem;
    color: #fff;
    fill: #fff;
}
</style>