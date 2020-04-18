import React from 'react';
import TopNavbar from '../components/navbar';
import {useToasts } from 'react-toast-notifications'

import { useInput } from '../utils/inputHook';

const AddDevices = () => {
    const { addToast } = useToasts();
    const { value: appName, bind: bindDeviceName, reset: resetDeviceName } = useInput('');
    const { value: watt, bind: bindDeviceWatt, reset: resetDeviceWatt } = useInput('');
    const { value: room, bind: bindRoom, reset: resetRoom} = useInput('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(!appName) {
            addToast("Device Name is Required", { appearance: 'warning', autoDismiss: true });
            return;
           
        }
        if(!watt) {
            addToast("Power is Required", { appearance: 'warning', autoDismiss: true });
            return;
           
        }
        if(!room) {
            addToast("Room is Required", { appearance: 'warning', autoDismiss: true });
            return;
           
        }
        const data = {appName,appRoom:room,watt:Number(watt)}
        const response = await fetch('/api/add', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        const resData = await response.json();
        console.log(resData)
            addToast("Device Added", { appearance: 'success', autoDismiss: true });
            resetDeviceName();
            resetDeviceWatt();
            resetRoom();
    }

    return (
        <>
            <TopNavbar/>
            <div className="hero-wrap" >
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-start">
                        <div className="col-lg-3 col"></div>

                        <div className="col-lg-6 col-md-6 mt-0 mt-md-5">
                                <form action="#" className="request-form ftco-animate" onSubmit={handleSubmit} style={{borderRadius:"50px"}}>
                                    <h2 style={{color:"#007bff"}}>Enter Device Details</h2>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter Device Name"
                                                {...bindDeviceName}  />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="Enter Power in Watt"
                                                {...bindDeviceWatt}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="room" placeholder="Enter Room"
                                                {...bindRoom}/>
                                            </div>
                                    <div className="form-group">
                                    <button type="submit" className="btn btn-primary py-3 px-4 mt-5">Submit</button>
                                    </div>
                                </form>
                            </div>
                        <div className="col-lg-3 col"></div>

                        </div>
                    </div>
            </div>
        </>
    )
}

export default AddDevices;