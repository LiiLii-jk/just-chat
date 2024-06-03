// import { Notification } from '@arco-design/web-vue';
import { io } from "socket.io-client"

import { groupMapStore, MessageStore,userMessageStore, storeToRefs } from '../store/index';
import { nextTick, Ref } from "vue";

let groupStore:any
let botStore:any
let userStore:any
let aSideGroup:Ref
let messageList:Ref
let userName:Ref

nextTick(() => {
    groupStore = groupMapStore();
    botStore = MessageStore();
    userStore = userMessageStore();
    ({aSideGroup} = storeToRefs(groupStore));
    ({userName} = storeToRefs(userStore));
    ({messageList} = storeToRefs(botStore))
})

let socket:any = null;

const creatWebsocket = (wsUrl:string) => {
    console.log("websocket connectting -----",wsUrl);
    
    try {
        initWebsocket(wsUrl);
    } catch (e) {
        console.log('fall----');
    }
}

const initWebsocket = (wsUrl:string) => {
    socket = io(wsUrl,{
        transports: ["websocket"],
        autoConnect: true,
        reconnection: true,
    })

    getGroupMap()
    getMessage()
    getBotMessage()
    getRoomMessages()
}

const joinRoom = (name:string,room:string) => {
    socket.emit('join',{name,room})
}

const getRoomMessages = () => {
    socket.on('messages',(data:any) => {
        messageList.value = data
    })
}

const openBot = () => {
    socket.emit('startBot',userName.value)
    messageList.value = [
        {
            message: "你好",
            user: "bot",
            img: ""
        }
    ]
}

const getGroupMap = () => {
    socket.on('groupMap',(data:any) => {
        aSideGroup.value = data
    })
}

const sendMessage = (name:string,message:string,room:string) => {
    socket.emit('message',{name,message,room})
}

const getBotMessage = () => {
    socket.on('botMessage',(message:string) => {
        messageList.value.push({
            message,
            user:'bot'
        })
    })
}

const getMessage = () => {
    socket.on('message',(data:any) => {
        console.log(data);
        
        messageList.value.push({
            message:data.message,
            user:data.name
        })
    })
}

export { socket, creatWebsocket, joinRoom, sendMessage, openBot }
