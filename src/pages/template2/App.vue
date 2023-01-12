<template>
  template2
  <router-view/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const template = computed(()=>{
  return import.meta.env.VITE_TEMPLATE
})
console.log(template.value)
</script>
