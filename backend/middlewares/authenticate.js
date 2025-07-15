import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT
export const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the header

  if (!token) {
    return res.status(403).json({ message: 'Access Denied' });  // Token not found
  }

  jwt.verify(token, 'yourSecretKey', (err, user) => {  // Secret key used to verify the token
    if (err) {
      return res.status(403).json({ message: 'Access Denied' });  // Token verification failed
    }
    req.user = user;  // Store user info in request object
    next();  // Continue to the next middleware or route
  });
};
