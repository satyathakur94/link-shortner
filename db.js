const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Link = new Schema({
    originalUrl : String,
    shortUrl : {type : String, unique : true}
})

const linkModel = mongoose.model('main-data', Link);

module.exports = {
    linkModel
};