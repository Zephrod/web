const { updateSchema } = require('../validators/user.validator');

const validateUpdateData = (req, res, next) => {
  // Validate request body against the schema
  const { error, value } = updateSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  });

  // If validation fails, send 400 error
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ 
      message: 'Validation failed',
      errors 
    });
  }

  // Attach validated data to the request
  req.validatedData = value;
  next(); // Proceed to controller
};

module.exports = validateUpdateData;