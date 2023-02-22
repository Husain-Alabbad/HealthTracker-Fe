import React,{useState} from 'react';
import doctorList from '../data/doctorsList.json'


export default function MedicineCreateForm(props) {

    const [newMedicine, setNewMedicine] = useState({});

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const medicine = { ...newMedicine }
        medicine[attributeToChange] = newValue
        console.log(medicine)
        setNewMedicine(medicine)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addMedicine(newMedicine)
        event.target.reset();
    }    


  return (
    <div className='create'>
        <h1>Add Medicine</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange}></input>
            </div>
            <div>
                <label>Expiry Date</label>
                <input type="date" name="expiryDate" onChange={handleChange}></input>
            </div>
            <div>
        <label>Doctor</label>
        <div className='doctor-select'>
            <select name="prescribedBy" onChange={handleChange}>
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
                <label>Dosage</label>
                <input type="text" name="dosage" onChange={handleChange}></input>
            </div>
            <div>
                <label>Directions</label>
                <input type="text" name="directions" onChange={handleChange}></input>
            </div>
            <div>
                <input className='button' type="submit" value="Add Medicine"></input>
            </div>
        </form>
        <button onClick={() => {props.cancel()}}>Cancel</button><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}
