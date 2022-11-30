<template>
    <div class="swiperTop">
        <van-swipe :autoplay="3000" >
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>

import axios from 'axios'
import {getBanner } from '@/request/api/home.js'

export default {
     
  data() {
    return {
      images: null,
    };
  },
  async mounted(){
    // axios.get('http://localhost:3000/banner?type=2').then((res)=>{  
    //         this.images = res.data.banners;
    //       });

      let res = await getBanner();
      this.images = res.data.banners;
  }
};

</script>

<style >
.swiperTop .van-swipe{
    width: 100%;
    /* padding: 10px; */
}
.swiperTop .van-swipe__track .van-swipe-item img{ 
    width: 100%;
    height: 3rem;
    overflow: hidden;
}
.van-swipe__indicator--active{
    background: red;
}
</style>