const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: Object.values(err.errors).map((val) => val.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "Invalid data format",
    });
  }

  res.status(500).json({
    success: false,
    error: "Server Error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
