import React,{useState} from 'react';
import doctorList from '../data/doctorsList.json'

export default function MedicineEditForm(props) {

    const [medicine, setMedicine] = useState(props.medicine);

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedMedicine = {...medicine}
        updatedMedicine[attributeToChange] = newValue
        console.log(updatedMedicine)
        setMedicine(updatedMedicine)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.editMedicine(medicine);
        event.target.reset();
    }

  return (
    <div className='create'>
         <h1>Edit Medicine</h1>

         <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} value={medicine.name}></input>
            </div>
            <div>
                <label>Expiry Date</label>
                <input type="date" name="expiryDate" onChange={handleChange} value={medicine.expiryDate}></input>
            </div>
            <div>
        <label>Doctor</label>
        <div className='doctor-select'>
            <select name="prescribedBy" onChange={handleChange}>
                <option value="">{medicine.prescribedBy}</option>
                {
                    doctorList.map((doctor, index)=>(
                        <option value={doctor.doctor} key={index}>{doctor.doctor}</option>
                    ))
                }
            </select>
        </div>

    </div>
            <div>
                <label>Dosage</label>
                <input type="text" name="dosage" onChange={handleChange} value={medicine.dosage}></input>
            </div>
            <div>
                <label>Directions</label>
                <input type="text" name="directions" onChange={handleChange} value={medicine.directions}></input>
            </div>
            <div>
                <input className='button' type="submit" value="Update Medicine"></input>
            </div>
        </form>
        <button onClick={() => {props.cancel()}}>Cancel</button><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}
