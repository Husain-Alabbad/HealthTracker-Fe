import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import doctorList from '../data/doctorsList.json'
import clinicList from '../data/clinicsList.json'


function AppointmentCreateForm(props) {

    const [newAppointment, setNewAppointment] = useState({});

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const appointment = { ...newAppointment }
        appointment[attributeToChange] = newValue
        console.log(appointment)
        setNewAppointment(appointment)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addAppointment(newAppointment)
        console.log('handlesubmit: ',newAppointment)
        event.target.reset();
    }
    return (
        <div className='create'>
            <h1>Add Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date</label>
                    <input type="date" name="date" onChange={handleChange}></input>
                 </div>
                <div>
                    <label>Reason</label>
                    <input type="text" name="reason" onChange={handleChange}></input>
                 </div>
                 <div>
        <label>Doctor</label>
        <div className='doctor-select'>
            <select name="doctor" onChange={handleChange}>
                <option value="">--Select Doctor--</option>
                {
                    doctorList.map((doctor, index)=>(
                        <option value={doctor.doctor} key={index}>{doctor.doctor}</option>
                    ))
                }
            </select>
        </div>

    </div>
    <div>
        <label>Clinic</label>
        <div className='clinic-select'>
            <select name="clinic" onChange={handleChange}>
                <option value="">--Select Clinic--</option>
                {
                    clinicList.map((clinic, index)=>(
                        <option value={clinic.clinic} key={index}>{clinic.clinic}</option>
                    ))
                }
            </select>
        </div>

    </div>
                <div>
                    <input className='button' type="submit" value="Add Appointment"></input>
                 </div>
            </form>
            <button onClick={() => {props.cancel()}}>Cancel</button><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default AppointmentCreateForm;