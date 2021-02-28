'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')
const path = require('path')
class HomeController extends Controller {
  // 读取json文件并返回数据
  async index() {
    const { ctx } = this;
    const { name } = ctx.params
    const filePath = 'app/public/'+name+'.json'
    const realpath = path.resolve(filePath)
    let str = await fs.readFileSync(realpath)
    if(str){
    ctx.body = str;
    }else{
      ctx.body = ''
    }
  }
  // websocket推送数据
  async ws() {
    const { service } = this
    service.websocket.listen()
  }
}

module.exports = HomeController;
