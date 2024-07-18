const jwt = require('jsonwebtoken');
require('dotenv').config();

class JWTMiddleware {
    verifyToken (req, res, next) {
        // Checking if the request header has authorization or not
        const authorization = req.headers.authorization;
        if (!(authorization)) {
            return res.status(401).json({ "message" : "Unauthorized. Token not found." });
        }

        // Extracting the JWT from the request header
        const token = authorization.split(" ")[1].trim();
        if (!(token)) {
            return res.status(401).json({ "message" : "Unauthorized. Token not found" });
        }

        try {
            // Verifying the JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attaching the user information to request object
            req.user = decoded;
            return next();
        } catch (error) {
            console.error(error);
            return res.status(201).json({ "message" : error.message });
        }
    }

    generateToken (payload) {
        // Generating a token from the given paylaod
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    }
}

module.exports = new JWTMiddleware();