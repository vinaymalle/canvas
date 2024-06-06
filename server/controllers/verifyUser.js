import jwt from 'jsonwebtoken';
const SECRECTKEY = 'canvas'

export default (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new Error('Unauthorized: No token provided'));
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return next(new Error('Unauthorized: Malformed token'));
    }
    const token = tokenParts[1];

    try {
        const decodedToken = jwt.verify(token, SECRECTKEY);
        req.decodedToken = decodedToken;
        next();
    } catch (error) {
        return next(new Error('Unauthorized: Invalid token'));
    }
}