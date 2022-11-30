<template>
    <div class="searchPage">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-jiantou_xiangzuo"></use>
            </svg>
            <input type="text" placeholder=" Maybeshewill" @keydown.enter="gotoSearch" v-model="searchItem">
        </div>
        <div class="searchHistory">
            <p class="lishijilu">历史记录</p>
            <svg class="icon rubbish" aria-hidden="true" @click="delHistory">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
            <span class="everyhistory" v-for="item in history" :key="item" @click="historySearch(item)">{{item}}</span>   
              
        </div>
        <!--搜索结果列表-->
        <div class="searchList">
            <div class="item" v-for="(item,index) in resultList" :key="index">
                <div class="itemLeft" @click="addToPlay(item,index)">
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
import {getSearch} from '../request/api/home.js'
export default{
    data(){
        return{
            history:[],   //保存历史搜索记录
            searchItem:"",       //初始化每个输入内容，并双向绑定
            resultList:[],   //搜索结果列表
        }
    },
    mounted(){
        this.history = JSON.parse(localStorage.getItem('history'))?Array.from(JSON.parse(localStorage.getItem('history'))):[] ;  
        //parse是对象转成字符串，没有push方法会报错，所以要转成数组、
        //另外需要判断，因为清空后这个数据是拿不到的，拿不到就赋为空数组
    },
    methods:{
        gotoSearch:async function(){//每次回车后
            //判断输入内容是否合法
            if(this.searchItem !== ""){   //输入不为空，待完善

                //保存当前输入至数组起始位置
                this.history.unshift(this.searchItem); 

                //先去重：set返回一个无重复元素的类数组，...返回一个序列，[]包裹成一个数组
                this.history = [...new Set(this.history)];   

                //限定数组存储长度
                if(this.history.length > 5){
                    this.history.splice(this.history.length - 1);
                }

                //保存搜索记录至本地
                localStorage.setItem('history',JSON.stringify(this.history));   

                //调用搜索api
                let res = await getSearch(this.searchItem);
                console.log(res,'这是搜索结果');
                this.resultList = res.data.result.songs;

                //清空输入框
                this.searchItem = '';            
            }            
        },
        delHistory:function(){  //清空历史记录
            localStorage.removeItem('history');
            this.history = [];
        },
        historySearch:async function(item){  //点击历史记录也能实现搜索
            let res = await getSearch(item);
            console.log(res,'这是历史搜索结果');
            this.resultList = res.data.result.songs;

        },
        addToPlay:function(item){ //点击该首加入当前播放列表并播放
            // item.al = item.album;
            // item.al.picUrl = item.album.artist.img1v1Url
            this.$store.commit('pushplayList',item);  //用这个好像不用解构(...mapMutations)
            this.$store.commit('updateplayListIndex',this.$store.state.playList.length-1);   //修改下标
        }
    },
    
}
</script>

<style>
.searchPage{
    width: 100%;
    padding: 0 0.2rem;
}
/*搜索框及返回键 */
.searchTop{
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
}
.searchTop .icon{
    width: .7rem;
    height: .7rem;
    fill: black;
}
.searchTop input{
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
}
/*历史记录 */
.searchHistory{
    width: 100%;
    position: relative;
}
.searchHistory .rubbish{
    width: .4rem;
    height: .3rem;
    fill: rgb(130, 127, 127);
    position: absolute;
    right: 0;
    top: 0;
}
.lishijilu{
    font-weight: 700;
    margin-bottom: 0.2rem;
}
.everyhistory{
    height: .7rem;
    padding: .1rem .2rem;
    background: rgb(184, 183, 183);
    border-radius: .4rem;
    margin-bottom: .1rem;
    margin-right: .07rem;
    display:inline-block;   /*解决span重叠问题，变成行内块元素,也可以float: left试试*/
    text-align: center;
}

/*搜索结果列表 */
.searchList{
    width: 100%;
    margin-top: .1rem;
}
.searchList .item{
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
    display: flex;
    padding-top: 0.3rem;
}
.kong{
    padding: 0 0.1rem;
}
</style>