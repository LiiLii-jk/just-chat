import Koa from 'koa';
// import Router from 'koa-router';
import { createServer } from 'http';
import { socketServer } from './socket/index'

const app = new Koa();
const server = createServer(app.callback())

socketServer(server);

// const router = new Router();

// router.get('/', (ctx: any) => {
//     const { type } = ctx.request.query;
//     if (!type) {
//         ctx.status = 403;
//         return
//     }
//     ctx.status = 403;
// });

// app.use(router.routes());
server.listen((3000),()=>{
    console.log("proxy server:3000");
});
