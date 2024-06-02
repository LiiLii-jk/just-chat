<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  IconHome,
  IconCalendar,
  IconPlus
} from '@arco-design/web-vue/es/icon';
import { useRouter } from 'vue-router'

import { joinRoom, openBot } from '@/utils/websocket';
import { userMessageStore, groupMapStore, MessageStore, storeToRefs } from '@/store/index';

const groupStore = groupMapStore()
const userStore = userMessageStore()
const messageStore = MessageStore()
const { aSideGroup } = storeToRefs(groupStore)
const { userName } = storeToRefs(userStore)
const { roomName } = storeToRefs(messageStore)

const router = useRouter()

const roomList = computed(() => {
  console.log(Object.keys(aSideGroup.value));
  
  return Object.keys(aSideGroup.value)
})

const collapsed = ref(false);
const onCollapse = (val: boolean) => {
  collapsed.value = val;
}

const asideMenuChange = (key: string) => {
  if (key === 'bot') {
    router.push({ name: 'Bot' })
    roomName.value = key
    openBot()
  } else if (key === 'home') {
    router.push({ name: 'Home' })
  } else {
    console.log('add room');
  }
}

const roomClick = (key: string) => {
  router.push({ name: 'Dialog' })
  roomName.value = key
  joinRoom(userName.value, key)
}
</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="220" hide-trigger collapsible :collapsed="collapsed" @collapse="onCollapse">
      <a-menu @menuItemClick="asideMenuChange">
        <a-menu-item key="home">
          <IconHome />
          HOME
        </a-menu-item>
        <a-menu-item key="bot">
          <IconCalendar />
          BOT
        </a-menu-item>
        <a-sub-menu v-for="item in roomList" :key="item" @click="roomClick(item)">
          <template #title>{{ item }}</template>
          <a-menu-item v-for="user in aSideGroup[item]" :key="user.name">{{ user.name }}</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="add">
          <IconPlus />
          ADD
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <router-view></router-view>
  </a-layout>
</template>

<style lang="less" scoped>
.layout-demo {
  height: 100%;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
</style>
