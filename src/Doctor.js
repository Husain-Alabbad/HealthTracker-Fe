import React, {useState} from 'react'
import doctorList from './data/doctorsList.json'


export default function Doctor(props) {
const [doctorId, setDoctorId] = useState("")


const handleDoctor = (e) =>{

    const doctorId = e.target.value;
    console.log("doctor value: ",e.target.value)
    setDoctorId (doctorId);
}
props.doctorData(doctorId);

  return (
    <div>
        <label>Doctor</label>
        <div className='doctor-select'>
            <select name="doctor" onChange={(e)=>handleDoctor(e)}>
                <option value="">--Select Doctor--</option>
                {
                    doctorList.map((doctor, index)=>(
                        <option value={doctor.doctor} key={index}>{doctor.doctor}</option>
                    ))
                }
            </select>
        </div>

    </div>
  )
}
