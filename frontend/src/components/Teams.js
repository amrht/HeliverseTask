import React, { useState, useEffect } from 'react';
import './Teams.css';
import UserCard from './UserCard';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://heliversetask-r1fg.onrender.com/api/teams');
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedTeam(null);
    };

    return (
        <div className="teams-container">
            <h1>Teams</h1>
            <div className="team-list">
                {teams.length > 0 ? (
                    teams.map(team => (
                        <div 
                            key={team._id} 
                            className="team-name" 
                            onClick={() => handleTeamClick(team)}
                        >
                            {team.name}
                        </div>
                    ))
                ) : (
                    <p>No teams found.</p>
                )}
            </div>
            {showPopup && selectedTeam && (
                <>
                    <div className="popup-overlay" onClick={handleClosePopup}></div>
                    <div className="popupTeams">
                        <div className="popup-content-teams">
                            <h2>{selectedTeam.name}</h2>
                            <button className="close-popup-button" onClick={handleClosePopup}>Close</button>
                            <div className="team-users-list">
                                {selectedTeam.users && selectedTeam.users.length > 0 ? (
                                    selectedTeam.users.map(user => (
                                        <div key={user._id} className="user-card-popup">
                                            <UserCard 
                                                onSelect={() => console.log("Clicked")} 
                                                user={user} 
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No users in this team.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Teams;
