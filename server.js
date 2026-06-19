const express = require('express');
const mongoose = require('mongoose');
const { linkModel } = require('./db');
const app = express();
mongoose.connect('')
app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/short', async function(req, res){
    const url = req.body.url;
    const str = Math.random().toString(36).substring(2);
    await linkModel.create({
        originalUrl : url,
        shortUrl : str
    })
    res.json({
        "shorturl" : `http://localhost:3000/${str}`
    })
})
app.get('/:shorturl', async function(req, res){
    const shorturl = req.params.shorturl;
    const ans = await linkModel.findOne({
            shortUrl : shorturl
        })
    if(ans){
        res.redirect(`${ans.originalUrl}`);
    }else{
        res.json({
            "message" : "Please give valid URL"
        })
    }

    
})
app.listen(3000);