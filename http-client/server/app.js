const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./products.js');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({encoded:true}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

mongoose.connect(
    'mongodb://localhost:27017/http_client',
    {useNewUrlParser: true}
);

var myLogger = function (req, res, next){
    console.log(req.body);
    next();
}

app.use(myLogger);

app.get('/products',function(req,res){
        Product.find().lean().exec(
            (err,prods)=>{
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(prods);
            }
        )
    }
);

app.get('/productserr',function(req,res){
    setTimeout(
        () => {
            res.status(500).send({
                msg: "Error Message from The Server"
            });
        },2000
    )
});

app.get('/productsdelay',function(req,res){
    setTimeout( () => {    
        Product.find().lean().exec(
                (err,prods)=>{
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(200).send(prods);
                }
            );
        },2000);
});



app.get('/products_ids',function(req,res){
    Product.find().lean().exec(
        (err,prods)=>{
            if (err)
                res.status(500).send(err);
            else
                res.status(200).send(prods.map(p=>p._id));
        }
    )
}
);

app.get('/products/name/:id',function(req,res){
    const id=req.params.id;
    Product.findById(id,
        (err,prod)=>{
            if (err)
                res.status(500).send(err);
            if (!prod)
                res.status(404).send({});
            else
                res.status(200).send(prod.name);
        }
    )
}
);

app.post('/products', function (req,res) {
    console.log('PostSAveProduct');
    p= new Product({
        name:req.body.name,
        price: req.body.price,
        department: req.body.department
    });
    p.save((err,prod) =>{
        if (err)
            res.status(500).send(err);
        else  
            res.status(200).send(prod);
    }
    );
});

app.delete('/products:id', function(req,res){
    Product.deleteOne({_id: req.params.id},
        (err)=>{
            if (err)
                res.status(500).send(err);
            else
                res.status(200).send({});
        }
    )
});

app.path('/products/:id', function (req, res){
    Product.findById(req.params.id,(err,prod)=>{
      if (err)  
        res.status(500).send(err);
    else if (!prod)
        res.status(404).send({});
    else{
        prod.name=req.body.name;
        prod.price=req.body.price;
        prod.department=req.body.department;
        prod.save((err,prod)=>{
            if (err)
                res.status(500).send(err);
            else
                res.status(200).send(prod);
        });
    }
    })
});

app.listen(3000);