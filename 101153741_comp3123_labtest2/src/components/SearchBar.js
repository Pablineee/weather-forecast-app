import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [ city, setCity ] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent browser from reloading when form is submitted
        if (city) {
            onSearch(city); // Call fetchWeather function in App.js using 'city' prop
            setCity(''); // Reset input
        }
    };

    return (
        <form onSubmit={handleSearch} className='d-flex justify-content-center mb-5'>
            <input
                type='text'
                placeholder='Enter city'
                value={city}
                className='form-control rounded me-2'
                onChange={(e) => setCity(e.target.value)}
            />
            <button className='rounded btn btn-dark' type='submit'>Search</button>
        </form>
    )
};

export default SearchBar;