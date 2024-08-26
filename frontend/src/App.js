import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import Teams from './components/Teams';

const App = () => {

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/teams" element={<Teams />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
