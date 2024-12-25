const Task = require('../models/task');

const createTask = async (req, res) => {
    try {
        console.log('Request body:', req.body); 
        console.log('User ID from req.user:', req.user.id); 
        const task = new Task({
            ...req.body, 
            user: req.user.id, 
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error.message); 
        res.status(500).json({ error: error.message });
    }
};

// Get tasks for the logged-in user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }); 
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task's state 
const updateTaskState = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Ensure task belongs to the logged-in user
            { state: req.body.state },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found or not authorized' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Render tasks for the logged-in user
const renderTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }); 
        res.render('tasks', { tasks });
    } catch (error) {
        res.status(500).send('Error loading tasks');
    }
};

module.exports = { createTask, getTasks, updateTaskState, renderTasks };