import React from 'react';
import { Link } from "react-router-dom";
import './CompanyList.css'

function CompanyList({company}) {
    return (
        <div className="company-details">
            <Link className="company-links" to={`/companies/${company.handle}`}>
                <img src={company.logoUrl} />
                <p>{company.name}</p>
                <p className='company-description'>{company.description}</p>
            </Link>
        </div>
    )
}

export default CompanyList