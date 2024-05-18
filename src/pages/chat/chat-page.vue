<template>
  <v-container fluid>
    <v-card variant="text">
      <template v-slot:title> 话题：xxx </template>

      <template v-slot:text> 描述：yyy </template>
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
    type: 'IEE',
    topicId: '1',
    reply: answer.value,
    kudoCount: 0
  }
  await chatStore.addReply(req)
}
</script>
