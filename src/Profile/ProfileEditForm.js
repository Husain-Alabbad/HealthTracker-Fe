import React, { useState } from 'react'

export default function ProfileEditForm() {

    const [profile, setProfile] = useState(props.profile);

    const handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedProfile = {...profile}
        updatedProfile[attributeToChange] = newValue
        console.log(updatedProfile)
        setProfile(updatedProfile)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.editProfile(profile);
        event.target.reset();
    }

  return (
    <div>
        <h1>Edit User Profile</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Nationality</label>
                <input type="text" name="nationality" onChange={handleChange} value={medicine.name}></input>
            </div>

            <div>
                <label>Date of Birth</label>
                <input type="date" name="dob" onChange={handleChange} value={medicine.doctor}></input>
            </div>

            <div>
                <label>Favorite Doctor</label>
                <input type="text" name="favDoctor" onChange={handleChange} value={medicine.dosage}></input>
            </div>

            <div>
                <label>Favorite Clinic</label>
                <input type="text" name="favClinic" onChange={handleChange} value={medicine.dosage}></input>
            </div>

            <div>
                <input type="submit" value="Update Profile">Update</input>
            </div>
        </form>
    </div>
  )
}
