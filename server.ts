import {Request,Response} from 'express'
import { App } from './src/control/app';
import { UserRepo } from './src/control/user-repo';
import { PostRepo } from './src/control/posts-repo';
import { User } from './src/models/user';
//imports of class instances
import {app} from './src/control/app'

const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const PORT = 3000;
const baseUrl = 'http://localhost:'+PORT.toString();
const viewsPath = './views/';
const srcPath = './src/';

server.use(express.static(path.join(__dirname,'views')));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)
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
//api that sends json contaning the users registered in the App class instance
server.get('/api/getUsers', async (req:Request,res:Response) => {
   // let app = new App(new UserRepo(),new PostRepo())
    let userList = await app.listUsers();
    //await app.registerUser(new User('redfield','redfield@mail.com','123'));
   // await app.registerUser(new User('hanyel','hanyel@mail.com','123'));
    //await app.registerUser(new User('daniel','daniel@mail.com','123'));
   // await app.registerUser(new User('pedro','pedro@mail.com','123'));
    let array = [1,2,3,4,5];
    //if(userList == null) res.status(500).send('Server could not acess list of users!');
    //else res.send(userList).json();
    await res.send(userList);
   // res.json(userList);
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

server.listen(PORT,console.log('Server is up and listening on port '+PORT.toString()+', you can check it up on '+ baseUrl ));