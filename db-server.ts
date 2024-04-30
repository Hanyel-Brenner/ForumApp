import { Request,Response} from 'express';
import { UserRepo } from './src/control/user-repo';
import { PostRepo } from './src/control/posts-repo';
import { User } from './src/models/user';
import { Post } from './src/models/post';
import app from "./src/db-control/prisma-app";

const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const PORT = 3000;
const baseUrl = 'http://localhost:'+PORT.toString();
const viewsPath = './db-views/';
const bodyParser = require('body-parser');
const session = require('express-session');

server.use(express.static(path.join(__dirname,'db-views')));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));
server.use(session({
    secret : "TheSecretIngredientIsYou",
    resave : false,
    saveUninitialized : false,
    cookie : {}
}))

server.get('/', (request:Request,response:Response) => {
    fs.readFile(viewsPath+'index.html', 'utf-8', (err,html) => {
        if(err != null){
            response.status(500).send('Sorry, the server is out of order!');
        }
        response.send(html);
    })
});

server.get('/users', (req:Request,res:Response) => {

    fs.readFile(viewsPath+'users.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
})

server.get('/home', (req:Request,res:Response) => {

    fs.readFile(viewsPath+'home.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
})

//this is function that simply renders the html form
server.get('/register', (req:Request,res:Response) => {

    fs.readFile(viewsPath+'register.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of  order!');
        }
        res.send(content)
    });

})

// this is the post function of the register where we acctualy add the user to the database 
server.post('/register', async(req:Request,res:Response) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    await app.registerUser(new User(username,email,password));
    
    res.send("<h1> username :"+ username +"<h1/>"+"<h1> email : "+email+"<h1/>"+"<h1> password : "+password +"<h1/>");
});

server.get('/login', async (req:Request,res:Response) => {
    fs.readFile(viewsPath+'login.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
            res.send(content);
    });
});

server.post('/login', async (req:Request,res:Response) => {
    let email = req.body.email;
    let password = req.body.password;

    let authenticate:boolean = await app.authenticateUser(email,password);
    if(authenticate == false) res.redirect('/');
    else res.send('Welcome aboard');
});

server.get('/comments',(req:Request,res:Response) => {

    fs.readFile(viewsPath+'comments.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    })
})

server.get('/java',(req:Request,res:Response) => {

    fs.readFile(viewsPath+'java.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    })
})


//api that sends json contaning the users registered in the App class instance
server.get('/api/getUsers', async (req:Request,res:Response) => {
    
   let usersList = await app.listUsers();
   res.send(usersList);
    
});

server.get('/api/getPosts', async (req:Request,res:Response) => {

    let postsList = await app.listPosts();
    res.send(postsList);

});

//it gets all the comments from a given post id and then returns the array
server.get('/api/getComments/:postId', async (req:Request,res:Response) => {

    let commentList = await app.comments.list(req.params.postId);
    res.send(commentList);

});


server.get('/about', (req:Request,res:Response) => {
    fs.readFile(viewsPath+'about.html','utf-8', (err,content) =>{
        if(err != null){
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    })
})

server.get('/policy', (req:Request,res:Response) => {
    fs.readFile(viewsPath+'policy.html','utf-8', (err,content) =>{
        if(err != null){
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    })
})


server.listen(PORT, console.log('Server is up and listening on PORT '+PORT.toString()+'. You can check it up on '+baseUrl))