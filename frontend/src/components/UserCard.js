import React from 'react';

const UserCard = ({ user, isSelected, onSelect }) => {
    return (
        <div
            className={`user-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(user)}
        >
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <h3>{user.first_name} {user.last_name}</h3>
            <p>{user.email}</p>
            <p>{user.domain}</p>
            <p>{user.gender}</p>
            <p>{user.available ? 'Available' : 'Not Available'}</p>
        </div>
    );
};

export default UserCard;
