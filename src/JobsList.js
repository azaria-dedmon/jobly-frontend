import React from 'react';
import JobCard from './JobCard'

function JobsList({jobs}) {
    return (
        <div class='jobList'>
            {jobs.map(j => <JobCard 
                            id={j.id}
                            title={j.title}
                            companyName={j.companyName}
                            salary={j.salary}
                            equity={j.equity}/>)}
        </div>
    )
}

export default JobsList