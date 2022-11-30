<template>
    <div class="loginPage">
        <svg class="icon goback" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-jiantou_xiangzuo"></use>
        </svg>
        <svg class="icon wangyiyun" aria-hidden="true" >
            <use xlink:href="#icon-wangyiyunyinle-"></use>
        </svg>
        <div class="loginCon">
            <input type="phone" name="phone" class="phone"
            placeholder="请输入手机号" v-model="phone" />
            <input type="password" name="password" class="password" placeholder="密码" v-model="password" />
            <button class="btn" @click="login">登录</button>
        </div>
    </div>
</template>

<script>
import {getUser} from '../request/api/home.js'
export default{
    data(){
        return{
            phone:'',
            password:'',
        }
    },
    methods:{
        login:async function(){
            let res = await this.$store.dispatch('getlogin',{phone:this.phone,password:this.password});
            console.log(res,'这是保存过的登陆结果');
            if(res.data.code === 200){   //登陆成功，返回个人主页
                this.$store.commit('updateisLogin',true);
                this.$store.commit('updatetoken',res.data.token);//保存token
                let userdetail = await getUser(res.data.account.id);
                console.log(userdetail,'这是用户信息');
                this.$store.commit('updateuser',userdetail);//保存用户信息

                this.$router.push('/userPage');
            }else{
                alert("账号或密码输入有误，请重新输入。");
                this.password = '';
            }
        }
    },
}
</script>

<style>
.loginPage{
    width: 100%;
    height: 12.8rem;
    background: rgb(219, 56, 56);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.loginPage .goback{
    fill: #fff;
    position: absolute;
    left: 0;
    margin-left: .2rem;
    margin-top: .1rem;
}
.loginPage .wangyiyun{
    width: 6rem;
    height: 5.5rem;
}
.loginCon{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.loginCon input,button{
    border: none;
    background: transparent;
    color: #fff;
    font-size: .5rem;
    text-align: center;
}
.loginCon input{
    margin-bottom: .3rem;
}
.btn{
    width: 70%;
    padding: .1rem .2rem;
    border: 1px solid #fff;
    border-radius: .5rem;
    
}
</style>