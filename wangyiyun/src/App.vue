<template>
  <div>
    <router-view/>
    <footer-music />
  </div>
</template>

<script>
import footerMusic from './components/item/footerMusic.vue';
export default {
  name: 'App',
  components:{
    footerMusic
  },

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
       width: .5rem; 
       height: .5rem;
}
a{
  color: black;
}
</style>
