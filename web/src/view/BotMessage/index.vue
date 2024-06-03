<script setup lang="ts">
import {
  IconCalendar,
  IconRefresh
} from '@arco-design/web-vue/es/icon';
import ChatInputBox from './components/ChatInputBox.vue';
import { ref } from 'vue';

const visible = ref(false)
const message = ref('')

const reset = () => {
  console.log("reset");
}

const setting = () => {
  console.log(message.value);
  
}
</script>

<template>
  <div class="main">
    <a-layout-header class="header">
      <a-button type="text" @click="reset">
        <template #icon>
          <IconRefresh />
        </template>
        Reset
      </a-button>
      <a-button type="text" @click="visible = true">
        <template #icon>
          <IconCalendar />
        </template>
        Setting
      </a-button>
    </a-layout-header>
    <a-layout style="padding: 24px 24px">
      <a-layout-content>
        <ChatContent class="chat_box"></ChatContent>
        <ChatInputBox class="chat_input_box"></ChatInputBox>
      </a-layout-content>
    </a-layout>
    <a-modal v-model:visible="visible" @ok="setting" @cancel="visible = false">
      <template #title>
        Please enter text
      </template>
      <a-textarea v-model="message" class="user_input" placeholder="Please enter something"></a-textarea>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.user_input :deep(.arco-textarea) {
    resize: none;
    background-color: #fff;
}

.main {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    padding: 24px;
    height: 48px;
    background-color: #fff;

    .arco-btn {
      margin-right: 24px;
      color: #000;
    }
  }
}

.chat_box {
  height: 80%;
}

.chat_input_box {
  height: 20%;
}
</style>