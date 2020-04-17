const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();
const body = require('body-parser');
const DeviceModel = require('../model/device');


async function findDeviceAndAdd(myobj, res) {
    const mob = await DeviceModel.findOne({ device: myobj.device,room:myobj.room,watt:myobj.watt }).then(doc => {
        //.log(doc);

        if (doc == null) {

            const device = new DeviceModel(myobj);
            device.save().then(result => {
                console.log(result);

                res.status(200).json({
                    status: true,
                    message: "Data Saved",
                    docDevice: result,
                });

            }).catch(err => {
                res.status(400).json({
                    status: false,
                    message: "Data Not Saved" + err
                });
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: "Duplicate Devices can't be entered"
            });
        }
    }).catch(err => { res.status(400).json({ status: false, message: err }) });
}


router.post('/', function (req, res, next) {
    try {
        var myobj = {
            _id: new mongoose.Types.ObjectId(),
            device: req.body.appName,
            room: req.body.appRoom,
            watt:req.body.watt
        };

        findDeviceAndAdd(myobj, res);

    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "Error:- " + error
        });
    }
});

module.exports = router;
