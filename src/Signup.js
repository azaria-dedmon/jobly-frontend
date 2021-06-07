import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './Signup.css'

function Signup({userSignUp}) {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
      });
    const formHistory = useHistory();

      function handleChange(e) {
        const { name, value } = e.target;
        setUserInfo(userInfo => (
            { ...userInfo, [name]: value }
            ));
      }

      async function handleSubmit(e) {
        e.preventDefault();
        let result = await userSignUp(userInfo);
        if (result.success) {
            formHistory.push("/companies");
        } else {
            console.error(`Something went wrong`, e)
        }
      }
    return (
        <>
        <form onSubmit={handleSubmit} className='signup-form'>
        <h1>Sign Up</h1>
            <label className='signup-label'>Username</label>
                  <input
                      name="username"
                      className="signup-input"
                      value={userInfo.username}
                      onChange={handleChange}
                      required
                  />
                  <label className='signup-label'>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="signup-input"
                      value={userInfo.password}
                      onChange={handleChange}
                      required
                  />
                  <label className='signup-label'>First name</label>
                  <input
                      name="firstName"
                      className="signup-input"
                      value={userInfo.firstname}
                      onChange={handleChange}
                      required
                  />
                  <label className='signup-label'>Last name</label>
                  <input
                      name="lastName"
                      className="signup-input"
                      value={userInfo.lastname}
                      onChange={handleChange}
                      required
                  />
                  <label className='signup-label'>Email</label>
                  <input
                      name="email"
                      className="signup-input"
                      value={userInfo.email}
                      onChange={handleChange}
                      required
                  />
                  <button className='signup-btn'>Submit</button>
            </form>
        </>
    )
}

export default Signup