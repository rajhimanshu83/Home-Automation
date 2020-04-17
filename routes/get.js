const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();
const body = require('body-parser');
const DeviceModel = require('../model/device');

router.get('/', (req, res, next) => {
    try {

        DeviceModel.find().then(doc => {
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
})
    .get('/:active', (req, res, next) => {
        try {
            const filter = { status: req.params.active }
            console.log(filter);

            DeviceModel.find(filter).then(doc => {
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