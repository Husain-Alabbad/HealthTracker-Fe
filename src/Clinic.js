import React, {useState} from 'react'
import clinicList from './data/clinicsList.json'


export default function Clinic(props) {
const [clinicId, setClinicId] = useState("")


const handleClinic = (e) =>{
    const clinicId = e.target.value;
    console.log("clinic: ",e.target.value)
    setClinicId (clinicId);
}

props.clinicData(clinicId);

  return (
    <div>
        <label>Clinic</label>
        <div className='clinic-select'>
            <select name="clinic" onChange={(e)=>handleClinic(e)}>
                <option value="">--Select Clinic--</option>
                {
                    clinicList.map((clinic, index)=>(
                        <option value={clinic.clinic} key={index}>{clinic.clinic}</option>
                    ))
                }
            </select>
        </div>

    </div>
  )
}
