import React, { useState, useEffect } from 'react';
import JoblyApi from './api'
import SearchBar from './SearchBar'

function CompanyCard() {
    const [getCompanyCard, setGetCompanyCard] = useState([])
    const [companyCard, setCompanyCard] = useState([])

    const formData = (data) => {
        let searchTerm = data.replace(/[\,]/g, "").replace(/[\s]/g, "-").toLowerCase()
        searchTerm = searchTerm.replace('-and','')
        setGetCompanyCard(searchTerm)
    }

    useEffect(() => {
        async function getCompany() {
            let companyCardDetails = await JoblyApi.getCompany(getCompanyCard);
            setCompanyCard(companyCardDetails)
        }
        getCompany()
    })

    return (
        <div>
            <SearchBar formData={formData}/>
        </div>
    )
}

export default CompanyCard