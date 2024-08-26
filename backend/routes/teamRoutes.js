const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, userIds } = req.body;
        const team = new Team({ name, users: userIds });
        await team.save();

        await User.updateMany(
            { _id: { $in: userIds } },
            { $set: { team: team._id } }
        );

        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().populate('users');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:idOrName', async (req, res) => {
    try {
        const { idOrName } = req.params;
        
        let team;
        if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
            team = await Team.findById(idOrName).populate('users');
        } else {
            team = await Team.findOne({ name: idOrName }).populate('users');
        }

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
