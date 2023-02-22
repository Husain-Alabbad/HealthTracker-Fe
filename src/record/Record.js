import React from 'react';

function Record(props) {
    console.log("@@@@@@@@@@@@@@@@props@@@@@@@@@@@",props)  
    return (
        <>
            <td>{props.doctor}</td> 
            <td>{props.clinic}</td>
            <td>{props.symptoms}</td>
            <td>{props.doctorNote}</td>
            {/* <td>{props.appointment.reason}</td> */}
            <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
            <td><button onClick={() => {props.deleteRecord(props._id)}}>Delete</button></td>
        </>
    );
}

export default Record;