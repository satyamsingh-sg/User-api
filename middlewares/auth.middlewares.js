const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  const token =  req.cookies.jwt;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.send({ token: "token is invalid" })
      req.user = user
    })
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
