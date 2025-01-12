import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const { userID } = jwt.verify(token, process.env.SECRET_KEY);
            const user = await userModel.findById(userID).select('-password');
            if (!user) {
                return res.status(404).json({ status: "failed", message: "User not found" });
            }
            req.user = user; // Set req.user
            next();
        } catch (err) {
            console.error(err.message);
            return res.status(401).json({ status: "failed", message: "Unauthorized user" });
        }
    } else {
        return res.status(401).json({ status: "failed", message: "Unauthorized user, no token" });
    }
};

export default checkUserAuth;