import {Request,Response} from 'express'
import { App } from './control/app';
import { UserRepo } from './control/user-repo';
import { PostRepo } from './control/posts-repo';
import { User } from './models/user';

const fs = require('fs');
const express = require('express');
const server = express();
const app = new App(new PostRepo(),new UserRepo() )  //instance of App class created
const PORT = 3000;
const baseUrl = 'http://localhost:'+PORT.toString();
server.use(express.static('src/views'));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)


server.get('/', (request:Request,response:Response) => {
    fs.readFile('./index.html', 'utf-8', (err,html) => {
        if(err != null){
            response.status(500).send('Sorry, the server is out of order!');
        }
        response.send(html);
    })
});

server.get('/home', (req:Request,res:Response) => {
    fs.readFile('./src/views/home.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
})

server.get('/about', (req:Request,res:Response) => {
    fs.readFile('./src/views/about.html','utf-8', (err,content) =>{
        if(err != null){
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    })
})

server.get('/policy', (req:Request,res:Response) => {
    fs.readFile('./src/views/policy.html','utf-8', (err,content) =>{
        if(err != null){
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    })
})

server.get('/Console/getUsers', async (req:Request,res:Response) =>{  //this is function for admin only
    let list =  await app.listUsers();
    console.log('USER LIST')
    if(list == null) {
        console.log('No users registered');
        res.json({message: 'No users registered'});
    }
    else 
    {
        console.log(list);
        res.json({message: '${list}'})
    }
})

server.listen(PORT,console.log('Server is up and listening on port '+PORT.toString()+', you can check it up on '+ baseUrl ));