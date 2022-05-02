const express = require('express')
const bodyParser = require('body-parser')
const multer = require("multer");
var cors = require('cors')

const connectToMongo = require('./db');
const routes = require('./routes/products')
const route = require('./routes/auth');
const Emitter = require('events');

connectToMongo();
const app = express()
const port = 5001


app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:4300'}))


  
app.use('/api',routes)
app.use('/apit',route)


const server = app.listen(port, () => {
    console.log("server running....")
  })


const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter)


var io = require('socket.io')(server);

io.on('connection', function (socket){
   console.log('Admin side socket connection');

});

eventEmitter.on('orderUpdate',(data)=>{
  io.emit('order',data)
})




  