<template>
  <div>
    <van-nav-bar
      title="小学生英语词汇"
      right-text="设置"
      @click-right="goToSettings"
    />
    <van-list>
      <van-cell
        v-for="(category, index) in uniqueCategories"
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
import wordsData from '@/assets/words.json'; // 导入单词数据

const globalConfig: any = inject('globalConfig');
let categories: string[] = [];

// 从单词数据中提取并去重分类
for (const wordData of wordsData) {
  if (!categories.includes(wordData.category)) {
    categories.push(wordData.category);
  }
}

// 计算去重后的分类数组
const uniqueCategories = computed(() => categories);

// 跳转至设置页面
const goToSettings = () => {
  // 这里是跳转逻辑，您需要根据实际情况进行修改
  console.log('跳转至设置页面');
  router.push('config');
};

// 跳转至单词卡片页面
const goToWordCards = (category: string) => {
  // 筛选出该分类的单词列表
  let wordList = wordsData.filter(word => word.category === category);
  // 使用路由导航跳转到单词卡片页面，并传递单词列表
  globalConfig.currentWordList = wordList
  router.push({name: 'card', params: {category}});
};

</script>

<style>
</style>
