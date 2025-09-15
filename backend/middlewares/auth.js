import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Login again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        console.log('authUser decoded userId:', req.body.userId); // Debugging inside middleware
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export default authUser