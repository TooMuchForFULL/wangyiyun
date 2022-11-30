import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

import {getMusicLyric} from '../request/api/item.js'
import {loginApi} from '../request/api/home.js'
export default new vuex.Store({
    state:{
        playList:[{//定义播放列表对象
            al:{
                id: 71809380,
                name: "Birthplace",
                pic: 109951164417025550,
                picUrl: "https://p2.music.126.net/ohzfQAxR65LUTePZ2mG2YQ==/109951164417025558.jpg",
                pic_str: "109951164417025558"
            },
            name:"Oh, Round Lake",
            ar:[{
                name:"Novo Amo"
            }],
            id: 479598964,   //指的是这首歌的id，和上面数组的id不同
            
        }],
        playListIndex: 0,  //定义下标，用来读取当前数组
        isbtnShow: true,  //暂停按钮的显示，是全局属性（多个页面要用）
        detailShow:false,   //歌曲详情页的展示
        lyricPart:{},   //歌词部分
        currentTime:0,    //当前播放时间
        duration:0,    //歌曲总时长
        isLogin:false,   //判断是否登录，默认未登录
        isFooterMusic:true,   //是否显示底部组件，暂时不用
        token:"",   //存储登录状态吗，避免重复登录
        user:{},   //用户信息
    },
    mutations:{
        updateIsbtnShow:function (state,value) {   //更改暂停或播放按钮
            state.isbtnShow = value;
        },
        updateplayList:function(state,value){   //更改播放列表
            state.playList = value;
            console.log(state.playList,'这是歌单参数');
        },
        updateplayListIndex:function(state,value){  //更改下标，实现依据下标获取当前播放歌曲
            state.playListIndex = value;
        },
        updateDetailShow:function(state){
            state.detailShow = !state.detailShow;
        },
        updateLyric:function(state,value){   //更改歌词
            state.lyricPart = value;
        },
        updatecurrentTime:function(state,value){
            state.currentTime = value;
            console.log(state.currentTime,'这是当前时间')
        },
        updateduration:function(state,value){
            state.duration = value;
        },
        pushplayList:function(state,value){ //对于搜索结果列表，点击播放机制这里设置为将该首加入当前播放列表的末尾，并播放
            state.playList.push(value);
        },
        updateisLogin:function(state,value){
            state.isLogin = value;
        },
        updatetoken:function(state,value){   //保存登录token值
            state.token = value;
            localStorage.setItem('token',state.token);
        },
        updateuser:function(state,value){  //保存用户信息
            state.user = value;
            console.log(state.user,'保存成功')
        },
    },
    actions:{   //状态为全局都需要获取的
        getLyric:async function(context,value){
            let res = await getMusicLyric(value);
            console.log(res,'这是歌词');
            context.commit("updateLyric",res.data.lrc);
        },
        getlogin:async function(context,data){
            let res = await loginApi(data);
            console.log(res,'实现登录');
            return res;
        }
    }
})