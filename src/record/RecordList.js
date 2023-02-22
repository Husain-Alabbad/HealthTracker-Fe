import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Record from './Record';
import RecordCreateForm from './RecordCreateForm';
import RecordEditForm from './RecordEditForm';
import '../index.css';
function RecordList(props) {
    console.log('userProfile: ',props)
//state declaration
    const [records, setRecords] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [currentRecord,setcurrentRecord] = useState({})
    const [medicine, setMedicine]= useState([])
    const [appointment, setAppointment]= useState("")

    //React Hooks
const cancelHandler = () => {
    setIsAdd(false)
    setIsEdit(false)
}
useEffect(() => {
    loadRecordList();
}, []);
const loadRecordList = () => {
    Axios.get("record/index",{
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then((res) => {
        console.log("res.data.records",res.data.records);
        setRecords(res.data.records)
    })
        .catch(err => {
            console.log("Error Retreiving Records!!!")
    console.log(err)
})
}
    // const loadAppointmentList = (record) => {
    //     console.log("load appointmment list ",record)
    //     if(record.appointment){
    //         const appointments = record.appointment.map((item, key) =>(
    //             <td key={key}>
    //                 <li>{item.reason}</li>
    //             </td>
    //         ))
    //         return appointments;
    //     }
    // }

 const loadMedicineList = (record) => {
        console.log("load medicine list ",record)
        if(record.medicine){
            const medicines = record.medicine.map((item, key) =>(
                <td key={key}>
                    <li>{item.name}</li>
                </td>
            ))
            return medicines;
        }
    }


    const addView = (record) => {
        Axios.get("record/add", record, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            
        })
        .then(res => {
            setIsAdd(true);
            setIsEdit(false)
            console.log("record ",res)
            
        })
        .catch(err => {
            console.log("Error Loading Add Record View")
            console.log(err.message)
        })


        Axios.get("medicine/index",medicine, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            
        }).then(res => {
            setIsAdd(true);
            setIsEdit(false)
            console.log("medicineeeeee ",res.data.medicines)
            let medicine= res.data.medicines
            setMedicine(medicine)
        })
        .catch(err => {
            console.log("Error Loading Add Record View")
            console.log(err.message)
        })

        Axios.get("appointment/index",appointment, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            
        })
        
        .then(res => {
            setIsAdd(true);
            setIsEdit(false)
            console.log("apoinmeeeee ",res.data.appointments)
            let appointment= res.data.appointments
            setAppointment(appointment)

        })
            .catch(err => {
            console.log("Error Loading Add Record View")
            console.log(err.message)
        })
    }


    const addRecord = (record) => {
        console.log("record", record)
        record.user = localStorage.getItem("userId")
        // let userId = localStorage.getItem("userId")
        Axios.post("record/add", record, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                console.log("res",res);
                console.log("Record added Successfully");
                setIsAdd(false);
                setIsEdit(false)
                loadRecordList()
            })
            .catch((err) => {
                console.log("Error Adding Record")
            console.log(err)
        })
    }
    const editView = (id) => {
        console.log("id",id)
        Axios.get(`record/edit?_id=${id}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("res.data.record",res.data.record)
            let record = res.data.record
            setIsEdit(true);
            setIsAdd(false);
            setcurrentRecord(record)
        })
            .catch(err => {
            console.log("Error Loading Record Information")
            console.log(err)
        })
    }
    const editRecord = (record) => {
        Axios.put("record/update", record, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log("Record updated successfully")
                console.log(res);
                loadRecordList();
                setIsEdit(false)
            })
            .catch(err => {
                console.log("Error Editing Record");
                console.log(err);
        })
    }
    const deleteRecord = (id) => {
        Axios.delete(`record/delete?_id=${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res)
                console.log("Record Deleted Successfully")
                loadRecordList();
            })
            .catch(err => {
                console.log("Error on deleting the record")
                console.log(err)
        })
    }
// console.log(record[0])
    const allRecords = records.map((record, index) => (
        <tr key={index}>
            <Record {...record} editView={editView} deleteRecord={deleteRecord} />
            {/* {loadAppointmentList(record)}  */}
            {loadMedicineList(record)}
        </tr>
    ))
    return (
        <div>
        { (!isAdd) && (!isEdit) &&
            <>
            <h1 className='center'>Record List</h1>
            <button className="waves-effect waves-light btn" onClick={() => {addView()}}>add record</button>
            <div>
                <table className='highlight'>
                    <tbody>
                        <tr>
                            <th> Doctor </th>
                            <th> Clinic </th>
                            <th> Symptoms </th>
                            <th> Doctor Note </th>
                            <th> Edit </th>
                            <th> Delete </th>
                            <th> Medicine </th>
                            <th> Appointment </th>
                            
                            
                        </tr>
                        {allRecords}
                    </tbody>
                </table>
            </div><br/><br/><br/><br/><br/><br/><br/>
            </>
       }
        {(isAdd) && <RecordCreateForm appointmentList={appointment} medicineList={medicine} cancel={cancelHandler} addRecord={addRecord}></RecordCreateForm>}
        {(isEdit) && <RecordEditForm cancel={cancelHandler} key={currentRecord._id} record={currentRecord} editRecord={editRecord}></RecordEditForm>
}
    </div>
    );
}
export default RecordList;