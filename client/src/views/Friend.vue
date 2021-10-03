<template>
<div class="wrapper">
       <div v-if="friend" class="card">
            <button @click="router.push('/home')" class="card__actions">
                <Icon :name="'arrow-left'"/>
            </button>

            <div class="card__text">
                <img :style="`background:${randomColor};`" :src="friend.avatar" alt="">
                <h3>{{`${friend.firstName} ${friend.lastName}`}}</h3>
                <p>Games: {{friend.gamesCount}} | birthday: {{birthdayDate(friend.birthday*1)}} </p>
                <p>
                    {{friend.bio}}
                </p>
             </div>

             <button @click="router.push('/connect')"  class="card__actions">
                <Icon :name="'friends-tint'"/> <p>Connect</p>
             </button>
        </div>
</div>
</template>
<script>

import { defineComponent, computed} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { birthdayDate } from '../utils/dateParse'
import Icon from '../components/Icon.vue'
export default defineComponent({
  components: { Icon },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store  = useStore();
    const id = route.params.id;
    const friend = computed(() => store.getters.getFriend(id));
    const randomColor = computed(() => {
     return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
     });

  return {
    friend,
    randomColor,
    birthdayDate,
    router
  }
  },
})
</script>

<style lang="scss" scoped>
@import "../style/utilities";

h1 {
 @include heading-font;
 text-align: left;
}

.wrapper{
  position: absolute;
  width: 100%;
}

.card {
  @include rounded;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    padding: 30px;
    max-width: 480px;
    margin:32px auto 32px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__actions{
      padding: 8px 24px 8px 24px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border: none;
      margin: auto;
      color: $text-color;
      @include rounded;
      p {
        margin-left: 12px;
      }
   }
   &__actions:hover{
      @include active;
   }
    &__text{
    display: flex;
    flex-direction: column;
    align-items: center;
     img{
      height: 170px;
      border-radius: 50%;
      margin: 20px 0 10px 0;}
      h3{
      font-size: 40px;
      font-weight: 400;
      margin: 0;
      }
      p:nth-of-type(1){
      color:$link-color;
      font-size: 15px;
      margin-top: -5px;
      }
      p:nth-of-type(2){
      margin: 10px;
      width: 90%;
      text-align: center;
      }}
}

@include sm {
  .wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 20px;
  }
  .card {
  @include rounded;
    padding: 12px;
    margin:0;
    &__text{
     img{
      margin-top: 10px;
      height: 10vh;
      border-radius: 50%;
      margin-bottom:10px;}
      }
      h3{
      font-size: 24px;
      margin: 8px 0 8px 0;
      }
      p:nth-of-type(2){
      margin: 20px;
      width: 90%;
      max-height:10vh;
      overflow-y: auto;
      }

}


}
</style>
