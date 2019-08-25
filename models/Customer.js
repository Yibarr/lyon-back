const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    username:String,
    cart:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }]
    }
})

const Customer = mongoose.model('Customer',CustomerSchema);


module.exports = {
    Customer
}