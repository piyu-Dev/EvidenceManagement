const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = () => {
    return async (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
        }

        const jwtToken = token.replace(/^Bearer\s/, "").trim();

        try {
            const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

            const userData = await User.findOne({ _id: isVerified._id }).select({ password: 0 });

            if (!userData) {
                return res.status(401).json({ message: "User not found" });
            } 

            req.user = userData; // Ensure consistency in property names
            req.token = token;
            req.userID = userData._id;

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

module.exports = authMiddleware;
