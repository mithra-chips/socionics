// Utilities
import axios from '@/axios'
import { defineStore } from 'pinia'

export type Reply = {
  id: number
  type?: string
  topicId?: string
  reply?: string
  kudoCount?: number
}

export type Replies = {
  replies: Reply[]
}

export const useChatStore = defineStore('use-chat', {
  state: () => ({
    replies: [] as Reply[]
  }),
  actions: {
    async addReply(reply: Partial<Reply>) {
      // http请求：添加进json文件的数组里
      try {
        const response = await axios.post('/api/add-reply', reply)
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }
    },
    async updateReply(reply: Reply) {
      try {
        const response = await axios.post('/api/update-reply', reply)
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }
    },
    async getReplies() {
      try {
        const response = await axios.get('/api/get-replies')
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }
    },
    async deleteReply(reply: Reply) {
      try {
        const response = await axios.post('/api/delete-replies', reply)
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
