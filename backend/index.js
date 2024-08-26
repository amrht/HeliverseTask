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
    res.send('Backend running');
});

// Server
const PORT = 1337;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
