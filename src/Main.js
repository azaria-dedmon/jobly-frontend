import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import NavBar from './Navbar'
import Homepage from './Homepage'
import Companies from './Companies'
import CompanyDetail from './CompanyDetails'
import Jobs from './Jobs'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import JoblyApi from './api'
import useLocalStorage from './hooks/appStorage'
import './Main.css'
import AppContext from './AppContext'

export const TOKEN_STORAGE_ID = "jobly-token";

function Main() {
    const [currUser, setCurrUser] = useState('')
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
    const [userApplications, setUserApplications] = useState(new Set([]));

    useEffect(function loadUserInfo() {
    
        async function currentUser() {
          if (token) {
            try {
              let { username } = jwt.decode(token);
              // put the token on the Api class so it can use it to call the API.
              JoblyApi.token = token;
              let currentUser = await JoblyApi.getCurrentUser(username);
              setCurrUser(currentUser);
              setUserApplications(new Set(currentUser.applications));
            } catch (err) {
              console.error("Could not find user", err);
              setCurrUser(null);
            }
          }
        }
        currentUser();
      }, [token]);

    async function signup(userInfo) {
        try {
          let token = await JoblyApi.signup(userInfo);
          setToken(token);
          return { success: true };
        } catch (e) {
          console.error("signup did not process correctly", e);
          return { success: false, e };
        }
      }

      async function login(loginData) {
        try {
          let token = await JoblyApi.login(loginData);
          setToken(token);
          return { success: true };
        } catch (e) {
          console.error("login did not process correctly", e);
          return { success: false, e };
        }
      } 

      async function logout() {
          try {
            setCurrUser(null)
            setToken(null)
          } catch(e) {
              console.error("logout did not process correctly", e)
              return { success: false, e };
          }
      }

      function hasAppliedToJob(id) {
        return applicationIds.has(id);
      }
      
      async function applyToJobListing(id) {
        if (hasAppliedToJob(id)) return;
        await JoblyApi.applyToJob(currUser.username, id);
        setUserApplications(new Set([...applicationIds, id]));
      }
    
    return (
        <>
            <BrowserRouter>
            <AppContext.Provider
                    value={{ currUser, setCurrUser, applyToJobListing, hasAppliedToJob}}>
                <NavBar logout={logout} currUser={currUser}/>
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    {
                      currUser ?
                    <Route exact path="/companies">
                        <Companies />
                    </Route>
                    : null
                    }
                    {
                      currUser ?
                      <Route exact path="/companies/:handle">
                        <CompanyDetail/>
                      </Route>
                      : null
                    }
                    {
                      currUser ?
                      <Route exact path="/jobs">
                        <Jobs />
                      </Route>
                      : null
                    }
                    <Route exact path="/login">
                        <Login login={login} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup userSignUp={signup}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </Switch>
              </AppContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default Main