<template>
    <div>
      <van-nav-bar
        title=""
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />

      <div class="card">
        <div class="word">{{ currentWord.word }}</div>
        <div class="chinese">{{ currentWord.chinese }}</div>
        <div v-if="currentWord.photo" class="photo">
          <img :src="currentWord.photo" alt="Word Image" />
        </div>
        <div class="sentence">
          <span class="audio" @click="playAudio(currentWord.sentence)"><van-icon name="volume" color="#1A89FA" /></span>
          {{ currentWord.sentence }}（{{ currentWord.sentence_chinese }}）
        </div>
      </div>
      <div v-if="!isAllWordsLoaded" class="buttons">
        <van-button type="primary" @click="knowWord">&#128515; 认识</van-button>&nbsp;&nbsp;
        <van-button type="danger" @click="dontKnowWord">&#128531; 不认识</van-button>
      </div>
      <div v-if="isAllWordsLoaded" class="completion-message">
        恭喜！本类别学习完成！
        <div class="buttons">
          <van-button type="primary">测试</van-button>&nbsp;&nbsp;
          <van-button type="default" @click="goBack">返回</van-button>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref, inject} from 'vue';
  import router from '@/router'
  import VConsole from 'vconsole';
  const vConsole = new VConsole();
  const globalConfig: any = inject('globalConfig');
  const appSettings: any = inject('appSettings');
  const wordList = globalConfig.currentWordList;
  let currentIndex = 0;
  let currentWord = ref({word:"", chinese:"", sentence:"", sentence_chinese:"", photo:""});
  let isAllWordsLoaded = ref(false);
  let stopAuto = false;
  let audio: any = undefined;

  const loadNextWord = () => {
      
      if (currentIndex < wordList.length) {
        currentWord.value = wordList[currentIndex];
        playAudio(currentWord.value.word, autoAction);
      }
      isAllWordsLoaded.value = (currentIndex>=wordList.length);
  }

  const autoAction = () =>{
    if(stopAuto){
      console.debug("stopAuto="+stopAuto);
      return;
    }

    console.debug("autoPlaySentenceAudio="+appSettings.autoPlaySentenceAudio.value);
    if(appSettings.autoPlaySentenceAudio.value){
      setTimeout(()=>{
        playAudio(currentWord.value.sentence);
      }, 1500);
    }
  }

  const autoSwitch = () =>{
    if(stopAuto){
      return;
    }

    if(appSettings.autoSwitchNextWord.value){
      setTimeout(dontKnowWord, 3000);
    }
  }

  const playAudio = (text: string, endCallback?: (() => void) | undefined) => {
      
      if (!audio){
        audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`);
      }else{
        audio.pause();
        audio.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
      }
      if(endCallback){
        const onEnded = () => {
            endCallback();
            // Remove the event listener after it has been called to prevent memory leaks
            audio.removeEventListener('ended', onEnded);
        };
        audio.addEventListener('ended', onEnded);
      }
      
      audio.play();
  }

  const knowWord = () => {
    // 模拟熟悉度+1
    currentIndex++;
    loadNextWord();
  }
  const dontKnowWord = () => {
    // 模拟熟悉度-1
    currentIndex++;
    loadNextWord();
  }

  const goBack = () => {
    stopAuto = true;
    router.go(-1);
    vConsole.destroy();
  }

  // onBeforeUnmount(() => {
  //   console.log("onBeforeUnmount");
  //   stopAuto = true;
  // });

  loadNextWord();
  </script>
  
  <style scoped>
  .card {
  background-color: #f0f0f0;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.word {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.chinese {
  font-size: 24px;
  color: #666;
  margin-bottom: 10px;
}

.sentence {
  font-size: 20px;
  color: #333;
}

.audio {
  cursor: pointer;
}

.photo {
  margin-top: 10px;
  text-align: center;
}

.photo img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.buttons van-button {
  margin-right: 10px; /* 设置按钮之间的右边距为10像素，根据需要调整 */
}

.completion-message {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
}
  </style>
  