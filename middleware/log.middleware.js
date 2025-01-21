// Middleware to log API hits
const logMiddleware = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${
    req.originalUrl
  } - IP: ${req.ip}\n`;

  console.log(logMessage); // Optional: Print to the console
  next(); // Continue to the next middleware or route handler
};

module.exports = logMiddleware;
