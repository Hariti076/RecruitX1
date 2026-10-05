// Custom middleware: runs before every route.
// It prints the HTTP method and URL, then calls next().
function logger(req, res, next) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
