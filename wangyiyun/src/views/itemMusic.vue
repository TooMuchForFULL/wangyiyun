<template>
    <div class="itemMusic">
        <item-music-top :playlist="playList"/>
        <item-music-con :playlist="playList"/> 
        <item-music-list :realplayList="realplayList"></item-music-list>
    </div>

</template>
<script>
import {getMusicItemList,getAllMusicList} from '@/request/api/item.js'
import itemMusicTop from '@/components/item/itemMusicTop.vue'
import itemMusicCon from '@/components/item/itemMusicCon.vue'
import itemMusicList from '@/components/item/itemMusicList.vue'

export default{
    data(){
        return {
            playList:{} , //歌单详情
            realplayList:[] //歌曲
        };
    },
    async mounted(){
        let id = this.$route.query.id;
        //获取歌单详情
        let res = await getMusicItemList(id);
        this.playList = res.data.playlist;
        //获取歌曲
        let songs = await getAllMusicList(id);
        this.realplayList = songs.data.songs;
    },

    methods:{
        c: function(){
            sessionStorage.setItem('listdetail',JSON.stringify(playlist))
        }
    },
    components:{
        itemMusicTop,
        itemMusicCon,
        itemMusicList,
    }
}
</script>