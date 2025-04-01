export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleApiError = (error) => {
  console.error("[API Error]:", error);
  const message =
    error.response?.data?.message || "An unexpected error occurred";
  throw new AppError(message, error.response?.status);
};
