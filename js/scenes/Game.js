import client from '../client.js'
import eventController from '../eventController.js'
import inputManager from '../inputManager.js'
import Player from '../classes/Player.js'

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
    this.player = new Player(this, window.performance.now(), {x:300,y:200})
    this.input.keyboard.on('keydown',(event)=>{inputManager.keydown(this,client,event)})
    client.emit('newPlayer', this.player)
  }

  addNewPlayer({id,x,y}) {
    this.playerMap[id] = new Player(this,id,{x,y})
  }

  removePlayer(id) {
    this.playerMap[id].destroy();
    delete this.playerMap[id];
  }
} 