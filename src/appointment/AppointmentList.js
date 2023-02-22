import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Appointment from './appointment';
import AppointmentCreateForm from './AppointmentCreateForm';
import AppointmentEditForm from './AppointmentEditForm';
import '../index.css';

function AppointmentList({userProfile}) {
    console.log('props: ',userProfile)
//state declaration
    const [appointments, setAppointments] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [currentAppointment,setcurrentAppointment] = useState({})


    //React Hooks
useEffect(() => {
    loadAppointmentList();
}, []);
    
    const cancelHandler = () => {
        setIsAdd(false)
        setIsEdit(false)
    }

    const loadAppointmentList = () => {
        if (localStorage.getItem("userRole") === "user") {
            console.log("localStorage.getItem(userId):",localStorage.getItem("userId"))
            Axios.post("appointment/index/one",{"_id":`${localStorage.getItem("userId")}`} ,{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "_id":localStorage.getItem("userId")
                }
            })
                .then((res) => {
                    console.log("loadAppointmentList res", res);
                    console.log("res.data.appointments", res.data.appointments);
                    setAppointments(res.data.appointments)
                })
                .catch(err => {
                    console.log("Error Retreiving Appointments!!!")
                    console.log(err)
                })
            
        } else if (localStorage.getItem("userRole") === "admin") {
            console.log("UserRole:",localStorage.getItem("userRole"))
            Axios.get("appointment/index", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then((res) => {
                    console.log("res.data.appointments", res.data.appointments);
                    setAppointments(res.data.appointments)
                })
                .catch(err => {
                    console.log("Error Retreiving Appointments!!!")
                    console.log(err)
                })
        } 
    }

    // const loadArticlesList = (author) => {
    //     console.log(author)
    //     if(author.article){
    //         const articles = author.article.map((item, key) =>( 
    //             <td key={key}>
    //                 <li>{item.title}</li> 
    //             </td>
    //         ))
    //         return articles;
    //     }
    // }
    
    

    const addView = (appointment) => {
        Axios.get("appointment/add", appointment, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }

        })
        .then(res => {
            setIsAdd(true);
            setIsEdit(false)
        })
            .catch(err => {
            console.log("Error Loading Add Appointment View")
            console.log(err.message)
        })
    }


        const addAppointment = (appointment) => {
            console.log("appointment", appointment)
            appointment.user = localStorage.getItem("userId")
            // let userId = localStorage.getItem("userId")
            Axios.post("appointment/add", appointment, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then((res) => {
                    console.log("res", res);
                    console.log("Appointment added Successfully");
                    setIsAdd(false);
                    setIsEdit(false)
                    loadAppointmentList()
                })
                .catch((err) => {
                    console.log("Error Adding Appointment")
                    console.log(err)
                })
        
    }

    const editView = (id) => {
        console.log("id",id)
        Axios.get(`appointment/edit?_id=${id}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data.appointment)  
            let appointment = res.data.appointment
            setIsEdit(true);
            setIsAdd(false);
            setcurrentAppointment(appointment)
        })
            .catch(err => {
            console.log("Error Loading Appointment Information")
            console.log(err)
        })
    }

    const editAppointment = (appointment) => {
        Axios.put("appointment/update", appointment, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log("Appointment updated successfully")
                console.log(res);
                loadAppointmentList();
                setIsEdit(false)
            })
            .catch(err => {
                console.log("Error Editing Appointment");
                console.log(err);
        })
    }

    const deleteAppointment = (id) => {
        Axios.delete(`appointment/delete?_id=${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res)
                console.log("Record Deleted Successfully")
                loadAppointmentList();
            })
            .catch(err => {
                console.log("Error on deleting the record")
                console.log(err)
        })
    }
// console.log(appointments[0])
    const allAppointments = appointments.map((appointment, index) => (
        <tr key={index}>
            {/* {userProfile.firstName + " " + userProfile.lastName} */}
            <Appointment {...appointment} editView={editView} deleteAppointment={deleteAppointment} />
            
        </tr>
    ))
    return (
        <div>
            { (!isAdd) && (!isEdit) && 
                <>
                <h1 className='center'>Appointment List</h1>
                <button className="waves-effect waves-light btn" onClick={() => {addView()}}>add appointment</button>
                <div>
                    <table className='highlight'>
                        <tbody>
                            <tr>
                               
                                <th> Date </th>
                                <th> Reason </th>
                                <th> Doctor </th>
                                <th> Clinic </th>
                                <th> Edit </th>
                                <th> Delete </th>
                            </tr>
                            {allAppointments}
                        </tbody>
                    </table>
                </div>
                </>
           }
           
            
            {(isAdd) && <AppointmentCreateForm cancel={cancelHandler} addAppointment={addAppointment}></AppointmentCreateForm>}
            
            {(isEdit) && <AppointmentEditForm cancel={cancelHandler} key={currentAppointment._id} appointment={currentAppointment} editAppointment={editAppointment}></AppointmentEditForm>
}
        </div>
    );
}

export default AppointmentList;