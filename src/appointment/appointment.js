import React from 'react';

function Appointment(props) {
    return (
        <>
           
            <td>{props.date}</td> 
            <td>{props.reason}</td>
            <td>{props.doctor}</td>
            <td>{props.clinic}</td>
            <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
            <td><button onClick={() => {props.deleteAppointment(props._id)}}>Delete</button></td>
        </>
    );
}

export default Appointment;