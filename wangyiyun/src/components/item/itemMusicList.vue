<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang_o"></use>
                </svg>
                <span>播放全部 
                    <span>({{realplayList.length}})
                    </span>
                </span>
            </div>
            <div class="topRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item,index) in realplayList" :key="index">
                <div class="itemLeft" @click="playMusic(index)">
                    <span class="itemIndex">{{index + 1}}</span>
                    <div class="itemName">
                        <p class="musicName">{{item.name}}</p>
                        <div class="bottomName">
                            <p class="allAuthor" v-for="(au,i) in item.ar" :key="i">{{au.name}}
                                <span v-if="i!= item.ar.length-1">/</span>
                            </p>
                            <span class="kong"> - </span>
                            <p class="alName">{{item.al.name}}</p>
                        </div>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
                        <use xlink:href="#icon-shipinbofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youcecaidan"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default{
        props:['realplayList'],
        methods:{
            playMusic:function(i){
                this.$store.commit("updateplayList",this.realplayList);
                this.$store.commit('updateplayListIndex',i)
            }
        },
        ...mapMutations(['updateplayList','updateplayListIndex']),
}
</script>

<style scoped>
.itemMusicList{
    width: 100%;
    padding: .2rem 0.1rem;
    border-radius: 0.4rem 0.4rem 0 0 ;
    background: #fff;
}
.itemListTop{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: .1rem;
}
.topLeft,.topRight{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.topLeft{
    width: 40%;
    font-size: .4rem;  
    font-weight: 900;
} 
.topLeft span:first-child{
    font-size: .3rem;
    font-weight: 500;
}
.topRight{
    width: 20%;
}

.itemList{
    width: 100%;
}
.itemList .item{
    display: flex;
    justify-content: space-between;
    height: 1.1rem;
}
.itemLeft{
    width: 85%;
    height: 100%;
    display: flex;
    justify-content: left;
}
.itemIndex{
    width: 11%;
    height: 100%;
    font-size: .35rem;
    line-height: 1.1rem;
    text-align: center;
}
.itemName{
    width: 5.6rem;
    display: flex;
    flex-direction: column;
    padding-left: 0.1rem;
}
.musicName{
    padding-top: .1rem;
    padding-bottom: .05rem;
    font-weight: 600;
    font-size: .35rem;   
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.bottomName{
    width: 5.5rem;
    display: flex;
    white-space: nowrap;
    justify-content: left;
    align-items: center;
}
.alName{ 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.itemRight{
    padding-top: 0.3rem;
}
.kong{
    padding: 0 0.1rem;
}
</style>