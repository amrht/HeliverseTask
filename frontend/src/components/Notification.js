import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, duration = 2000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const notificationStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: type === 'success' ? '#4CAF50' : '#F44336',
        color: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        fontSize: '16px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
    };

    return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
