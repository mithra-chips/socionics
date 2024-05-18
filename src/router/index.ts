import { createRouter, createWebHistory } from 'vue-router'

const deleteChatComponent = () => import('@/pages/chat/chat-messages-delete.vue')
const chatPageComponent = () => import('@/pages/chat/chat-page.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: chatPageComponent },
    { path: '/delete-chat', component: deleteChatComponent },
  ]
})

export default router
