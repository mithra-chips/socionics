<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">类型</th>
        <th class="text-left">回复</th>
        <th class="text-left">点赞数</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in replies" :key="item.id">
        <td>{{ item.type }}</td>
        <td>{{ item.reply }}</td>
        <td><KudoComponent :kudo-count="item.kudoCount" @plus="onPlus(item)" /></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import KudoComponent from '@/pages/chat/components/chat-kudos.vue'
import { onMounted } from 'vue'
import { type Reply, useChatStore } from '@/stores/chats.store'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { replies } = storeToRefs(chatStore)

onMounted(async () => {
  await chatStore.getReplies()
})

const onPlus = async (reply: Reply) => {
  // 调用API更新某一条数据
  const req: Reply = {
    id: reply.id,
    kudoCount: reply.kudoCount + 1
  }
  await chatStore.updateReply(req)
}
</script>
