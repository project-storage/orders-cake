/**
 * Input validation utilities
 */

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Thai ID card validation regex
const thaiIdRegex = /^[0-9]{13}$/;

// Telephone validation regex (10 digits)
const telRegex = /^\d{10}$/;

// Time format validation regex (HH:MM:SS)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

// Validate email format
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Validate Thai ID card format
const validateThaiId = (idCard) => {
  return thaiIdRegex.test(idCard);
};

// Validate telephone format
const validateTelephone = (tel) => {
  return telRegex.test(tel);
};

// Validate time format
const validateTime = (time) => {
  return timeRegex.test(time);
};

// Validate date format (YYYY-MM-DD)
const validateDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) && dateString === date.toISOString().split('T')[0];
};

// Validate if date is in the future
const validateFutureDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

// Validate password strength
const validatePasswordStrength = (password) => {
  return password && password.length >= 6;
};

// Validate required fields
const validateRequiredFields = (obj, requiredFields) => {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!obj[field] || obj[field].toString().trim() === '') {
      missingFields.push(field);
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

// Validate string length
const validateStringLength = (str, min, max) => {
  if (typeof str !== 'string') return false;
  return str.length >= min && str.length <= max;
};

// Validate if value is a positive integer
const validatePositiveInteger = (value) => {
  return Number.isInteger(Number(value)) && Number(value) > 0;
};

// Validate if value is a positive decimal
const validatePositiveDecimal = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};

// Validate username format (alphanumeric and underscores)
const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username) && username.length >= 3;
};

module.exports = {
  validateEmail,
  validateThaiId,
  validateTelephone,
  validateTime,
  validateDate,
  validateFutureDate,
  validatePasswordStrength,
  validateRequiredFields,
  validateStringLength,
  validatePositiveInteger,
  validatePositiveDecimal,
  validateUsername
};