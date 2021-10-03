<template>
  <div class="pannel">
    <img @click="router.push({path: `/friend/${id}` })"  :style="`background:${randomColor};`" :src="avatar" alt="Avatar" class="pannel__avatar">
    <div class="pannel__text">
      <h3 @click="router.push({path: `/friend/${id}` })" v-html="highlight"></h3>
      <h5> <b>Birthday:</b> {{birthdayDate(birthday)}}, <b>Games:</b> {{games}}</h5>
      <Collapsible :open="open">
      <p>
        {{content}}
      </p>
      </Collapsible>
    </div>
    <button :class="`${open?'rotate':''}`" @click="toggle" class="pannel__button">
      <Icon :name="'chevron-down'"/>
    </button>
  </div>


</template>

<script lang="ts">
import { defineComponent, ref, computed,Ref} from 'vue'
import { useRouter } from 'vue-router'
import { birthdayDate } from '../utils/dateParse'
import { useStore } from 'vuex'
import Icon from './Icon.vue'

import Collapsible from './Collapsible.vue'

export default defineComponent({
  name: 'FriendPanel',
  components: { Icon, Collapsible },
   props: {
    name:{
      type: String ,
      default: ""
    },
    id:{
      type: Number ,
      default: 0
    },
    avatar:{
      type: String ,
      default: ""
    },
    birthday:{
      type: Number,
      default: ""
    },
     games:{
      type: String,
      default: ""
    },
      content:{
      type: String,
      default: ""
    },
  },
  setup(props){
    const open: Ref<Boolean>  = ref(false)
    const store = useStore()
    const router = useRouter();
    const searchValue = computed(() => store.state.searchInput);
    //highlight: Computed value to match the text and replace name string with a new formatted value to display inner HTML highlighted
    const highlight = computed(() => {
     if(!searchValue.value) {
                    return props.name;
                    }
                    const highlightText = props.name.replace(new RegExp(searchValue.value, "gi"), match => {
                    return '<span style="background: #3498db;">' + match + '</span>'
                    });
                    console.log('higlighted text',highlightText)
                    return highlightText

     });

    const randomColor = computed(() => {
     return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
     });
    const toggle = () => {
      open.value = !open.value
    }
    return {
      open,
      birthdayDate,
      toggle,
      router,
      highlight,
      randomColor
    }
  }
})
</script>

<style lang="scss" scoped>
 @import "../style/utilities";
 .highlightText {
        background: yellow;
    }
.rotate {
  transform: rotate(-180deg);
}
.pannel {
  @include rounded;
  display: flex;
  padding: 24px;
  margin: 12px 0 12px 0;
  flex-direction: row;
  align-items: flex-start;

  &__avatar{
     width: 48px;
     height: 48px;
     border-radius: 6px;
     align-self: flex-start;
     cursor: pointer;
  }

   &__text{
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0 24px 0 24px;
    h3{
      cursor: pointer;
      margin-top: 0;
      margin-bottom: 8px;
      color: $link-color;
    };
     h5{
      margin: 0;
      font-weight: lighter;
      color: rgba(234, 240, 246, 0.8);
      b {
        color: rgba(234, 240, 246, 1);
        font-weight: bold;}
    };
    p{
      color: rgba(234, 240, 246, 0.8);
    };
    h3, h5, p {

     text-align: left;
    }
  }

   &__button{
    cursor: pointer;
    transition: transform 0.3s;
    background: transparent;
    color: #fff;
    border: none;
    align-self: flex-start;
  }

}

@include sm {
  .pannel {
   padding:12px;
   &__text{
     margin-left: 12px;
   }
   &__button{
   display: none;
  }
}
}
</style>
