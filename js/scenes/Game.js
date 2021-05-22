import Client from '../client.js'
import eventController from '../eventController.js'
const client = Client()
export default class Game extends Phaser.Scene {
  constructor() {
    super("game")

  }
  init() {
    this.disableVisibilityChange = true;
  }

  preload() {  
    console.log('preload')
    client.prependAny((event, ...args)=>{
      eventController(this,event,args)
    })
  }

} 