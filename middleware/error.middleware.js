const errorMiddleware = (err, req, res, next) => {
  // Error-handling middleware
  // Default to 500 if no status is set
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack only in development
  });
};

module.exports = errorMiddleware;
