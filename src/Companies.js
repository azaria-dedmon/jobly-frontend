import React, { useState, useEffect } from 'react';
import JoblyApi from './api'
import CompanyList from './CompanyList'
import SearchBar from './SearchBar'

function Companies() {
    const [company, setCompany] = useState([])

    useEffect(function getCompaniesOnMount() {
        getCompanies();
      }, []);

    async function getCompanies(data) {
        let companies = await JoblyApi.getCompanies(data);
        setCompany(companies)
    }
    return (
        <div> 
            <SearchBar getDetails={getCompanies}/>
            {company.map(c => <CompanyList company={c} />)}
        </div>
    )
}

export default Companies