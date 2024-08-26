import React from 'react';

const Filters = ({ setFilters }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <div className="filters">
            <select name="domain" onChange={handleFilterChange}>
                <option value="">Select Domain</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
             </select>
            <select name="gender" onChange={handleFilterChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select name="available" onChange={handleFilterChange}>
                <option value="">Select Availability</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
            </select>
        </div>
    );
};

export default Filters;
