<script lang='ts' setup></script>

<template>
    <div class="main">
        <ChatContent class="chat_content_box"></ChatContent>
        <ChatInput class="chat_input_box"></ChatInput>
    </div>
</template>

<style lang='less' scoped>
.main {
    .chat_content_box {
        padding: 20px;
        height: calc(80% - 40px);
        max-width: calc(100% - 40px);
    }

    .chat_input_box {
        padding: 0 20px 20px 20px;
        height: calc(20% - 20px);
    }
}
</style>