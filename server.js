const express = require('express');
const mongoose = require('mongoose');
const { linkModel } = require('./db');
const app = express();
mongoose.connect('mongodb+srv://roopchandthakur48_db_user:hvAqANFPqW5sTAkN@cluster0.q9had5l.mongodb.net/link-shortner')
app.use(express.json());

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