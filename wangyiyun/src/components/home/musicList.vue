<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="130" class="my-swipe" :show-indicators="false">        
                
                <van-swipe-item v-for="item in musicList" :key="item.id">
                   <router-link :to="{path:'/itemMusic',query:{id:item.id}}" >
                        <img :src="item.picUrl" alt="" />
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true" >
                                <use xlink:href="#icon-24gl-play"></use>
                            </svg>
                            {{changeCount(item.playCount)}}
                        </span>
                        <span class="name">{{item.name}}</span>
                    </router-link>
                    </van-swipe-item>
                <router-view></router-view>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import {getMusicList} from '@/request/api/home.js';
import itemMusic from '../../views/itemMusic.vue';

export default {
   data(){
    return {
        musicList:[],
    };
   },
//    async mounted(){
//         let res = await getMusicList();
//         console.log(res);
//         this.musicList = res.data.result;
//    }

    methods:{
        async getMusicData(){
            let res = await getMusicList();
            console.log(res);
            this.musicList = res.data.result;
        },

        changeCount:function(num){
            if(num >= 100000000){
                return (num/100000000).toFixed(1) + '亿';
            }else if(num >= 10000){
                return (num/10000).toFixed(1) + '万';
            }
        }
    },

    mounted(){
        this.getMusicData();
    }
}
</script>


<style scoped>
.musicList{
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
}
    .musicTop{
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    }
    .title{
        font-size: 0.4rem;
        font-weight: 900;
        line-height: 0.4rem;
    }
    .more{
    border: 1px solid #ccc;
    text-align: center;
    line-height: 0.6rem;
    padding: 0 0.2rem;
    border-radius: 0.4rem;
    }

.musicContent {
    width: 100%;
    height: 4rem;
}

.my-swipe{
    height: 85%;  
    position: relative;  
}
.my-swipe img{
    width: 93%;
    height: 2.5rem;
    border-radius: .2rem;
}

.my-swipe .playCount{
    position: absolute;
    top: 0rem;
    right: 0.2rem;
    color: #fff;
    display: flex;
    align-items: center;
    white-space: nowrap;
}
.my-swipe .playCount svg{
    width: .4rem;
    height: .4rem;

}
.my-swipe .name{
    display: block;
    border: 1px solid transparent;
}
</style>