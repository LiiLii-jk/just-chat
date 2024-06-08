<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  IconHome,
  IconCalendar,
  IconPlus,
  IconUserGroup
} from '@arco-design/web-vue/es/icon';
import { useRouter } from 'vue-router'

import { joinRoom, openBot } from '@/utils/websocket';
import { userMessageStore, groupMapStore, MessageStore, storeToRefs } from '@/store/index';

const visible = ref(false)
const newRoomName = ref('')

const groupStore = groupMapStore()
const userStore = userMessageStore()
const messageStore = MessageStore()
const { aSideGroup } = storeToRefs(groupStore)
const { userName } = storeToRefs(userStore)
const { roomName } = storeToRefs(messageStore)

const router = useRouter()

const roomList = computed(() => {
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
  }
}

const roomClick = (key: string) => {
  router.push({ name: 'Dialog' })
  roomName.value = key
  joinRoom(userName.value, key)
}

const roomAdd = () => {
  visible.value = true
}

const handleOk = () => {
  joinRoom(userName.value, newRoomName.value)
  roomName.value = newRoomName.value
}
</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="220" collapsible :collapsed="collapsed"
      @collapse="onCollapse">
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
          <template #title>
            <IconUserGroup />
            {{ item }}
          </template>
          <a-menu-item v-if="aSideGroup[item].length !== 0" >
            <div v-for="user in aSideGroup[item]" :key="user.name">
              {{ user.name }}
            </div>
          </a-menu-item>
          <a-menu-item v-else>
            暂无用户
          </a-menu-item>
        </a-sub-menu>
        <a-button class="add_room" @click="roomAdd">
          <IconPlus />
          ADD
        </a-button>
      </a-menu>
    </a-layout-sider>
    <router-view></router-view>
  </a-layout>
  <a-modal v-model:visible="visible" @ok="handleOk">
    <template #title>
      Plesae enter RoomName
    </template>
    <a-input v-model="newRoomName"></a-input>
  </a-modal>
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

.add_room {
  width: 100%;
}
</style>
