import React from 'react'

export default function Profile(props) {
  return (
    <div>
        <p>{props.user.firstName + " " + props.user.lastName}</p>
        <p>{props.nationality}</p>
        <p>{props.dob}</p>
        <p>{props.favDoctor}</p>
        <p>{props.favClinic}</p>
        <p><button onClick={() => {props.editView(props._id)}}>Edit</button></p>
        <p><button onClick={() => {props.deleteProfile(props._id)}}>Delete</button></p> 
    </div>
  )
}
