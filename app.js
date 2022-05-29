// load dependencies
const express= require('express');
const logger= require('morgan');
const bodyParser= require('body-parser');

const Routes= require('./routes');
const {router} = require("express/lib/application");

// app configurations
const app= express();
const port= process.env.NODE_ENV || 3000;
app.set('port', port);

// load app middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',Routes);

app.post('/test',(req,res,next)=>{
    const Joi=require('joi');
    const data= req.body;
    const schema= Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
        birthday:Joi.date().min('1-1-2004').iso()
    });

    const validation= schema.validate(data);
    //res.send(validation)
    const id = Math.ceil(Math.random()*99999);
    if (validation){
        res.json({
            status:'success',
            message:"User created successfully",
            data:Object.assign({id},validation)
        })
    }else{
        res.status(422).json({
            status:'error',
            message:'Invalid request data',
            data: data
        });
    }
    /*Joi.validate(data,schema,(err,value)=>{


        if(err){
            res.status(422).json({
                status:'error',
                message:'Invalid request data',
                data: data
            });
        }else{
            res.json({
                status:'success',
                message:"User created successfully",
                data:Object.assign({id},value)
            })
        }
    })*/
})
// establishing http server connection
app.listen(port, ()=>{console.log(`App running on : http://localhost:${port}`)});