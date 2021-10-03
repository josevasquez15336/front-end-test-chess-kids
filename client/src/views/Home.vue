<template>
  <div class="home">
    <div class="home__nav-menu">
     <NavMenu/>
    </div>
    <div class="home__search-bar">
     <SearchBar/>
    </div>
    <div class="home__child">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName">
          <component class="home__child-view" :is="Component" />
        </transition>
      </router-view>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted, watch, ref, Ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import NavMenu from '../components/NavMenu.vue'
import { useRoute } from 'vue-router'
import { ActionTypes } from '../store/actions'

 import { useStore } from 'vuex'
export default defineComponent({

  component: 'search-bar-search',
  components: { SearchBar, NavMenu },
  name: 'Home',
  setup(){
   const transitionName: Ref<'slide-right' | 'slide-left'> = ref('slide-right')
   const route = useRoute()
   const store = useStore()
   watch(route, () => {
      transitionName.value = transitionName.value === 'slide-left' ? 'slide-right' : 'slide-left'
      window.scrollTo({top: 0, behavior: 'smooth'});
   })
   onMounted(() => {
        store.dispatch(ActionTypes.GetFriends)
   })
   return{ transitionName}

  }
})
</script>
<style  lang="scss" scoped>
@import "../style/utilities";
.home {
  box-sizing: border-box;
  position: absolute;
  display: grid;
  width: 100%;
  height:100%;
  padding: 32px 10% 32px 10%;
  grid-template-columns: 256px auto;
  grid-template-rows: 64px auto ;
  grid-template-areas:
                      " n s "
	                    " n f ";

  &__nav-menu {
    width: 100%;
    height: 100%;
    grid-area: n;
  }
  &__search-bar {
    padding-left: 12px;
    grid-area: s;
  }
  &__child{
    position: relative;
    padding-left: 12px;
    grid-area: f;
  }
  &__child-view{
    transition: all 1s cubic-bezier(.55,0,.1,1) ;
  }
}

 @include sm {
   .home {
  display: grid;
  padding: 0;
  margin: 0;
  grid-template-columns: 1fr;
  grid-template-rows: 146px auto 64px;
  grid-template-areas:
                      " s  "
                      " f "
	                    " n  ";

  &__nav-menu {
    padding: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  &__search-bar {
    padding: 0;
    position: relative;
    grid-area: s;
  }
  &__child{
    padding: 0;
    position: relative;
    grid-area: f;
  }
  &__child-view{
    padding: 20px;
    width: 100%;
    position: absolute;
    transition: all 1s cubic-bezier(.55,0,.1,1) ;
  }
}

  }
.slide-left-enter-from, .slide-right-leave-to {
  position: absolute;
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-to, .slide-right-enter-from {
  position: absolute;
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}

</style>
