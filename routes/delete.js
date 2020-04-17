const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();
const body = require('body-parser');
const DeviceModel = require('../model/device');

router.post('/',(req,res,next)=>{
    try {
        //console.log(req.body.id);
        
        const filter = { _id: req.body.id };

        DeviceModel.findOneAndDelete(filter).then(doc => {
            res.status(200).json({ status: true, doc: doc });
        }).catch(err => {
            res.status(404).json({ status: false, message: err });
        });
    }
    catch(err){
        res.status(404).json({ status: false, message: err });
    }

});
module.exports=router;