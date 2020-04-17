const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();
const body = require('body-parser');
const DeviceModel = require('../model/device');

router.post('/room/', (req, res, next) => {
    try {
        console.log(req.body);
        
        const search={room: { $regex: '.*' + req.body.room + '.*' }};
        DeviceModel.find(search).then(doc => {
            res.status(200).json({
                status: true,
                doc: doc,
                meta:doc.length
            });
        }).catch(err => res.status(404).json({ status: false, message: err }));

    }
    catch (error) {
        res.status(404).json({
            status: false,
            message: "Error:- " + error
        });
    }
}).post('/device/', (req, res, next) => {
    try {
        console.log(req.body);
        const search={device: { $regex: '.*' + req.body.device + '.*' }};
        DeviceModel.find(search).then(doc => {
            res.status(200).json({
                status: true,
                doc: doc,
                meta:doc.length
            });
        }).catch(err => res.status(404).json({ status: false, message: err }));

    }
    catch (error) {
        res.status(404).json({
            status: false,
            message: "Error:- " + error
        });
    }
});

module.exports = router;
