import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import './CompanyDetails.css'

function CompanyDetail() {
    const { handle } = useParams();
    const [company, setCompany] = useState('');

    useEffect(function getCompanyAndJobsForUser() {
      async function getCompanyInfo() {
        setCompany(await JoblyApi.getCompany(handle));
      }
      
      getCompanyInfo();
    }, [handle]);

    return (
        <div className='company-deets'>
                <h2>{company.name}</h2>
                <p>{company.description}</p>
                {company ? company.jobs.map(j => <JobCard id={j.id }title={j.title} salary={j.salary} equity={j.equity} />) : null}
        </div>
    )
}


export default CompanyDetail