import '@/assets/main.css'

import { createApp, onMounted, onUnmounted, ref } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useChatStore } from '@/stores/chats.store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const vuetify = createVuetify({
  components,
  directives,
  ssr: true
})
app.use(vuetify)

const timerId = ref<number | null>(null);

onMounted(() => {
  const chatStore = useChatStore()
  timerId.value = window.setInterval(async () => {
    await chatStore.getReplies();
  }, 600000);
});

onUnmounted(() => {
  if (timerId.value) {
    window.clearInterval(timerId.value);
  }
});

app.mount('#app')
