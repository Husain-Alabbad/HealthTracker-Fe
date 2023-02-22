import React from 'react'

export default function Medicine(props) {
  return (
    <>
        <td>{props.name}</td>
        <td>{props.expiryDate}</td>
        <td>{props.prescribedBy}</td>
        <td>{props.dosage}</td>
        <td>{props.directions}</td>
        <td>{props.user.firstName + " " + props.user.lastName}</td>
        <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
        <td><button onClick={() => {props.deleteMedicine(props._id)}}>Delete</button></td>
    </>
  )
}

