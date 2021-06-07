import React, { useState, useContext } from "react";
import JoblyApi from './api'
import './Profile.css'
import AppContext from './AppContext'

function Profile() {
  const { currUser, setCurrUser } = useContext(AppContext);

    const [userInfo, setUserInfo] = useState({
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
      username: currUser.username,
      password: "",
      });

      console.log(currUser)
      function handleChange(evt) {
        const { name, value } = evt.target;
        setUserInfo(userInfo => (
            { ...userInfo, [name]: value }
            ));
      }

      async function handleSubmit(e) {

        e.preventDefault();
        let username = userInfo.username;
        let updatedUserInfo;

        let userData = {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password,
        };

        try {
          updatedUserInfo = await JoblyApi.editProfile(username, userData);
        } catch (errors) {
          console.error(`Something went wrong`, e)
          return;
        }

        setCurrUser(updatedUserInfo);
      }

    return (
            <form onSubmit={handleSubmit} className='profile-form'>
            <h1>Profile</h1>
                <label className='profile-label'>Username</label>
                <p>{currUser.username}</p>
                 <label className='profile-label'>First name</label>
                  <input
                      type="text"
                      name="firstName"
                      className="profile-input"
                      value={userInfo.firstName}
                      placeholder={currUser.firstName}
                      onChange={handleChange}
                  />
                <label className='profile-label'>Last name</label>
                  <input
                      type="text"
                      name="lastName"
                      className="profile-input"
                      value={userInfo.lastName}
                      placeholder={currUser.lastName}
                      onChange={handleChange}
                  />
                <label className='profile-label'>Email</label>
                  <input
                      type="text"
                      name="email"
                      className="profile-input"
                      value={userInfo.email}
                      placeholder={currUser.email}
                      onChange={handleChange}
                  />
                  <label className='profile-label'>Enter password to save changes!</label>
                  <input
                      type="password"
                      name="password"
                      className="profile-input"
                      value={userInfo.password}
                      onChange={handleChange}
                  />
                  <button className='profile-btn'>Save changes</button>
            </form>
    )
}

export default Profile