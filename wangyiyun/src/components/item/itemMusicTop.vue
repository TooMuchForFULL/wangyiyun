<template>
    <div class="itemMusicTop">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-jiantou_xiangzuo"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
            </svg>
        </div>
        <img :src="playlist.coverImgUrl" alt="" class="bgImg">
    </div>
</template>

<script>
export default{
    props:['playlist']


}
</script>

<style scoped>
.itemMusicTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: .2rem; */
    position: relative;
}
.itemLeft, .itemRight{
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .1rem; 
}
.itemLeft span{
    font-size: .4rem;
    color: #fff;
}
svg,svg>use{
    fill: #fff;
    width: .7rem;
    height: .7rem;
}
.bgImg{
    width: 100%;
    height: 9rem;
    position: absolute;
    z-index: -1;
    filter: blur(15px);
}
</style>