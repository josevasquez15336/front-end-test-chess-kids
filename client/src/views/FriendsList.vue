<template>
<div class="container">

   <h1>FRIENDS</h1>

   <template v-if="pagination.result.length>0">
     <div v-for="(r, index) in pagination.result" :key="index">
     <FriendsPanel
     :name="`${r.firstName} ${r.lastName}`"
     :birthday="r.birthday*1"
     :games="`${r.gamesCount}`"
     :content="r.bio"
     :avatar="r.avatar"
     :id="r.id"
      />
     </div>
   </template>

   <div v-if="filteredData.length>10" class="pagination">
     <button :disabled="pagination.currentPage <= 1"  class="pagination__button"  @click="pagination.prev">
      <span>&#8249;</span> Prev
     </button>

     <div class="pagination__pages">
         <button :class="`${page == pagination.currentPage ? '' : 'disabled'}`" v-for="(page, index) in getPageIndexes(pagination.currentPage, pagination.lastPage) " :key="index" @click="pagination.currentPage=page">
           {{page}}
          </button>
     </div>

     <button :disabled="pagination.currentPage >= pagination.lastPage" class="pagination__button"  @click="pagination.next">
       Next <span>&#8250;</span>
     </button>
   </div>

</div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import FriendsPanel from '../components/FriendPanel.vue'
import { useArrayPagination } from "vue-composable";
import type { Friend } from '../store/state'

export default defineComponent({
  name: 'FirendList',
  components: { FriendsPanel },
  setup()
  {
    const store = useStore()
    const friendsList = computed(() => store.state.friendsList)
    const searchValue = computed(() => store.state.searchInput);

    //filteredData: computed value to filter data based on search input
    const filteredData = computed(()=>{
      if(searchValue.value){
        return friendsList.value.filter((value: Friend) => {
          const searchStr = searchValue.value.toLowerCase();
          const firstNameMatches = value.firstName.toLowerCase().includes(searchStr);
          const lastNameMatches = value.lastName.toLowerCase().includes(searchStr);
          return firstNameMatches || lastNameMatches;
        })
      } else {
       return friendsList.value
      }
    })

    const pagination = ref( useArrayPagination( filteredData.value, { pageSize: 10 }))
      watch(filteredData, () => {
      pagination.value = useArrayPagination( filteredData.value, { pageSize: 10 })
    })

    //range: simple function to get an array of numbers in a specific range that is used to set page indexes
    const range = (size: number, startAt: number = 0):Array<number> => [...Array(size).keys()].map(i => i + startAt);

    //getPageIndexes: function to get current range of pageIndexes
    const getPageIndexes = (currentPage: number , lastPage: number) => {
      let pages = []
      let size = filteredData.value.length < 100 ? Math.round(filteredData.value.length/10) : 10
      let middle = Math.round(size/2)
      let offset = currentPage - middle > 0
      ? currentPage + middle >= lastPage ? lastPage + 1  - size  : currentPage - middle
      : 1
      pages = range( size, offset);
      return pages;
    }

    return {
      pagination,
      filteredData,
      getPageIndexes,
      friendsList
    };
  },
})


</script>
<style lang="scss" scoped>
@import "../style/utilities";

h1 {
 @include heading-font;
 text-align: left;
}
.pagination{
  @include rounded;
  margin: 20px 0 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background: transparent;
    font-weight: bold;
    border: none;
    cursor:pointer;
    color: $text-color;
    span {
      margin: 0 4px 0 4px;
      font-size:1.3em;
    }
  }
  button[disabled], .disabled{
    color: $text-color-inactive;
  }
  &__button {
    margin: 12px;
  }
  &__pages{
    display: block;
  }
}

@include sm {
  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .pagination{
  margin:0;
  &__pages{
    display: none;
  }
}

}
</style>
