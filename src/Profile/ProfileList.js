import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Profile from './Profile';
import ProfileCreateForm from './ProfileCreateForm';
import ProfileEditForm from './ProfileEditForm';


export default function ProfileList({userProfile}) {

    console.log('props: ', userProfile);

    // States
    const [profile, setProfile] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentProfile, setCurrentProfile] = useState({});
    const [isAdd, setIsAdd] = useState(false);

    // Hooks
    useEffect(() => {
      loadProfileView();
      console.log('props.userProfile', userProfile);
    }, [userProfile]);

    const loadProfileView = () => {
      Axios.get("profile/index")
      .then((response) => {
        console.log(response.data.profile);
        setProfile(response.data.profile);
      })
      .catch((error) => {
        console.log("Error in fetching User Profile page");
        console.log(error);
      })
    }

    const addView = (profile) => {
      Axios.get("profile/add", profile, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }

      })
      .then((response) => {
          console.log(response);
          setIsAdd(true);
          // setIsEdit(false)
      })
          .catch((error) => {
          console.log("Error Loading Add profile View")
          console.log(error)
      })
  }

    const createProfile = (profile) => {
      console.log("Profile: ", profile);
      profile.user = localStorage.getItem("userId");
      Axios.post("profile/create", profile, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
        console.log("Profile was created successfully");
        console.log(response.data.profile);
        setIsAdd(false);
        loadProfileView();
    
        
      })
      .catch((error) => {
        console.log("Error in creating Profile");
        console.log(error);
      })
    }

    const editView = (id) => {
      Axios.get(`profile/edit?id=${id}`, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      .then((response) => {
          console.log("Loaded profile Information");
          console.log(response.data.profile);
          let profile = response.data.profile;
          setIsEdit(true);
          setCurrentProfile(profile);
      })
      .catch((error) => {
          console.log("Error Loading profile Information");
          console.log(error);
      })
    }

    const editProfile = (profile) => {
      Axios.put("profile/update", profile, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      .then((response) => {
          console.log("profile was Updated Successfully!!");
          console.log(response);
          loadProfileView();
          setIsEdit(false);
      })
      .catch((error) => {
          console.log("Error Editing profile");
          console.log(error);
      })
    }

    const deleteProfile = (id) => {
      Axios.delete(`profile/delete?id=${id}`, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      .then((response) => {
          console.log(response);
          console.log("profile Deleted Successfully");
          loadProfileView();
      })
      .catch((error) => {
          console.log("Error Deleting Author");
          console.log(error);
      })
    }


  return (
    <div>
        <h1>User Profile View</h1>

        <Profile editView={editView} deleteProfile={deleteProfile} nationality={nationality} dob={dob} favDoctor={favDoctor} favClinic={favClinic}  />
        

        {(isAdd) ?
        <ProfileCreateForm createProfile={createProfile}></ProfileCreateForm> 
        :
        null
        }

        {(isEdit) ?
        <ProfileEditForm key={currentProfile._id} profile={currentProfile} editProfile={editProfile}></ProfileEditForm>
        :
        null
        }

    </div>
  )
}
