<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-caidan"></use>
            </svg>
        </div>
        
        <div class="topContent">
            <span @click="$router.push('/userPage')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>

        <div class="topRight">
            <!-- <router-link :to="{path:'/search'}">
                <svg class="icon" aria-hidden="true">
                    
                    <use xlink:href="#icon-sousuo"></use>
                
                </svg>
            </router-link>
            <router-view></router-view> -->
            
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
        

    </div>
    
  </template>

<style>
/* scoped使style中的样式只作用于当前的界面 */
  .topNav{
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;/* 平均分布 */
    align-items: center;
  }
  .topContent{
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;/* 平均分布，两边留空 */
    font-size: .36rem;
}
.active{
    font-weight: 900;
}
</style>