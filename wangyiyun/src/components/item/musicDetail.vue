<template>
    <div class="musicDetail">
            <img :src="musicItem.al.picUrl" alt="" class="detailBg"/>
            <div class="detailTop">
                <div class="detailTopLeft">
                    <svg class="icon" aria-hidden="true" @click="exitDetail">
                        <use xlink:href="#icon-xiangxia" ></use>
                    </svg>
                    <div class="detailTopName">
                        <p>{{musicItem.name}}</p>
                        <span class="arrrr" v-for="item in musicItem.ar" :key="item">{{item.name}}<span v-if="item.name!=musicItem.ar[musicItem.ar.length-1].name">/</span></span>
                        <span class="guanzhu">关注</span>
                        
                    </div>
                </div>
                <div class="detailTopright">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fenxiang_o"></use>
                    </svg>
                </div>
            </div>
            <div class="detailCon" v-show="!isLyricShow">
                <img src="../../assets/needle-ab.png" alt="" class="imgNeedle" :class="{imgNeedleActive:!isbtnShow}" />
                <img src="../../assets/cd.png" alt="" class="imgCd" />
                <img :src="musicItem.al.picUrl" alt="" class="imgAl" :class="{imgAlActive:!isbtnShow,imgAlPaused:isbtnShow}" @click="isLyricShow=true">
            </div>
            <div class="detailFooter">
                <!--进度条之上-->
                <div class="footerTop">
                    <svg class="icon dianzan" aria-hidden="true">
                        <use xlink:href="#icon-dianzan"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiazai"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jianyi"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youcecaidan"></use>
                    </svg>
                </div>
                <!--进度条-->
                <div class="footerCon">
                    <input type="range" class="process" min="0" :max="duration" step="0.05" v-model="currentTime">
                </div>
                <!--进度条以下-->
                <div class="footerPlus">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang-xunhuanbofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="turnMusic(-1)">
                        <use xlink:href="#icon-shangyishoushangyige"></use>
                    </svg>
                    
                    <svg class="icon bofang" aria-hidden="true" @click="play" v-if="isbtnShow">
                        <use xlink:href="#icon-bofang_o"></use>
                    </svg>
                    <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
                        <use xlink:href="#icon-zanting_o"></use>
                    </svg>

                    <svg class="icon" aria-hidden="true" @click="turnMusic(1)">
                        <use xlink:href="#icon-xiayigexiayishou"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gf-playlistMusic5"></use>
                    </svg>
                </div>
            </div>

            <!--歌词部分-->
            <div class="lyricPart" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
                <p v-for="item in lyric" :key="item" :class="{lyricActive:((currentTime*1000)>=item.time && (currentTime*1000)<item.pre)}">
                    {{item.lrc}}
                </p>
            </div>
    </div>    
</template>

<script>
import { mapMutations , mapState} from 'vuex';

//currentTime：当前时间，duration：总播放时间，直接获取不到，要在footerMusic页由vuex获取更新.因为是refs.audio里面的.
//顺序：在vuex中创建【元素】和【获取函数】->在可读取到【原本属性】的页面通过...mapMutations拿到【获取函数】->将【原本属性】通过【获取函数】赋值给【元素】，此时vuex里的【元素】和【原本属性】共通了。->原页面通过 :balabala="balabala"、props传递【赋值函数】给要使用该属性的页面->此时使用页面即可使用【赋值函数】->通过...mapState即可获取vuex里的【元素】
//更新：= = 用commit不需要map解构┭┮﹏┭┮

export default{
    data(){
        return{
            isLyricShow:false,
        }
    },
    props: ['musicItem','play','isbtnShow','addDuration'],
    mounted(){
        console.log(this.musicItem ,'这是这首歌的参数');     
        this.addDuration();  
    },
    methods:{
        ...mapMutations(['updateDetailShow','updateplayListIndex']),
        exitDetail:function(){
            this.isLyricShow = false;
            this.$store.commit('updateDetailShow');
        },
        turnMusic:function(num){   //更改上一首、下一首
            let index = this.playListIndex + num;
            if(index < 0){
                index = this.playList.length - 1;
            }else if(index == this.playList.length){
                index = 0;
            };
            this.$store.commit('updateplayListIndex',index);
        }
    },
    computed:{
        ...mapState(['lyricPart','currentTime','playList','playListIndex','duration']),

        lyric:function(){   //分割歌词数据，将字符串按照换行符分割再分别提取时间和每行的歌词
            let arr;
            if(this.lyricPart.lyric){    //歌词为空时不操作
                arr = this.lyricPart.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{  //map返回一个新数组，每个数组元素为一个对象，min、sec这些都是对象的属性
                    let min = item.slice(1,3);
                    let sec = item.slice(4,6);
                    let mill = item.slice(7,10);

                    //将每一句的时间换算成毫秒
                    let time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);

                    let lrc = item.slice(11,item.length);

                    if(isNaN(Number(mill))){
                        mill = item.slice(7,9);
                        lrc = item.slice(10,item.length);
                        time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);
                    }
                    return {min,sec,mill,lrc,time};
                })

                //获取距离任意【当前】时间最近的每个下一句的时间
                arr.forEach((item,i) =>{
                    if(i === arr.length-1 || isNaN(arr[i+1].time)){ //最后一句
                        item.pre = 100000;     //对每个数组元素对象，无则创建该属性，有则覆盖
                    }else{
                        item.pre = arr[i+1].time;
                    }
                })
                console.log(arr,'这是加了pre的新歌词数组');
                return arr;
            }

        }
    },
    watch:{
        currentTime:function(newValue){
            let p = document.querySelector(".lyricActive");
            if(p){
                if(p.offsetTop > 300){
                this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
                }
            }

            //当进度条移至最末尾时播放下一首
            if(newValue === this.duration){
                
                if(this.playListIndex === this.playList.length-1){  //当前已经到达最后一首歌则切换为第一首
                    this.$store.commit('updateplayListIndex',0);
                    this.play();
                }else{
                    this.$store.commit('updateplayListIndex',this.playListIndex+1);
                }
            }
            
        }
    }
}
</script>

<style>
.musicDetail{
    width: 100%;
    height: 100%;
}
.detailBg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(90px);
}
/* 顶部 */
.detailTop{
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;
}
.detailTopLeft{
    display: flex;
    align-items: center;
}
.detailTopName{
    width: 5rem;
    height: 100%;
    margin-left: 0.4rem;
    text-align: center;
    color: rgb(177, 173, 173);
    white-space: nowrap;
}
.detailTopName p{
    width: 100%;
    color: #fff;
    font-size: .4rem;
}
.detailTopName p, .arrrr{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.detailTopName .guanzhu{
    padding: .03rem;
    font-size: .21rem;
    border-radius: 20%;
    background: rgb(128, 127, 127);
}
.detailTop .icon{
    width: .6rem;
    height: .6rem;
}
 
/* 中间 */
.detailCon{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.imgNeedle{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform: rotate(-13deg); /*定义2D旋转，规定角度*/
    transform-origin: 0 0;   /* 相对于x轴和y轴的位置 */
    transition: all 2s;
}
.imgNeedleActive{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform: rotate(5deg); /*定义2D旋转，规定角度*/
    transform-origin: 0 0;   /* 相对于x轴和y轴的位置 */
    transition: all 2s;
}
.imgCd{
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
}

.imgAl{
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rorateAl 10s linear infinite;
}
.imgAlActive{
    animation-play-state: running;
}
.imgAlPaused{
    animation-play-state: paused;
}
@keyframes rorateAl{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}

/* 底部 */
.detailFooter{
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.footerTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.detailFooter .icon{
    width: 0.6rem;
    height: 0.6rem;
    fill: #fff;
}
/* 进度条 */
.process{
    width: 100%;
    height: 0.06rem;
}

.footerPlus{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.detailFooter .bofang{
    width: 1.5rem;
    height: 1.5rem;
}

/* 歌词 */
.lyricPart{
    width: 100%;
    height: 8.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .3rem;
    overflow: scroll;
    
}
.lyricPart p{
    color: rgb(110, 108, 108);
    margin-bottom: .4rem;
    font-size: .33rem;
    text-align: center;
}
.lyricPart .lyricActive{
    color: #fff;
    font-size: .5rem;
}
</style>