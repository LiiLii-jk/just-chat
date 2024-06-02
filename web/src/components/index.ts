import { App } from "vue";
import ChatConentBox from "./ChatConentBox.vue";
import ChatInputBox from "./ChatInputBox.vue";

export default function registered(app:App):void{
    app.component('ChatContent',ChatConentBox)
    app.component('ChatInput',ChatInputBox)
}