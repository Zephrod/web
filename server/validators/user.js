const Joi = require('joi');

// Define roles in constants for reusability
const ROLES = ['student', 'teacher', 'staff'];

const registerSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, one number and one special character',
      'any.required': 'Password is required'
    }),
  role: Joi.string().valid(...ROLES).required()
    .messages({
      'any.only': `Role must be one of ${ROLES.join(', ')}`,
      'any.required': 'Role is required'
    })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string().required()
    .messages({
      'any.required': 'Password is required'
    })
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  role: Joi.forbidden(),
  _id: Joi.forbidden()
}).min(1);

module.exports = { 
  registerSchema, 
  loginSchema, 
  updateSchema
};