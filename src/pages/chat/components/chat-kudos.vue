<template>
  <div>
    <v-btn class="ma-2" color="blue-lighten-2" icon="mdi-thumb-up" variant="text" @click="onPlus"
      >{{ props.kudoCount }}赞</v-btn
    >
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits<{ (e: 'plus'): void }>()
const onPlus = () => {
  emits('plus')
}
const props = withDefaults(defineProps<{ kudoCount: number }>(), { kudoCount: 0 })
</script>
