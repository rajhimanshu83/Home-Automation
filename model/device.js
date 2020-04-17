const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    device: { type:String, required:true },
    room: { type:String, required:true },
    status: { type:Number, default:0 },
    watt:{ type:Number, default:0 },
    lastPowerOn:{type:Date, default: Date.now},
    lastPowerOff:{type:Date, default: Date.now},
    powerConsumption:{type:Number,default:0},
    created_at: {type: Date, default: Date.now} 
   
});

module.exports=mongoose.model('device',deviceSchema);