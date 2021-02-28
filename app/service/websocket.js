'use strict';

const Service = require('egg').Service;
const fs = require('fs')
const path = require('path')
class WebsocketService extends Service {

    async listen() {
        const { ctx, app } = this
        if (!ctx.websocket) {
            throw new Error('this function can only be use in websocket router');
        }
        ctx.websocket.on('message', async (msg) => {
            
            let res = JSON.parse(msg)
            const { action } = res
            if (action == 'getData') {
                // 读取指定数据返回
                const filePath = '../public/' + res.chartName + '.json'
                const realpath = path.join(__dirname, filePath)
                const str = await fs.readFileSync(realpath, 'utf-8')
                res.data = str
                ctx.websocket.send(JSON.stringify(res))
            }else{
                // 广播发送数据
                app.ws.clients.forEach((e) => {
                    e.websocket.send(msg)
                })
            }
        }).on('close', () => {
            console.log('close')
        })
        return ''
    }

}

module.exports = WebsocketService;