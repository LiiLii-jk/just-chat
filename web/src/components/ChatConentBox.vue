<script lang="ts" setup>
import { IconRobot, IconUser } from '@arco-design/web-vue/es/icon';
import { userMessageStore, MessageStore, storeToRefs } from "@/store/index"

const botStore = MessageStore()
const userStore = userMessageStore()
const { messageList } = storeToRefs(botStore)
const { userName } = storeToRefs(userStore)
</script>

<template>
    <div>
        <div class="content">
            <div v-for="item in messageList" class="message_box" :class="[item.user === userName ? 'user_message' : 'bot_message']">
                <div v-if="item.user === 'bot'">
                    <IconRobot size="52"></IconRobot>
                </div>
                <div v-else>
                    <IconUser size="52"></IconUser>
                </div>
                <div class="message_name">
                    <div class="name">{{ item.user }}</div>
                    <div class="message">{{ item.message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    overflow: auto;
    height: 100%;
    background-color: #DBDBDB;
}

.message_box {
    margin-top: 10px;
    display: flex;
    min-height: 16px;

    .message_name {
        display: flex;
        flex-direction: column;

        .name {
            display: flex;
            flex-direction: row;
        }
    }

    .message {
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
    }
}

.user_message {
    flex-direction: row-reverse;

    .message_name {
        .name {
            flex-direction: row-reverse;
        }
    }
}
</style>