import client from '../client.js'
import eventController from '../eventController.js'
import inputManager from '../inputManager.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super("game")

  }
  init() {
    this.disableVisibilityChange = true;
  }

  preload() {
    this.playerMap = {}

    client.prependAny((event, ...args)=>{
      eventController(this,event,args)
    })

    this.load.image('sprite','/assets/favicon.png')

    console.log('preload')
  }

  create() {
    this.input.keyboard.on('keydown',(event)=>{inputManager.keydown(this,client,event)})
    client.emit('newPlayer')
  }

  addNewPlayer({id,x,y}) {
    this.playerMap[id] = this.add.sprite(x,y,'sprite');
  }

  removePlayer(id) {
    this.playerMap[id].destroy();
    delete this.playerMap[id];
  }
} 