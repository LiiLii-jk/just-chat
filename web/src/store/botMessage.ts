import { defineStore } from "pinia"
import { ref } from "vue"

import { sendMessage } from "@/utils/websocket"

import { userMessageStore, storeToRefs } from "./index"

export const MessageStore = defineStore("Message", () => {

    const { userName } = storeToRefs(userMessageStore())
    const roomName = ref('')

    const messageList = ref([
        {
            message: "你好",
            user: "bot",
            img: ""
        }
    ])

    function updateMessage(type: string, newMessage: string) {
        if (type === "submit") {
            messageList.value.push({
                message: newMessage,
                user: userName.value,
                img: ""
            })
            sendMessage(userName.value, newMessage, roomName.value)
        } else {
            console.log("update from net")
        }
    }

    return { roomName, messageList, updateMessage }
})