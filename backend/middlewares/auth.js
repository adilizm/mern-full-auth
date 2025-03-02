import JWT from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.id;
        
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export { auth }
