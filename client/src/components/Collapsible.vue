<template id="collapsible">
  <div class="collapsible" :style="mystyle">
    <div ref="content"><div class="wrapper"><slot></slot></div></div>
  </div>
</template>

<script lang="ts">
//Collapsible component is a component that takes a slot to handle its expand at any time.
import { defineComponent, ref, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'Collapsible',
    props: {
    open: {
      type: Boolean,
      default: false
    }},
    setup(props){
      const mystyle = ref<any>({ height: 0 })
      const content = ref<any>(null)
      const applyState = () => {
       mystyle.value.height = props.open ? content.value.clientHeight + 'px' : 0
      }

      onMounted(() => {
        applyState()
      })

      watch( () => props.open, () => {
      applyState()
      })

      return {
        mystyle,
        content
      }
    }

})
</script>
<style scoped>
.collapsible {
  overflow: hidden;
  will-change: height;
  transition: height 0.3s;
  padding: 0;
  margin: 0;
}

.collapsible .wrapper {
  margin: 0;
  padding: 0;
}
</style>
