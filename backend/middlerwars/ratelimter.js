import rateLimit from "express-rate-limit";

export const emailLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: "Too many requests, try again later",
  },
});



