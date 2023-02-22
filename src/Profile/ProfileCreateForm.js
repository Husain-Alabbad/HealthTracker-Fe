import React from 'react'
import Doctor from '../Doctor';
import Clinic from '../Clinic';

export default function ProfileCreateForm(props) {

    const [newProfile, setNewProfile] = useState({});
    

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const Profile = { ...newProfile }
        Profile[attributeToChange] = newValue
        console.log(Profile)
        setNewProfile(Profile)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createProfile(newProfile)
        event.target.reset();
    }    

  return (
    <div>
        <h1>Create User Profile</h1>
        <form onSubmit={handleSubmit}>
        <div>
                    <label>Nationality</label>
                    <input type="text" name="nationality" onChange={handleChange}></input>
                 </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" name="dob" onChange={handleChange}></input>
                 </div>
                 <div>
                    <label>Favorite Doctor</label>
                    <input type="text" name="favDoctor" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Favorite Clinic</label>
                    <input type="text" name="favClinic" onChange={handleChange}></input>
                </div>
                <div>
                    <input type="submit" value="Create Profile"></input>
                 </div>
        </form>

    </div>
  )
}
