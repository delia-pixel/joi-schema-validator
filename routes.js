const express= require('express');
const {next} = require("lodash/seq");
const router= express.Router();

// generic route handler
const genericHandler= (req, res, next)=>{
    res.json({
        status:'success',
        data:req.body
    })
}

// creat a new teacher or student
router.post('/people', genericHandler);

// change auth credentials for teacher
router.post('/auth/edit', genericHandler);

// accept fee payments for students
router.post('/fees/pay', genericHandler);

module.exports= router;