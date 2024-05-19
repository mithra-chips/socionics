<template>
  <v-container fluid>
    <v-card variant="text">
      <v-card-title class="chat-title"> 话题<br/>
        三年防疫：时间的流逝与停滞 </v-card-title>
      <v-card-text>
        描述：可以从个人成长机遇、社会影响、心理、社交等方面发布个人感言
      </v-card-text>
    </v-card>
    <v-text-field v-model="socType" placeholder="输入你的soc类型"></v-text-field>
    <v-textarea
      label="观点"
      placeholder='例："我认为blablabla"'
      v-model="answer"
      name="inputAnswer"
      variant="filled"
      auto-grow
    ></v-textarea>
    <v-btn @click="submit" class="text-none text-subtitle-1" color="#5865f2" block>提交</v-btn>
  </v-container>

  <MessagesComponent />
</template>
<script setup lang="ts">
import MessagesComponent from '@/pages/chat/components/chat-messages.vue'
import { ref } from 'vue'
import { useChatStore, type Reply } from '@/stores/chats.store'

const answer = ref('')
const socType = ref('')
const chatStore = useChatStore()

const submit = async () => {
  // http请求：添加进json文件的数组里
  const req: Reply = {
    id: chatStore.replies.length + 1,
    type: socType.value,
    topicId: '1',
    reply: answer.value,
    kudoCount: 0
  }
  await chatStore.addReply(req)
  socType.value = ''
  answer.value = ''
}
</script>

<style scoped>
.chat-title {
      overflow: visible;
      white-space: normal;
      text-overflow: inherit
}
</style>

