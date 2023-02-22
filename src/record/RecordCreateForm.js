import React,{useState} from 'react';

import doctorList from '../data/doctorsList.json'
import clinicList from '../data/clinicsList.json'




function RecordCreateForm(props) {

    const [newRecord, setNewRecord] = useState({});

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const record = { ...newRecord }
        record[attributeToChange] = newValue
        console.log(record)
        setNewRecord(record)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addRecord(newRecord)
        console.log('handlerecord: ',newRecord)
        event.target.reset();
    }

    
    return (
        <div className='create'>
            <h1>Add Record</h1>
            <form onSubmit={handleSubmit}>
                
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
                    <label>Symptoms</label>
                    <input type="text" name="symptoms" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Doctor Note</label>
                    <input type="text" name="doctorNote" onChange={handleChange}></input>
                </div>
                <div>
        <label>Medicine</label>
        <div className='medicine-select'>
            <select name="medicine" onChange={handleChange}>
                <option value="">--Select Medicine--</option>
                {
                    props.medicineList.map((medicine, index)=>(
                        <option value={medicine.name} key={index}>{medicine.name}</option>
                    ))
                }
            </select>
        </div>

    </div>
    <div>
        {/* <label>Appointment</label>
        <div className='appointment-select'>
            <select name="appointment" onChange={handleChange}>
                <option value="">--Select Appointment--</option>
                {
                    props.appointmentList.map((appointment, index)=>(
                        <option value={appointment.reason} key={index}>{appointment.reason}</option>
                    ))
                }
            </select>
        </div> */}

    </div>
                
                
                <div>
                    <input className='button' type="submit" value="Add Record"></input>
                 </div>
            </form>
            
            <button onClick={() => {props.cancel()}}>Cancel</button>
            
        </div>
    );
}

export default RecordCreateForm;