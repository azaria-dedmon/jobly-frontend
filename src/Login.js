import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './Login.css'

function Login({login}) {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
      });

      const formHistory = useHistory();

      function handleChange(evt) {
        const { name, value } = evt.target;
        setUserInfo(userInfo => (
            { ...userInfo, [name]: value }
            ));
      }

      async function handleSubmit(e) {
        e.preventDefault();
        try {
          let result = await login(userInfo);
          if (result.success) {
            formHistory.push("/companies");
          }
      } catch(e) {
          console.error(`Something went wrong`, e)
      }
      }

    return (
            <form onSubmit={handleSubmit} className='login-form'>
            <h1>Login</h1>
            <label className='login-label'>Username</label>
                  <input
                      name="username"
                      className="login-input"
                      value={userInfo.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                  <label className='login-label'>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="login-input"
                      value={userInfo.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                  <button className='login-btn'>Submit</button>
            </form>
    )
}

export default Login