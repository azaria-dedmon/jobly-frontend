import React, { useState, useContext } from 'react';
import './JobCard.css'
import AppContext from './AppContext'

function JobCard({title, companyName, salary, equity, id}) {

    const { hasAppliedToJob, applyToJobListing } = useContext(AppContext);
    const [apply, setApply] = useState()

    React.useEffect(function updateAppliedStatus() {
    
        setApply(hasAppliedToJob(id));
      }, [id, hasAppliedToJob]);


    async function applyJob() {
        if (hasAppliedToJob(id)) return;
        applyToJobListing(id);
        setApply(true);
    }

    return (   
        <div className='job-details'>
            <p>{title}</p>
            {companyName ? <p>{companyName}</p> : null}
            {salary ? <p className='job-description'>Salary: {salary}</p> : null}
            <p className='job-description'>Equity: {equity}</p>
            <button className='apply-btn' onClick={applyJob} disabled={apply}>
                {apply ? 'APPLIED' : 'APPLY'}
            </button>
        </div>
    )
}

export default JobCard