<template>
    <div class="footerMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="" class="footerImg">
            <div class="musicNow">
                <p class="musicName">{{playList[playListIndex].name}}</p>
                <span>-</span>
                <p class="auName">{{playList[playListIndex].ar[0].name}}</p>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofang_o"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  @click="play" v-else>
                <use xlink:href="#icon-zanting_o"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlistMusic5"></use>
            </svg>
        </div>

        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>

        <!--点击左侧弹出详情页-->
        <van-popup v-model="detailShow" position="bottom" :style="{ height: '100%',width:'100%' }" >
            <music-detail :musicItem="playList[playListIndex]"  :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration" />
        </van-popup>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import musicDetail from './musicDetail.vue';

export default{

    data:{
        return:{
            interval:0    //定义一个定时器
        }
    },
    computed:{
        ...mapState(["playList","playListIndex","isbtnShow","detailShow"]),      
    },
    mounted(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
        //if(this.$refs.audio.paused) this.updateTime(); //渲染页面的时候也需要调用，
        //if(!this.$refs.audio.paused) clearInterval(this.interval); 

    },
    updated(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
        this.addDuration();
    },
    methods:{
        play:function(){ 
            //获取当前播放状态，判断是否暂停/继续播放
            
            if(this.$refs.audio.paused){   //当前为暂停
                this.$refs.audio.play();
                this.$store.commit('updateIsbtnShow',false);

                this.updateTime();  //播放时开始触发定时器实时更新currentTime

            }else {
                this.$refs.audio.pause();
                this.$store.commit('updateIsbtnShow',true);

                clearInterval(this.interval);//暂停时清除定时器
            }
            
        },

/*   updateTime函数：
用来接收refs里面audio里面的currentTime属性，
传给vuex里的updatecurrentTime，
为了实时更新，使用一个定时器每隔一秒触发一次。
之后由musicDetail调用store.state.currentTime
获取播放时间从而控制歌词展示。
*/
        updateTime:function(){
            this.interval = setInterval(()=>{
                this.$store.commit('updatecurrentTime',this.$refs.audio.currentTime);
                console.log(this.$refs.audio.currentTime,'调用定时器了')
            },1000)
        },

        addDuration:function(){
            this.$store.commit('updateduration',this.$refs.audio.duration);
        },

        ...mapMutations(["updateIsbtnShow","updateDetailShow","updatecurrentTime","updateduration"]),
    },
    watch:{   //监听任意属性，在其发生改变时执行对应代码
        playListIndex:function(){   //点击第一首无反应，已解决，用Watch
            this.$refs.audio.autoplay = true;
            if(this.$refs.audio.paused){   //如果是播放状态就改为播放按钮
                this.$store.commit('updateIsbtnShow',false);
            }
        },
       playList:function(){        //解决的办法：监听当前播放列表，一旦发生改变就设置自动播放
            this.$refs.audio.autoplay = true;
            this.$store.commit('updateIsbtnShow',false);
        },
    
    },
    components:{
        musicDetail,
    }
}
</script>

<style>
.footerMusic{
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    background: #313131;
    display: flex;
    justify-content: space-between;
}
.footerMusic .footerImg{
    width: 15%;
    border-radius: 50%;
}
.footerLeft{
    width: 5rem;
    display: flex;
    align-items: center;
    padding-left: .2rem;
}
.musicNow{
    width: 4.5rem;
    display: flex;
    align-items: center;
    padding-left: .2rem;
}
.musicNow .musicName{
    font-size: .35rem;
    color: #fff;
    padding-right: .2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.musicNow .auName{
    padding-left: .2rem;
    color: #666666;
    padding-top: .05rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.footerRight{
    width: 1.6rem;
    padding-right: .1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footerRight svg{
    fill: #fff;
}
.footerRight svg:nth-of-type(1){
    width: 0.8rem;
    height: 0.8rem;
}

</style>