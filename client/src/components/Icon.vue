
<template>
<div
  class="inline-block"
  :style="`width: ${size}; height: ${size}; min-width: ${size}; max-width: ${size};`">
  <svg
    class="transition"
    fill="currentColor"
    viewBox="0 0 32 32"
    :aria-label="`icon-${name}`"
    role="img"
    v-html="getIcon(name)"
    >

  </svg>
</div>
</template>
<script  lang="ts">
//Icon component is a base component that takes an icon map to dynamically reference svg paths.
import { iconsMap } from '../utils/iconsMap'
import type { Icons } from '../utils/iconsMap'
import { PropType } from "vue";

export default {
  name: 'SocialIcons',
  props: {
    name:{
      type: String as PropType<Icons>,
      default: "puzzles-tint"
    },
    size:{
      type: String,
      default: "1.5rem"
    },
  },
  setup(){
    const getIcon = (iconName:Icons) => iconsMap[iconName]

    return {
         getIcon
       }

  }
}


</script>
