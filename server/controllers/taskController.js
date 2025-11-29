const Task = require('../models/Task');

/**
 * @desc    Get all tasks for the logged-in user
 * @route   GET /api/tasks
 * @access  Private
 */
exports.getTasks = async (req, res) => {
    try {
        // Fetch tasks specific to the authenticated user, sorted by newest first
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            user: req.user.id // Link task to the current user
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
exports.deleteTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Security Check: Verify user owns the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * @desc    Update a task (Title or Completion status)
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
exports.updateTask = async (req, res) => {
    const { title, isCompleted } = req.body;

    // Dynamically build object with fields to update
    const taskFields = {};
    if (title) taskFields.title = title;
    if (isCompleted !== undefined) taskFields.isCompleted = isCompleted;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Security Check: Verify ownership before update
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update and return the new document
        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: taskFields },
            { new: true }
        );

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};