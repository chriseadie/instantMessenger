const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors")
const app = express();
const chatrooms = require('./chatrooms.json');
const users = require('./users.json');
const activeUser = require('./ActiveUsers.json')

//app.use(bodyParser.json())


var admin = require("firebase-admin");

var serviceAccount = require("./eadiemessengerapi-firebase-adminsdk-9h3ll-c34f5ff644.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eadiemessengerapi.firebaseio.com"
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({origin:true}))

app.post('/getActiveUsers',(req,res) => {
    var url = req.body.activeUserParam
    var active = activeUser.find(item => {
     return item.session === url
    })
    res.send(active)
})

app.get("/testing" , (req,res) => {
    res.send("Hello World")
})

app.post('/signin', (req,res) => {
    var username  = req.body.username;
    var password = req.body.password;
    
    var isAUser = users.find(user => {
        return user.password === password
    })

    var isUserActive = activeUser.find(item => {
        item.session === isAUser.session
    })

    if(isAUser.username === username && isAUser.password === password){
        res.send({status:'success',location:'/messenger',session:isAUser.session})
        if(isUserActive === true){
            return null
        } else {
            activeUser.push(isAUser)
            fs.writeFile('ActiveUsers.json',JSON.stringify(activeUser),(err) => {
                if(err){
                    console.log(err)
                }
            })
        }
    } else {
        res.send({status:'failed'})
    }
})

app.get('/GetChatRooms',(req,res) => {
    res.send(chatrooms)
    res.end()
})

app.post('/addNewRoom', (req,res) => {
    var room = req.body
    console.log(room)
    const allRooms = chatrooms;
    allRooms.push(room)
    res.send(allRooms)
    fs.writeFileSync('chatrooms.json',JSON.stringify(allRooms),(err) => {
        if(err){
            console.log(err)
        }
    })
})

app.post('/removeActiveUser',(req,res) => {
    const user = req.body.toDelete;
    var userToRemove = activeUser.findIndex(item => {
        return item.session === user
    })
    activeUser.splice(userToRemove,1)
    fs.writeFile('ActiveUsers.json',JSON.stringify(activeUser) ,(err) => {
        console.log(err)
    })
    res.end()
})

app.post('/addMessageToChat',(req,res) => {
    var message = req.body
    var roomToUpdate = chatrooms.find(item => {
        return item.id === message.chatRoomsId
    })
    roomToUpdate.replys.push(message)

    var arrayChange = chatrooms.findIndex(room => {
        return room.id === message.chatRoomsId
    })

    chatrooms.splice(arrayChange,1)
    chatrooms.unshift(roomToUpdate)
    fs.writeFile('chatrooms.json',JSON.stringify(chatrooms),(err) => {
        if(err){
            console.log(err)
        }
    })
    res.end()
})


const api = functions.https.onRequest(app);

module.exports = {
    api
}

