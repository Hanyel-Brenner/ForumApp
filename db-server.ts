import {Request,Response} from 'express';
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
const srcPath = './src/';

server.use(express.static(path.join(__dirname,'db-views')));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)
//server.use("/js", express.static(__dirname + 'src'));


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

server.get('/comments',(req:Request,res:Response) => {
    fs.readFile(viewsPath+'comments.html','utf-8', (err,content) => {
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

//this api returns the 
/*server.get('/api/getComments/:postId', async (req:Request,res:Response)=>{
    let postIdString = req.params.postId;
    if(postIdString == null) 
    {
        let comments = await app.commentRepo.list(null)
        res.send(comments);
    }
    else{
    let comments = await app.commentRepo.list(req.params.postId)
    res.send(comments);
    }
})*/

server.get('/api/getComments', async (req:Request,res:Response) => {
    
    
    
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