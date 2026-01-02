/**
 * Centralized error handling utilities
 */

// Standard error response formatter
const errorResponse = (res, statusCode, msg, details = null) => {
  return res.status(statusCode).json({
    status_code: statusCode,
    msg: msg,
    ...(details && { details })
  });
};

// Validation error handler
const handleValidationError = (res, errors) => {
  const errorMessages = errors.map(error => error.msg || error.message);
  return errorResponse(res, 400, 'Validation Error', errorMessages);
};

// Database error handler
const handleDatabaseError = (res, error) => {
  console.error('Database Error:', error);
  
  // Check for specific database error types
  if (error.name === 'SequelizeUniqueConstraintError') {
    const field = error.errors[0]?.path || 'Field';
    return errorResponse(res, 409, `${field} already exists`);
  }
  
  if (error.name === 'SequelizeValidationError') {
    const messages = error.errors.map(err => err.message);
    return errorResponse(res, 400, 'Validation Error', messages);
  }
  
  return errorResponse(res, 500, 'Database Error');
};

// Not found error handler
const handleNotFoundError = (res, resource = 'Resource') => {
  return errorResponse(res, 404, `${resource} not found`);
};

// Unauthorized error handler
const handleUnauthorizedError = (res) => {
  return errorResponse(res, 401, 'Unauthorized');
};

// Forbidden error handler
const handleForbiddenError = (res) => {
  return errorResponse(res, 403, 'Forbidden');
};

module.exports = {
  errorResponse,
  handleValidationError,
  handleDatabaseError,
  handleNotFoundError,
  handleUnauthorizedError,
  handleForbiddenError
};