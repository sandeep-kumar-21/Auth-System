const express = require('express');
const router = express.Router();
const { getTasks, createTask, deleteTask, updateTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.delete('/:id', auth, deleteTask);
router.put('/:id', auth, updateTask);

module.exports = router;