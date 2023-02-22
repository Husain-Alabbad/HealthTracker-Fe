import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Medicine from './Medicine';
import MedicineCreateForm from './MedicineCreateForm';
import MedicineEditForm from './MedicineEditForm';
import '../index.css';

export default function MedicineList({userProfile}) {

    console.log('props: ', userProfile);

    // states
    const [medicine, setMedicine] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentMedicine, setCurrentMedicine] = useState({});
    const [isAdd, setIsAdd] = useState(false);





    // Hooks



    
    const cancelHandler = () => {
        setIsAdd(false)
        setIsEdit(false)
    }
    
    useEffect(() => {
        loadMedicineList();
        console.log('props.userProfile', userProfile)
    }, [userProfile,]);
 
    const loadMedicineList = () => {
        if (localStorage.getItem("userRole") === "user") {
            console.log("localStorage.getItem(userId):",localStorage.getItem("userId"))
            Axios.post("medicine/index/one",{"_id":`${localStorage.getItem("userId")}`} ,{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "_id":localStorage.getItem("userId")
                }
            })
                .then((res) => {
                    console.log("loadMedicineList res", res);
                    console.log("res.data.medicine", res.data.medicine);
                    setMedicine(res.data.medicine)
                    console.log("Medicine:",medicine)
                })
                .catch(err => {
                    console.log("Error Fetching medicines!!!")
                    console.log(err)
                })
            
        } else if (localStorage.getItem("userRole") === "admin") {
            console.log("UserRole:",localStorage.getItem("userRole"))
            Axios.get("medicine/index", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then((res) => {
                    console.log("res.data.medicine", res.data.medicine);
                    setMedicine(res.data.medicine)
                    console.log("Medicine:",medicine)
                })
                .catch(err => {
                    console.log("Error Fetching medicines!!!")
                    console.log(err)
                })
        } 
    }
    const addView = (medicine) => {
        Axios.get("medicine/add", medicine, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }

        })
        .then(res => {
            setIsAdd(true);
            setIsEdit(false)
        })
            .catch(err => {
            console.log("Error Loading Add medicine View")
            console.log(err)
        })
    }

    const addMedicine = (medicine) => {
        console.log("Medicine: ", medicine);
        medicine.user = localStorage.getItem("userId")
        Axios.post("medicine/add", medicine, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response.data.medicine)
            console.log("Medicine was Added Successfully!!!");
            setIsAdd(false);
            setIsEdit(false);
            loadMedicineList();
        })
        .catch((error) => {
            console.log("Error Adding Medicine");
            console.log(error);
        })
        
    }

    const editView = (id) => {
        console.log("medicine id: ",id);
        Axios.get(`medicine/edit?_id=${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log("Loaded medicine Information");
            console.log("check this ",response.data.medicine);
            let medicine = response.data.medicine;
            setIsEdit(true);
            setIsAdd(false);
            setCurrentMedicine(medicine);
            console.log("medicineeeeeeeeeee: ",medicine);
        })
        .catch((error) => {
            console.log("Error Loading medicine Information");
            console.log(error);
        })
    }

    const editMedicine = (medicine) => {
        Axios.put("medicine/update", medicine, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log("medicine was Updated Successfully!!");
            console.log(response);
            loadMedicineList();
            setIsEdit(false);
        })
        .catch((error) => {
            console.log("Error Editing medicine");
            console.log(error);
        })
    }

    const deleteMedicine = (id) => {
        console.log("medicine id: ",id);
        Axios.delete(`medicine/delete?_id=${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response);
            console.log("Medicine Deleted Successfully");
            loadMedicineList();
        })
        .catch((error) => {
            console.log("Error Deleting Medicine");
            console.log(error);
        })
    }

    const allMedicines = medicine.map((medicine, index) => (
        <tr key={index}>
   
          <Medicine {...medicine} editView={editView} deleteMedicine={deleteMedicine}/>
          {/* {loadMedicineList(medicine)} */}
        </tr>  
    ))

  return (
    <div>
         { (!isAdd) && (!isEdit) && 
                <>
                <h1 className='center'>Medicine List</h1>
                <button className="waves-effect waves-light btn" onClick={() => {addView()}}>add medicine</button>
                <div>
                    <table className='highlight'>
                        <tbody>
                        <tr>
                            <th> Name </th>
                            <th> Expiry Date</th>
                            <th> Prescribed By </th>
                            <th> Dosage </th>
                            <th> Directions </th>
                            <th> Edit </th>
                            <th> Delete </th>
                        </tr>
                        {allMedicines}
                        </tbody>
                    </table>
                </div>
                </>
           }
           
            
            {(isAdd) && <MedicineCreateForm cancel={cancelHandler} addMedicine={addMedicine}></MedicineCreateForm>}
            
            {(isEdit) && <MedicineEditForm cancel={cancelHandler} key={currentMedicine._id} medicine={currentMedicine} editMedicine={editMedicine}></MedicineEditForm>
}
        </div>
  )
}
