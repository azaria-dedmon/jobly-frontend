import React, { useState, useEffect } from 'react';
import JoblyApi from './api'
import SearchBar from './SearchBar'
import JobsList from './JobsList'

function Jobs() {
    const [jobs, setJobs] = useState([])
    
    useEffect(function getJobsOnMount() {
        getJobs();
    }, []);
    
    async function getJobs(data) {
        let jobs = await JoblyApi.getJobs(data);
        setJobs(jobs)
     }

    return (
        <>
            <SearchBar getDetails={getJobs}/>
            <JobsList jobs={jobs}/>
        </>
    )
}

export default Jobs