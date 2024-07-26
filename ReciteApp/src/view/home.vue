<template>
    <div>
      <van-nav-bar title="背单词" />
      <van-cell-group>
        <van-cell
          v-for="(book, index) in wordBooks"
          :key="index"
          :title="book.name"
          is-link
          @click="goToBook(book.name)"
        />
      </van-cell-group>
      <van-button type="primary" @click="showPopup">导入单词书</van-button>
      <van-popup v-model:show="show" position="bottom">
      <div class="popup-header">
        <span class="popup-title">导入单词书</span>
        <van-icon name="cross" class="popup-close" @click="show = false" />
      </div>
      <van-field v-model="newBookName" label="单词书名" placeholder="请输入单词书名" />
      <van-field v-model="newBookUrl" label="URL" placeholder="请输入单词书URL" />
      <van-button type="primary" @click="importBook">导入</van-button>
    </van-popup>
    </div>
  </template>
  
  

  <script lang="ts" setup>
  import { ref , inject} from 'vue';
  import router from '@/router';
  
  // 定义接口
  interface WordBook {
    name: string;
    url?: string;
  }
  
  // 定义响应式数据
  const wordBooks = ref<WordBook[]>([
    { name: '小学生英语词汇300', url: '/books/words_kids300.json' },
    { name: '英语高频词3000', url: '/books/words_top3000.json' }
  ]);
  const globalConfig: any = inject('globalConfig');
  const show = ref(false);
  const newBookName = ref('');
  const newBookUrl = ref('');
  
  // 跳转到单词书页面
  const goToBook = (name: string) => {
    debugger;
    const book = wordBooks.value.filter(book=>book.name === name)[0]
    globalConfig.currentBook = book
    router.push({ name: 'book'});
  };
  
  // 显示导入弹窗
  const showPopup = () => {
    show.value = true;
  };
  
  // 导入单词书
  const importBook = () => {
    console.log('importBook'); 
    if (newBookName.value && newBookUrl.value) {
      const newBook: WordBook = { name: newBookName.value, url: newBookUrl.value };
      wordBooks.value.push(newBook);
      saveCustomBook(newBook);
      newBookName.value = '';
      newBookUrl.value = '';
      show.value = false;
    }
  };
  
  // 从本地存储加载自定义单词书
  const loadCustomBooks = () => {
    const customBooks = JSON.parse(localStorage.getItem('customBooks') || '[]');
    wordBooks.value = [...wordBooks.value, ...customBooks];
  };
  
  // 保存自定义单词书到本地存储
  const saveCustomBook = (book: WordBook) => {
    const customBooks = JSON.parse(localStorage.getItem('customBooks') || '[]');
    customBooks.push(book);
    localStorage.setItem('customBooks', JSON.stringify(customBooks));
  };
  
  // 组件创建时加载自定义单词书
  loadCustomBooks();
  </script>
  
  <style scoped>
  .van-button {
    margin: 16px;
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }
  
  .popup-title {
    font-size: 16px;
    font-weight: bold;
  }
  
  .popup-close {
    font-size: 20px;
    cursor: pointer;
  }
  </style>