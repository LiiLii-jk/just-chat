<script lang='ts' setup>
import { ref } from 'vue';
import { MessageStore } from "@/store/index"
import { IconFileImage } from '@arco-design/web-vue/es/icon';

const store = MessageStore()
const message = ref('')
const submit = (event:any) => {
    if(event.keyCode === 13) {
        if(message.value === "") {
            event.preventDefault()
            return
        }
        if(!event.ctrlKey) {
            event.preventDefault();
            store.updateMessage('submit',message.value)
            message.value = ""
        } else {
            message.value += "\n"
        }
    }
}

const imgSubmit = () => {
    const input: HTMLElement = document.querySelector("input[type='file']") as HTMLElement
    input.click()
    input.onchange = (e:any) => {
        console.log(e);
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e:any) => {
            console.log(e.target.result);
        }
    }
}
</script>

<template>
    <div class="user_input_box">
        <input type="file" class="file" name="file" />
        <div class="tool">
            <IconFileImage @click="imgSubmit"/>
        </div>
        <a-textarea v-model="message" class="user_input" placeholder="Please enter something" @keydown="submit($event)"></a-textarea>
    </div>
</template>

<style lang='less' scoped>
.user_input :deep(.arco-textarea) {
    resize: none;
    background-color: #fff;
}

.user_input_box {
    display: flex;
    flex-direction: column;

    .file {
        display: none;
    }

    .tool {
        display: flex;
        align-items: center;
        height: 30px;
    }

    .user_input {
        flex: 1;
        border: none;
    }
}
</style>