const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

// Root route
app.get('/', (req, res) => {
    res.send(`
        <h1>Backend running</h1>
        <h2>API Documentation</h2>
        <h3><a href="/api/users" target="_blank">/api/users</a></h3>
        <ul>
            <li><strong>GET <a href="/api/users" target="_blank">/api/users</a></strong> - Retrieve a list of users with pagination, search, and filters.</li>
            <li><strong>GET <a href="/api/users/3" target="_blank">/api/users/:id</a></strong> - Retrieve a specific user by ID.</li>
            <li><strong>POST /api/users</strong> - Create a new user.</li>
            <li><strong>PUT /api/users/:id</strong> - Update an existing user by ID.</li>
            <li><strong>DELETE /api/users/:id</strong> - Delete a user by ID.</li>
        </ul>
        <h3><a href="/api/teams" target="_blank">/api/teams</a></h3>
        <ul>
            <li><strong>GET <a href="/api/teams" target="_blank">/api/teams</a></strong> - Retrieve a list of teams with the users they contain.</li>
            <li><strong>GET <a href="/api/teams/66cd99fb8d89680f5368f883" target="_blank">/api/teams/:id</a></strong> - Retrieve a specific team by ID, including its users.</li>
            <li><strong>POST /api/teams</strong> - Create a new team with selected users.</li>
        </ul>
    `);
});

// Server
const PORT = 1337;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
