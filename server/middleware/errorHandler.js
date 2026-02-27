// Error Handler Middleware - Centralized error handling

const errorHandler = (err, req, res, next) => {
  console.log('\n=== ERROR OCCURRED ===');
  console.log('Error message:', err.message);
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Time:', new Date().toISOString());

  // Only log stack trace in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Error stack:', err.stack);
  }
  console.log('=====================\n');

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Send error response
  const errorResponse = {
    error: {
      message: message,
      statusCode: statusCode,
      timestamp: new Date().toISOString()
    }
  };

  // Add stack trace in development mode
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;