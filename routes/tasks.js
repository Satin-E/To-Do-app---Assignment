const express = require('express');
const Task = require('../models/task');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');


router.use(authenticate);

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title, user: req.user.id }); 
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks for the logged-in user
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task state
router.put('/:id', async (req, res) => {
    try {
        const { state } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, 
            { state },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found or not authorized' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id }); 
        if (!task) return res.status(404).json({ error: 'Task not found or not authorized' });
        res.json({ message: 'Task deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Render tasks for the logged-in user
router.get('/ui', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.render('tasks', { tasks });
    } catch (error) {
        res.status(500).send('Error loading tasks');
    }
});

module.exports = router;