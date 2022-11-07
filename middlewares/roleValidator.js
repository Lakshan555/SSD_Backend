const jwt = require("jsonwebtoken");

exports.roleValidator = role => (req, res, next) => {
    console.log(role);

    const { authorization } = req.headers;
    if (!authorization) return res.status(403).json({ isSuccessful: false, message: "Access denied!" });

    const token = authorization.split(" ")[1];

    if (!token) return res.status(403).json({ isSuccessful: false, message: "Access denied!" });
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, "SSD_PROJECT_999");
        if (role !== decodedToken.user.role) {
            return res.status(403).json({ isSuccessful: false, message: "Access denied!" });
        }
        req.user = decodedToken.user;
        next();
    } catch (error) {
        res.status(403).json({ isSuccessful: false, message: "Access denied!" });
    }
};