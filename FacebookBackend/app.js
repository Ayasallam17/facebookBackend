const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/config/db.config')
const app = express()
const routes = require('./src/routers/router')

const PORT = 3000
const Role = db.role

// db.joinReqests.sync( {force:true} ).then(  ()=>{
//     console.log('alter table')
//     //initial();
// } )

function initial(){
    Role.create({
        id: 1,
        name : 'USER'
    });
    Role.create({
        id:2,
        name :'ADMIN'
    });
    Role.create({
        id:3,
        name:'PM'
    })
}

app.use(express.json()) 
app.use(bodyParser.json())
app.use(routes)
app.listen(PORT)