<!-- eslint-disable vue/valid-template-root -->
<template></template>
  
  <script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useChatStore } from '@/stores/chats.store';
  const timerId = ref<number | null>(null);

onMounted(() => {
  const chatStore = useChatStore()
  timerId.value = window.setInterval(async () => {
    await chatStore.getReplies();
    console.log('定时器调用成功')
  }, 3000);
});

onUnmounted(() => {
  if (timerId.value) {
    window.clearInterval(timerId.value);
  }
});
  </script>
  