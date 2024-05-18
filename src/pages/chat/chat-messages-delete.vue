<template>
    <v-container fluid>
        <v-table>
        <thead>
            <tr>
            <th class="text-left">类型</th>
            <th class="text-left">回复</th>
            <th class="text-left">删除</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in replies" :key="item.id">
            <td>{{ item.type }}</td>
            <td>{{ item.reply }}</td>
            <td><v-btn @click="submit(item.id)" class="text-none text-subtitle-1" color="#5865f2" block>删除</v-btn></td>
            </tr>
        </tbody>
        </v-table>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useChatStore } from '@/stores/chats.store'
  import { storeToRefs } from 'pinia'
  
  const chatStore = useChatStore()
  const { replies } = storeToRefs(chatStore)
  const hasDeleted = ref(false)
  
  onMounted(async () => {
    await chatStore.getReplies()
  })

const submit = async (id: number) => {
  // http请求：添加进json文件的数组里
  await chatStore.deleteReply({id})
  hasDeleted.value = true
}
  </script>
  