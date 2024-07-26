import { createApp } from 'vue'
import App from './App.vue'
//import App from './view/goods/index.vue'
import 'vant/es/toast/style'
import router from './router'

const app = createApp(App)
app.use(router)

// 全局配置参数
const globalConfig = {
    currentWordList: [], //word list
    currentBook: {}
};
// 读取本地保存的App设置
const storedSettings = localStorage.getItem('AppSettings');
const appSettings = storedSettings ? JSON.parse(storedSettings) :{
    'autoPlaySentenceAudio':{ label: '例句自动发音', value: false },
    'autoSwitchNextWord':{label: '自动切换下一个单词', value: false },
};
app.provide('appSettings', appSettings);
app.provide('globalConfig', globalConfig);
app.mount('#app')
