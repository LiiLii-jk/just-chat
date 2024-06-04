<script setup lang="ts">
import Content from './view/Content.vue'
import { creatWebsocket } from './utils/websocket';
import { userMessageStore, storeToRefs } from './store';

creatWebsocket('http://localhost:3000')

const store = userMessageStore()
const { userName } = storeToRefs(store)
userName.value = 'wjk'
// userName.value = prompt('请输入您的名称') as string
</script>

<template>
  <Content msg="Vite + Vue" />
</template>

<style scoped>
</style>
