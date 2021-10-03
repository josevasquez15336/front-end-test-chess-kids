<template >
<div class="wrapper">
  <img  src="../assets/logo.png">
  <div class="search" v-bind:class="{ loading: isLoading }">
    <button ><Icon :name="'search'"  /></button>
    <div class="search__spinner"><Icon  :name="'spinner'" /></div>
    <input :value="value"   @input="updateValue" placeholder="Filter friends...">
  </div>
</div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Icon from './Icon.vue'
import { useStore } from 'vuex'
import { ActionTypes } from '../store/actions'

export default defineComponent({
  name: 'SearchBar',
  components: {Icon},
  setup()
  {
    const isLoading = ref(false)
    const store = useStore()
    const loading = () => {
      isLoading.value = true
      setTimeout(() => {
      isLoading.value = false
      }, 1500);
    }
    const value = computed(() => store.state.searchInput);
    const updateValue = (e:any) => {
      loading()
      store.dispatch(ActionTypes.UpdateSearchInput, e.target.value)
      }

    return {
      isLoading,
      value,
      updateValue,
      loading,
    }

  },
})
</script>


<style lang="scss" scoped>
@import "../style/utilities";

.wrapper {
  img {
    display: none;
  }
}
.search{
	@include rounded;
  align-items: center;
	display: flex;
	justify-content: space-between;
	padding: 0.5em 0.5em 0.5em 1em;
	transition: all 0.5s;
  &:hover,
	&:focus{
		 background: rgba(0,0,0,.2);
     box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  button,
	input{
  	appearance: none;
		background: transparent;
    margin-left: 0.5em;
		border: 0;
		color: inherit;
		font: inherit;
		outline: 0;
  }
	button{
		cursor: pointer;
		padding: 0 0.25em;
  }
	input{
		flex: 1;
    &::placeholder{
			color: $text-color-inactive;}
  }
	&__spinner {
		animation: spinner 1s infinite linear;
		display: none;
		padding: 0 0.25em;
    }
}
.search.loading{
	button{
		display: none;
  }
  .search__spinner{
		display: block;
  }
}

@include sm {
  .wrapper {
   padding:20px;
  img {
    display: inline-block;
    padding-bottom: 20px;
  }
}
}

@keyframes spinner{
	0%	{ transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
