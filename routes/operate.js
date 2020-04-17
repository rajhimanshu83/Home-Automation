const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();
const body = require('body-parser');
const DeviceModel = require('../model/device');
var moment = require("moment");


function findDuplicate(device, room,watt) {


    const filter = { device: device, room: room ,watt:watt};
    console.log(filter);

    let doc = DeviceModel.find(filter).then(doc => {

        return (doc);

    }).catch(err => res.status(404).json({ status: false, message: err }));
    return (doc);

}
function getDateById(_id) {
    const filter = { _id: _id };

    let lastPowerOn = DeviceModel.find(filter).then(doc => {

        return (doc);

    }).catch(err => res.status(404).json({ status: false, message: err }));
    return (lastPowerOn);
}


router.post('/', (req, res, next) => {
    try {
        // console.log(req.body.appName);
        if (req.body.device == null && req.body.status == 1) {

            let lastPowerOn = new Date();



            const filter = { _id: req.body._id };
            const update = { $set: { status: req.body.status, lastPowerOn: lastPowerOn } };

            DeviceModel.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false }).then(doc => {
                res.status(200).json({ status: true, doc: doc });
            }).catch(err => {
                res.status(404).json({ status: false, message: err });
            });
        }
        else if (req.body.device == null && req.body.status == 0) {
            let lastPowerOff = new Date();

            getDateById(req.body._id).then(doc => {
                //console.log(lastPowerOn);
                var start_date = moment(doc[0].lastPowerOn, 'YYYY-MM-DD HH:mm:ss');
                var end_date = moment(lastPowerOff, 'YYYY-MM-DD HH:mm:ss');

                var hours = moment.duration(end_date.diff(start_date)).asHours();
                var watt = doc[0].watt;
                var powerConsumption = doc[0].powerConsumption + (watt * hours); //total power conspuntion

                const filter = { _id: req.body._id };
                const update = { $set: { status: req.body.status, lastPowerOff: lastPowerOff, powerConsumption: powerConsumption } };

                DeviceModel.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false }).then(doc => {
                    res.status(200).json({ status: true, doc: doc });
                }).catch(err => {
                    res.status(404).json({ status: false, message: err });
                });
            });


        }
        else {
           
            const filter = { _id: req.body._id };
            
            

            const update = { $set: { device: req.body.device, room: req.body.room, watt: req.body.watt } };

            findDuplicate(req.body.device, req.body.room,req.body.watt).then(doc => {
                if (doc.length==0) {
                    console.log(doc);
                    
                    DeviceModel.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false }).then(doc => {
                        res.status(200).json({ status: true, doc: doc });
                    }).catch(err => {
                        res.status(404).json({ status: false, message: err });
                    });
                }
                else {
                    console.log(doc);
                    res.status(200).json({ status: false, message: "Duplicate Enteris cant be taken" });
                }
            }).catch(err => res.status(404).json({ status: false, message: err }));


        }

    }
    catch (err) {
        res.status(404).json({ status: false, message: err });
    }
});

module.exports = router;
