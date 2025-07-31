import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    console.log(token); 

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please use a token.",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "Invalid token. Try again.",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export default adminAuth;
