const express = require('express');
const router = express.Router();
const { register, login, getMe, updatePassword } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// Strong Password Config
const passwordRule = check('password', 'Password must be 8+ chars, include uppercase, lowercase, number, and special char')
    .isStrongPassword({ 
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 1 
    });

// Same rule for "newPassword"
const newPasswordRule = check('newPassword', 'Password must be 8+ chars, include uppercase, lowercase, number, and special char')
    .isStrongPassword({ 
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 1 
    });

// Validation Arrays
const registerValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    passwordRule 
];

const passwordUpdateValidation = [
    newPasswordRule 
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/update-password', [auth, passwordUpdateValidation], updatePassword);

module.exports = router;