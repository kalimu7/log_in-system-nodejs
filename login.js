//importing stuff.
const { createConnection } = require('mysql');
const mysql = require('mysql');
const express = require('express');
const { append } = require('express/lib/response');
const bodyParser = require('body-parser');
const encoder  = bodyParser.urlencoded(); 


//express setting port.
const server = express();
server.get('/',(req,res)=>{
    res.render('index');
});


//set views
server.set('views','./views');
server.set('view engine','ejs');



server.post('/',encoder,function(req,res){
    var username = req.body.user_name;
    var userpassword = req.body.user_password;
    connection.query('select * from user where name = ? and password = ?',[username,userpassword],(error,results,fields)=>{
        if(results.length > 0){
            res.redirect('/welcome');
        }else{
            res.redirect('/');
        }
        res.end();
    })
})


//when log in is success the welcome page;
server.get('/welcome',(req,res)=>{
    res.render('welcome');
})

//setting styles
server.use(express.static('Public'));
server.use('/CSS',express.static('/CSS'));
server.use('/Img',express.static('/Img'));



 
//connect to database;
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_login',
})

connection.connect((error)=>{
    if(error) throw error
    else console.log('connected succesfully to databse');
});

//lisnting
const port = 4500;
server.listen(port,()=>{
    console.log('server running on port '+port);
});

