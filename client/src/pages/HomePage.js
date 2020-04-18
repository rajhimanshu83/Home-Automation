import React, { useState,useEffect } from 'react';
import TopNavbar from '../components/navbar';
import moment from 'moment'
import {useToasts } from 'react-toast-notifications'
import { Button } from 'reactstrap';

const HomePage = () => {
    const [devices, setDevices] = useState([]);
    const [isChecked, setisChecked] = useState(true);
    const [deviceId, setdeviceId] = useState("");
    const { addToast } = useToasts();

    useEffect(async() => {
        const Response = await fetch('/api/get',{
            method: 'GET'
        });
        const Data = await Response.json();
        setDevices(Data.doc);
  }, []);

  const handleChange = (e)=> {
    setisChecked(e.target.checked);
    }

  const RemoveDevice = async(id)=> {
        const data = {id}
        const response = await fetch('/api/delete', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        const res = await response.json();
        if(res.status === true) {
            const devicesResponse = await fetch('/api/get');
            const UpdatedData = await devicesResponse.json();
            setDevices(UpdatedData.doc);
            addToast(`Device Deleted`, { appearance: 'success', autoDismiss: true });
            return;
        }
        addToast(`Error in uninstalling Device`, { appearance: 'warning', autoDismiss: true });
    }

const toggleChecked = async(id,sts,name)=> {
    setdeviceId(id);
    const onOff = sts ? "Off" : "On";
    const data = {status:!sts,_id:id}
    const response = await fetch('/api/operate', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
    const res = await response.json();
    console.log(res);
    if(res.status === true) {
        const devicesResponse = await fetch('/api/get');
        const UpdatedData = await devicesResponse.json();
        setDevices(UpdatedData.doc);
        setdeviceId("");
        addToast(`${name} turned ${onOff} successfully`, { appearance: 'success', autoDismiss: true });
        return;
    }
    addToast(`Error in turning ${name} ${onOff}`, { appearance: 'warning', autoDismiss: true });
}
    return (
        <>
         <TopNavbar/>
         <div class="cardresult" id="results" style={{paddingTop:"30px"}}>
        <ul class="header">
            <li>
                <h3>Name</h3>
                <dl class="dates">
                    <dt>Last Power On</dt>
                    <dd></dd>
                    <dt>Last Power OFF</dt>
                    <dd></dd>
                </dl>
                <dl class="info">
                    <dt>Status</dt>
                    <dd></dd>
                    <dt>Consumption</dt>
                    <dd></dd>
                    <dt>Room</dt>
                </dl>
            </li>
        </ul>
        <ul>
            {devices.length && devices.map(device=>(
                             <li>
                             <Button color="danger" onClick={()=>{RemoveDevice(device._id);}} style={{marginLeft:"82%",marginBottom:"5px"}}>Remove</Button>
                             <h3 style={{fontSize:"25px"}}>{device.device}</h3>

                             <dl class="dates">
                                 <dt>Last Power On</dt>
            <dd>{moment(new Date(device.lastPowerOn)).format('DD-MM-YYYY HH:mm')}</dd>
                                 <dt>Last Power OFF</dt>
                                 <dd>{moment(new Date(device.lastPowerOff)).format('DD-MM-YYYY HH:mm')}</dd>
                             </dl>
                             <dl class="info">
                                 <dt>Status</dt>
                                 <dd>
        {deviceId === device._id && <div className="loader" id="loader-4">
          <span></span>
          <span></span>
          <span></span>
        </div>}
            {deviceId === "" && <div className="switch">
                                     
                <span>
                  <input 
                    type="checkbox"
                    checked={device.status ? isChecked : !isChecked}
                    onChange={() => {handleChange(!device.status);}}
                  />
                  <button
                    className="slider"
                    type="button"
                    onClick={()=>{toggleChecked(device._id,device.status,device.device);}}>
                  </button>
                </span>
                <label></label>
            </div>}
                                 </dd>
                                 <dt>Consumption</dt>
            <dd>{Math.floor(device.powerConsumption)} watt</dd>
                                 <dt>Room</dt>
            <dd>{device.room}</dd>
                             </dl>
                         </li>
             ))}
        </ul>
    </div>
        </>
    )
}

export default HomePage;