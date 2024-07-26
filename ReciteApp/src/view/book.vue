<template>
  <div>
    <van-nav-bar
    :title="bookName"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      right-text="设置"
      @click-right="goToSettings"
    />
    <van-list v-model:loading="loading">
      <van-cell
        v-for="(category, index) in categories"
        :key="index"
        :title="category"
        center
        :clickable="true"
        @click="goToWordCards(category)"
      />
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject} from 'vue';
import router from '@/router';
import { useRoute, useRouter } from 'vue-router';
//import wordsData from '@/assets/words.json'; // 导入单词数据
// 类型定义
interface Word {
  category: string;
  word: string;
  chinese: string;
  sentence: string;
  sentence_chinese: string;
  photo: string;
}


const globalConfig: any = inject('globalConfig');
const route = useRoute();
const bookName = ref<string>();
const loading = ref(false);
const words = ref<Word[]>([]);
const categories = ref<string[]>([]);

// 跳转至设置页面
const goToSettings = () => {
  // 这里是跳转逻辑，您需要根据实际情况进行修改
  console.log('跳转至设置页面');
  router.push('config');
};

// 跳转至单词卡片页面
const goToWordCards = (category: string) => {
  // 筛选出该分类的单词列表
  let wordList = words.value.filter(word => word.category === category);
  // 使用路由导航跳转到单词卡片页面，并传递单词列表
  globalConfig.currentWordList = wordList
  router.push({name: 'card', params: {category}});
};


// 获取单词书数据
const loadWords = async () => {
  loading.value = true;
  try {
    const book = globalConfig.currentBook;
    bookName.value = book.name;
    const url = book.url;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('加载单词书失败');
    }
    const data: Word[] = await response.json();
    words.value = data;
    categories.value = [...new Set(words.value.map(word => word.category))];
  } catch (error) {
    console.error('加载单词书失败:', error);
  } finally {
    loading.value = false;
  }
};

// 返回按钮点击事件
const goBack = () => {
  router.back();
};

loadWords();

</script>

<style>
</style>
