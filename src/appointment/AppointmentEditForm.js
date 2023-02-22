import React,{useState} from 'react';
import doctorList from '../data/doctorsList.json'
import clinicList from '../data/clinicsList.json'

function AppointmentEditForm(props) {

    const [appointment, setAppointment] = useState(props.appointment);

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedAppointment = { ...appointment }
        updatedAppointment[attributeToChange] = newValue
        console.log(updatedAppointment)
        setAppointment(updatedAppointment)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.editAppointment(appointment)
        event.target.reset();
    }
    return (
        <div className='create'>
            <h1>Edit Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date</label>

                    <input type="date" name="date" onChange={handleChange}></input>

                 </div>
                <div>
                    <label>Reason</label>
                    <input type="text" name="reason" onChange={handleChange} value={appointment.reason}></input>
                 </div>
                 <div>
                <label>Doctor</label>
                    <div className='doctor-select'>
                        <select name="doctor" onChange={handleChange}>
                            <option value="">{appointment.doctor}</option>
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
                            <option value="">{appointment.clinic}</option>
                            {
                             clinicList.map((clinic, index)=>(
                            <option value={clinic.clinic} key={index}>{clinic.clinic}</option>
                            ))
                            }
                        </select>
                    </div>

            </div>
                <div>
                    <input type="submit" value="Update Appointment"></input>
                 </div>
            </form>
            <button onClick={() => {props.cancel()}}>Cancel</button><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default AppointmentEditForm;