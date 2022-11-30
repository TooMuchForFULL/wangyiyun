<template>
    <div class="userPage">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-jiantou_xiangzuo"></use>
        </svg>
        <img :src="user.data.profile.backgroundUrl" alt="" class="bgImg">
        <div class="userInter">
            <img :src="user.data.profile.avatarUrl" alt="" class="head">
            <div class="userName">{{user.data.profile.nickname}}</div>
            <div class="data">
                <span class="following">
                    <span>{{user.data.profile.follows}}</span>
                关注</span>
                <span class="fenge">|</span>
                <span class="followed">
                    <span>{{user.data.profile.followeds}}</span>
                粉丝</span>
                <span class="fenge">|</span>
                <span class="level">
                    Lv.
                    <span>{{user.data.level}}</span>
                </span>
            </div>
        </div>
        

    </div>
</template>
<script>
import { mapState } from 'vuex'

export default{

    computed:{
        ...mapState(["user"])  //注意书写格式
    },
    mounted(){
        console.log(this.user,'这是传过去的用户信息');
    },
}
</script>

<style>
.userPage{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .2rem .2rem;
    position: relative;
}
.userPage .icon{
    fill: #fff;
    position: absolute;
    left: 0;
    margin-left: .2rem;
}
.userPage .bgImg{
    width: 100%;  
    height: 6rem;
    z-index: -1;
    position: absolute;
    top: 0;
}
.userInter{
    width: 100%;
    position: absolute;
    top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.userPage .head{
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
}
.userName{
    font-size: .4rem;
    padding: .2rem 0;
}
.userInter .data{
    display: flex;
    width: 60%;
    justify-content: space-around;
    align-items: center;
    color: #999;
}
.fenge{
    color: rgb(232, 227, 227);
}
</style>