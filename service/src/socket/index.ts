import { botMessage, groupMap, messages } from './util'
const { Server } = require('socket.io')
import { ChatCompletionMessageParam } from 'openai/resources';
import { getOpenaiReply } from '../service/openai'

type gourp = {
    [prop:string]:Array<object>
}

export const socketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        socket.emit('groupMap', groupMap)

        //加入房间
        socket.on('join', ({ name, room }) => {
            socket.join(room)
            if (groupMap[room]) {
                let key:keyof gourp
                for(key in groupMap) {
                    console.log(groupMap,key);
                    groupMap[key] = groupMap[key].filter((item) => item.name !== name )
                }
                if (!groupMap[room].some(i => i.name === name)) groupMap[room].push({ name, id: socket.id })
            } else {
                groupMap[room] = [{ name, id: socket.id }]
                messages[room] = []
            }

            socket.emit('groupMap', groupMap)
            socket.broadcast.emit('groupMap', groupMap)
            if(room !== 'bot') {
                socket.emit('messages',messages[room])
            }
            console.log(messages);
              
        })

        socket.on('startBot', (name) => {
            if (!botMessage[name]) {
                botMessage[name] = [] as ChatCompletionMessageParam[]
            }
        })

        socket.on('message', ({ name, message, room }) => {
            console.log(name, message, room);
            if (room === 'bot') {
                getOpenaiReply(name,message).then((res) => {
                    const reply = res === undefined ? 'gpt功能有问题' : res
                    socket.emit('botMessage', reply)
                })
                botMessage[name].push({role:"user",content:message})
            } else {
                messages[room].push({
                    user:name,
                    message:message
                })
                socket.broadcast.to(room).emit('message', { name, message })
            }
        })
    })
}