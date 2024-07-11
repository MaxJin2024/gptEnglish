<!-- config.vue -->

<template>
  <div>
    <!-- van-nav-bar 导航栏 -->
    <van-nav-bar
      title="设置"
      left-text="返回"
      @click-left="goBack"
    />

    <!-- 设置内容区域 -->
    <van-cell-group>
      <van-cell title="例句自动发音" @click="toggleSetting('autoPlaySentenceAudio')">
          <van-switch v-model="autoPlaySentenceAudio" />
      </van-cell>
      <van-cell title="自动切换下一个单词" @click="toggleSetting('autoSwitchNextWord')">
          <van-switch v-model="autoSwitchNextWord" />
      </van-cell>
      <!-- <template :key="key" v-for="(item, key) in settings">
        <van-cell :title="item.label" is-link @click="toggleSetting(key)">
          <van-switch v-model="opened" />
        </van-cell>
      </template> -->

    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, watch, ref} from 'vue';
import router from '@/router';
const opened = ref(false);

// 提供全局的 settings
const settings: any = inject('appSettings');
let autoPlaySentenceAudio = ref(settings['autoPlaySentenceAudio'].value);
let autoSwitchNextWord = ref(settings['autoSwitchNextWord'].value);

// 切换配置项的函数
const toggleSetting = (key: string|number) => {
  console.info("toggle changed")
  settings[key].value = !settings[key].value;
  localStorage.setItem('AppSettings', JSON.stringify(settings));
  console.info(settings);
};

// 监听配置项变化，保存到本地存储
// watch(settings, (newSettings) => {
//   console.log("AppSettings changed.")
//   localStorage.setItem('AppSettings', JSON.stringify(newSettings));
// });

// 在组件创建时，将默认设置项保存到本地存储
onMounted(() => {
  //localStorage.setItem('AppSettings', JSON.stringify(settings));
});

// 返回上一页的函数
const goBack = () => {
  // 使用你的路由控制返回上一页的逻辑，这里只是个示例
  router.go(-1);
};
</script>
