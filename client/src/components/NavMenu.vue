<template>
 <div class="wrapper">
  <nav>
  <ul >
    <li @click="router.push('/home')" :class="isActive(path, '/home')" ><Icon :name="'home-tint'"  /><a href="#">Home</a></li>
    <li @click="router.push('/play')" :class="isActive(path, '/play')" ><Icon :name="'play-chess-tint'" /><a href="#">Play</a></li>
    <li @click="router.push('/puzzles')" :class="isActive(path, '/puzzles')" ><Icon :name="'puzzles-tint'" /><a href="#">Puzzles</a></li>
    <li @click="router.push('/learn')" :class="isActive(path, '/learn')" ><Icon :name="'learn-tint'" /><a href="#">Learn</a></li>
    <li @click="router.push('/connect')" :class="isActive(path, '/connect')" ><Icon :name="'friends-tint'" /><a href="#">Connect</a></li>
  </ul>
</nav>
<img  src="../assets/logo.png">
</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'SearchBar',
  components: { Icon },
  setup(){
   const route = useRoute();
   const router = useRouter();
   const path = computed(() =>route.path);
   const isActive = (path:string, id:string) => {
     return path == id ? 'active' : ''
   }

   return {
     path,
     router,
     isActive
   };

}


})
</script>

<style lang="scss" scoped>
@import "../style/utilities";
.active{
 @include active
}
.wrapper{
  position: sticky;
  margin: 0 16px 0 0;
  top: 32px;
  img {
    margin: 12px;
  }
}

nav {
    @include rounded;
    padding: 4px 12px 4px 12px;
    ul {
    list-style-type: none;
    padding:0;
    margin:0;
      li {
        display: flex;
        align-items: center;
        justify-items: start;
        padding: 8px 12px 8px 12px;
        margin: 4px 0 4px 0;
        transition: all 0.2s;
        cursor: pointer;
      }
      li:hover {
        @include active;
      }
      li a {
      text-decoration: none;
      color: white;
      margin-left: 16px;
      }
  }
}

@include sm {

.wrapper{
  position: sticky;
  margin: 0;
  top: 32px;
  img {
    display:none;
  }
}
.active{
  box-shadow: none;
  border-radius: 0;
  background-color:rgba(0,0,0,.2);
}

nav {
    background:$item-background;
    border-radius:0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 64px;
    ul {
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
    height: 64px;
    padding:0;
    margin:0;
      li {
        display: inline;
        padding: 20px;
        margin: 0;
        transition: all 0.2s;
        cursor: pointer;
      }
      li:hover {
          box-shadow: none;
          border-radius: 0;
          background-color:rgba(0,0,0,.2);
      }
      li a {
       display:none;
      }
  }
}



}
</style>
