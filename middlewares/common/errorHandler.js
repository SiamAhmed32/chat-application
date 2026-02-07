const createError = require("http-errors");

function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found"));
}

// default error handler
function errorHandler(err, req, res, next) {
  // Always log the error to terminal for the developer
  console.error("SERVER ERROR:", err);

  res.locals.error = process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);

  // If the request expects JSON (like our AJAX calls)
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  } else {
    // For normal page loads
    res.render("error", {
      title: "Error Page",
    });
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
