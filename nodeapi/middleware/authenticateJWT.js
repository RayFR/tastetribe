const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  console.log("HELLO");

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    console.log("Authenticated user:", user);  
    req.user = user;
    next();
  });
}

function generateToken(user) {
  return jwt.sign(
    { uid: user.uid, username: user.username }, 
    process.env.JWT_SECRET_KEY,
    { expiresIn: '4h' }
  );
}

module.exports = { authenticateJWT, generateToken };
