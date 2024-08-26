import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import Pagination from './Pagination';
import Filters from './Filters';
import Notification from './Notification';
import './UserList.css';
import { fetchUsers } from '../api/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchUsers(page, search, filters);
                setUsers(response.users);
                setTotalPages(response.pageInfo.totalPages);
            } catch (error) {
                console.error('Error loading users:', error);
                setUsers([]);
            }
        };

        loadUsers();
    }, [page, search, filters]);

    const handleUserSelect = (user) => {
        const isSelected = selectedUsers.includes(user);
        if (isSelected) {
            setSelectedUsers(prevSelected => prevSelected.filter(u => u !== user));
            showNotification(`${user.first_name} ${user.last_name} Removed`, 'error');
        } else {
            setSelectedUsers(prevSelected => [...prevSelected, user]);
            showNotification(`${user.first_name} ${user.last_name} Selected`, 'success');
        }
    };

    const showNotification = (message, type) => {
        setNotification(null);
        setTimeout(() => {
            setNotification({ message, type });
        }, 100);
    };

    const handleCreateTeam = async () => {
        if (teamName.trim() === '') {
            showNotification('Team name cannot be empty.', 'error');
            return;
        }

        if (selectedUsers.length === 0) {
            showNotification('Please select at least one user.', 'error');
            return;
        }

        const newTeam = {
            name: teamName,
            userIds: selectedUsers.map(user => user._id),
        };

        try {
            setLoading(true);
            console.log('Posting data to /api/teams:', newTeam);
            const response = await axios.post('http://localhost:1337/api/teams', newTeam);

            if (response.status === 201) {
                console.log('Team created successfully:', response.data);
                showNotification('Team created successfully!', 'success');
                setSelectedUsers([]);
                setTeamName('');
                setShowPopup(false);
            } else {
                console.error('Error response:', response);
                showNotification('Error creating team.', 'error');
            }
        } catch (error) {
            console.error('Error creating team:', error);
            showNotification('Error creating team.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleRemoveUser = (user) => {
        setSelectedUsers(prevSelected => prevSelected.filter(u => u !== user));
        showNotification(`${user.first_name} ${user.last_name} Removed`, 'error');
    };

    return (
        <div>
            {notification && (
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    duration={2000} 
                />
            )}
            <h1>User Management</h1>
            <div className="header">
                <div>
                    <Filters setFilters={setFilters} />
                    <input 
                        type="text" 
                        placeholder="Search by name" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                <a style={{textDecoration:'none'}} className="create-team-button" href='/teams'>
                    Show Teams
                </a>
                <button className="create-team-button" onClick={() => setShowPopup(true)}>
                    Create Team
                </button>
                </div>
            </div>
            <div className="user-list">
                {users.length > 0 ? (
                    users.map(user => (
                        <UserCard 
                            key={user._id} 
                            user={user} 
                            onSelect={() => handleUserSelect(user)} 
                            isSelected={selectedUsers.includes(user)} 
                        />
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
            <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={setPage} 
            />
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Selected Users</h2>
                        <button className="close-popup-button" onClick={handleClosePopup}>Close</button>
                        <input 
                            style={{ marginTop: '20px' }}
                            type="text" 
                            placeholder="Team Name" 
                            value={teamName} 
                            onChange={(e) => setTeamName(e.target.value)} 
                        />
                        <div className="selected-users-list">
                            {selectedUsers.map(user => (
                                <div key={user._id} className="user-card-popup">
                                    <UserCard 
                                        onSelect={() => handleRemoveUser(user)} 
                                        user={user} 
                                    />
                                    <p className="remove-text">Click to remove</p>
                                </div>
                            ))}
                        <button 
                            className="create-team-action-button"
                            onClick={handleCreateTeam}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Team'}
                        </button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;