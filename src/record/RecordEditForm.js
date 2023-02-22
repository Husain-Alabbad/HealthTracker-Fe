import React,{useState} from 'react';
import doctorList from '../data/doctorsList.json'
import clinicList from '../data/clinicsList.json'

function RecordEditForm(props) {

    const [record, setRecord] = useState(props.record);

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedRecord = { ...record }
        updatedRecord[attributeToChange] = newValue
        console.log(updatedRecord)
        setRecord(updatedRecord)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.editRecord(record)
        event.target.reset();
    }
    return (
        <div className='create'>
            <h1>Edit Record</h1>
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
                    <input type="text" name="symptoms" onChange={handleChange} value={record.symptoms}></input>
                </div>
                <div>
                    <label>Doctor Note</label>
                    <input type="text" name="doctorNote" onChange={handleChange} value={record.doctorNote}></input>
                </div>
                <div>
                    <label>Medicine</label>
                    <input type="text" name="medicine" onChange={handleChange} value={record.medicine}></input>
                </div>
                <div>
                    <label>Appointment</label>
                    <input type="text" name="appointment" onChange={handleChange} value={record.appointment}></input>
                </div>
                <div>
                    <input className='button' type="submit" value="Update Record"></input>
                 </div>
            </form>
            <button onClick={() => {props.cancel()}}>Cancel</button><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default RecordEditForm;