const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @route   GET /api/users
// @desc    Retrieve all users with pagination, search, and filtering support
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const domain = req.query.domain || '';
    const gender = req.query.gender || '';
    const available = req.query.available || '';

    try {
        const query = {};

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { first_name: { $regex: searchRegex } },
                { last_name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } }
            ];
        }

        if (domain) query.domain = domain;
        if (gender) query.gender = gender;
        if (available) query.available = available === 'true';

        const totalUsers = await User.countDocuments(query);
        const users = await User.find(query)
            .limit(limit)
            .skip((page - 1) * limit);

        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            pageInfo: {
                totalUsers,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
            users,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/users/:id
// @desc    Retrieve a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: Number(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/users
// @desc    Create a new user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   PUT /api/users/:id
// @desc    Update an existing user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ id: req.params.id });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
