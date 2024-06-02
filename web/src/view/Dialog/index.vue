<script lang='ts' setup></script>

<template>
    <div class="main">
        <ChatContent class="chat_content_box"></ChatContent>
        <ChatInput class="chat_input_box"></ChatInput>
    </div>
</template>

<style lang='less' scoped>
.main {
    padding: 20px;

    .chat_content_box {
        height: 80%;
    }

    .chat_input_box {
        height: 20%;
    }
}
</style>