import { createRouter, createWebHashHistory } from 'vue-router'

const deleteChatComponent = () => import('@/pages/chat/chat-messages-delete.vue')
const chatPageComponent = () => import('@/pages/chat/chat-page.vue')
const router = createRouter({
  // 使用哈希模式 (hash mode) 而不是HTML5历史模式 (history mode)
  // https://mithra-chips.github.io/socionics/#
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: chatPageComponent },
    { path: '/delete-chat', component: deleteChatComponent },
  ]
})

export default router
