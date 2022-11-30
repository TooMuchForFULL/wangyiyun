<template>
    <div>
      <top-nav></top-nav>
      <swpier-top></swpier-top>
      <icon-list></icon-list>
      <music-list></music-list>
    </div>  
</template>

<script>
import topNav from '@/components/home/TopNav.vue'
import SwpierTop from '@/components/home/SwpierTop.vue'
import iconList from '@/components/home/iconList.vue'
import musicList from '@/components/home/musicList.vue'

export default {
  name: 'home',
  components:{
    topNav,
    SwpierTop,
    iconList,
    musicList  
  }
}
</script>