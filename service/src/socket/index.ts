import { botMessage, groupMap } from './util'
const { Server } = require('socket.io')
import { ChatCompletionMessageParam } from 'openai/resources';
import { getOpenaiReply } from '../service/openai'

export const socketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        socket.emit('groupMap', groupMap)

        //加入房间
        socket.on('join', ({ name, room }) => {
            socket.join(room)
            if (groupMap[room]) {
                if (!groupMap[room].some(i => i.name === name)) groupMap[room].push({ name, id: socket.id })
            } else {
                groupMap[room] = [{ name, id: socket.id }]
            }

            socket.emit('groupMap', groupMap)
            socket.broadcast.emit('groupMap', groupMap)

            // socket.broadcast.to(room).emit('message', {
            //     name: '管理员',
            //     message: `欢迎${name}加入${room}号聊天室`
            // })
        })

        socket.on('startBot', (name) => {
            if (!botMessage[name]) {
                botMessage[name] = [] as ChatCompletionMessageParam[]
            }
            console.log(botMessage);
        })

        socket.on('message', ({ name, message, room }) => {
            console.log(name, message, room);
            if (room === 'bot') {
                console.log('botmessage',botMessage[name]);
                
                getOpenaiReply(name,message).then((res) => {
                    console.log(res);
                    const reply = res === undefined ? 'gpt功能有问题' : res
                    socket.emit('botMessage', reply)
                })
                botMessage[name].push({role:name,content:message})
            } else {
                console.log({name,message});
                
                socket.broadcast.to(room).emit('message', { name, message })
            }
        })
    })
}