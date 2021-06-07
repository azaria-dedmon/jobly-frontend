import React, {useState} from 'react';
import './SearchBar.css'

function SearchBar({ getDetails }) {
    const [details, setDetails] = useState("")

    const handleChange = (e) => {
        setDetails(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getDetails(details.trim()|| undefined) 
        setDetails('')
    }
    console.log(details)
    return (
        <div className='search'>
            <form>
                <input id='details' 
                name="details" 
                type="text" 
                placeholder="Search.." 
                value={details} 
                onChange={handleChange}
                />
                <button id='filter-btn' type="submit" onClick={handleSubmit}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar