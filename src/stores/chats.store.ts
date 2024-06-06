// Utilities
import axios from '@/axios'
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading.store'

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
const loading = useLoadingStore();
export const useChatStore = defineStore('use-chat', {
  state: () => ({
    replies: [] as Reply[]
  }),
  actions: {
    async addReply(reply: Partial<Reply>) {
      // http请求：添加进json文件的数组里
      loading.isLoading = true
      try {
        const response = await axios.post('/api/add-reply', reply)
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }finally{
        loading.isLoading = false
      }
      
    },
    async updateReply(reply: Reply) {
      loading.isLoading = true
      try {
        const response = await axios.post('/api/update-reply', reply)
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }finally{
        loading.isLoading = false
      }
    },
    async getReplies() {
      loading.isLoading = true
      try {
        const response = await axios.get('/api/get-replies')
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }finally{
        loading.isLoading = false
      }
    },
    async deleteReply(reply: Reply) {
      loading.isLoading = true
      try {
        const response = await axios.post('/api/delete-replies', reply)
        const result = response.data as Replies
        this.$patch({ replies: result.replies })
      } catch (error) {
        console.error(error)
      }finally{
        loading.isLoading = false
      }
    }
  }
})
