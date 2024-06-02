<script setup lang="ts">
import {
  IconCalendar,
  IconRefresh
} from '@arco-design/web-vue/es/icon';
import ChatInputBox from './components/ChatInputBox.vue';


</script>

<template>
  <div class="main">
    <a-layout-header>
      <a-menu mode='horizontal'>
        <a-menu-item>
          <IconRefresh />
          Reset
        </a-menu-item>
        <a-menu-item>
          <IconCalendar />
          SettingTwo
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout style="padding: 24px 24px">
      <a-layout-content>
        <ChatContent class="chat_box"></ChatContent>
        <ChatInputBox class="chat_input_box"></ChatInputBox>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
}

.chat_box {
  height: 80%;
}

.chat_input_box {
  height: 20%;
}
</style>