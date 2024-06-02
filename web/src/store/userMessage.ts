import { defineStore } from "pinia";
import { ref } from "vue";

export const userMessageStore = defineStore("userMessage", () => {
    const userName = ref("jk")

    return { userName }
}) 