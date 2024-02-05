const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
const baseUrl = 'http://localhost:'+PORT.toString();

app.use(express.static('./views'));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)

app.get('/', (request,response) => {
    fs.readFile('./index.html', 'utf-8', (err,html) => {
        if(err != null){
            response.status(500).send('Sorry, the server is out of order!');
        }
        response.send(html);
    })
});

app.get('/home', (req,res) => {
    fs.readFile('.views/home.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
})

app.listen(PORT,console.log('Server is up and listening on port '+PORT.toString()+', you can check it up on '+ baseUrl ));