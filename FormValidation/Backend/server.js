const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const ejs = require('ejs');
const path = require('path');


const connectToMongo = require('./db');
const routes = require('./routes/auth');
const route  = require('./routes/product');
const rout  = require('./routes/histery');
const Emitter = require('events');



connectToMongo();
const app = express()
const port = 5000

app.set('views',path.join(__dirname,'views'));
 
//set view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:4200'}))

app.use('/api',routes)
app.use('/apit',route)
app.use('/apih',rout)

const eventEmitter = new Emitter()

const server = app.listen(port, () => {
    console.log("server running....")
  })


var io = require('socket.io-client');
var socket = io.connect('http://localhost:5001', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('client side socket Connected!');
});

socket.on('order', (data)=> {
  eventEmitter.emit('orderdata',{id:data.id,status:data.status})
});





const io1= require('socket.io')(server)
io1.on('connection',(socket)=>{
  console.log(socket.id);

  socket.on('join',(orderId)=>{
    socket.join(orderId)
    console.log(orderId);
  })
})


eventEmitter.on('orderdata',(data)=>{
  // console.log(data);
  console.log("hi");
  io1.to(`order_${data.id}`).emit('orderemit',data)
})

  // const io = require('socket.io-client')("http://localhost:5001");
  // io.on('connection',(socket) =>{
    // socket.emit('flash', { hello: 'world' });
    // p=socket.on(news)
    // console.log(p);
  // });

