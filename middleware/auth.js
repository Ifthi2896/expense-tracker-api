const jwt = require('jsonwebtoken');

const JWT_SECRET = '';

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(" ")[1];
  if(!token) return res.status(401).json({error: 'Invalid Authentication'});
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded;
    next()
  } catch (error) {
    res.status(400).json({error: 'Invalid Token'})
  }
}