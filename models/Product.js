const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:String,
    price: Number,
    description:String,
    brand:String,
    img_url:String,
    category:String
})

const Product = mongoose.model('Product',ProductSchema);


module.exports = {
    Product
}