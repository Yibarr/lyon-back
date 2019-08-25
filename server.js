const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const URL_MONGO ='mongodb+srv://yael:perro@angelhack2019-ayfog.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(URL_MONGO,{ useNewUrlParser: true },(err)=>{
    if (!err){
         console.log('Conexión exitosa')
        }else{
            console.log('shit')
        };
});

const {Product} = require('./models/Product')
const {Customer} = require('./models/Customer')


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

const PORT= 8000;

app.get('/',(request,response)=>{
    response.send({message:'Hola'})
});


app.post('/create/product',(req,res)=>{
    console.log(req.body)
    const {name,price,description,brand,QR,img_url,category} = req.body
    const NewProduct = Product({name,price,description,brand,QR,img_url,category});
    NewProduct.save((err,product)=>{
        err 
       ? res.status(409).send(err) 
       : res.status(201).send(product)
    })
});


app.post('/create/customer',(req,res)=>{
    console.log(req.body);
    const {username,cart} = req.body;
    const NewCustomer = Customer({username,cart});

    NewCustomer.save((err,customer)=>{
        err
        ? res.status(409).send(err) 
       : res.status(201).send(customer)
    })
})

app.get('/all/products',(req,res)=>{
    Product.find()
    .then(products => res.send(products))
    .catch(err => res.status(409).send(err))
});

app.get('/all/customers',(req,res)=>{
    Customer.find()
    .then(customers => res.send(customers))
    .catch(err => res.status(409).send(err))
});

app.get('/cart/:id',(req,res)=>{
    const {id} =req.params;
    Customer.findById(id)
    .populate('cart')
    .exec()
    .then(cart => cart ? res.send(cart) : res.status(404).send({message:'Product not found'}))
    .catch(err => res.status(409).send(err))


});


app.put('/add/product/:product/cart/:customer',(request,response)=>{
    const {customer,product} =request.params;
    Customer.findById(customer)
    .populate('cart')
    .exec()
    .then(res =>{
        const cartArr = res.cart;
        cartArr.push(`${product}`)
        Customer.updateOne({_id:`${customer}`},{$set:{cart:cartArr}},(err,res)=>{
            if (err) throw err;
            response.status(202).send(res)
        })
    })

    
    

});





app.listen(PORT,() => {
    console.log(`Express a iniciado el servidor en ${PORT}`)
})

