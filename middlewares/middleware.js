const userModel = require("../models/user");
const { validateToken } = require("../services/auth");

module.exports.checkPoint = async (req, res, next) => {
    try {
        if (!req.cookies?.token) {
            return res.redirect("/user/signin");
        }

        const decoded = validateToken(req.cookies.token);
        if (!decoded) return res.redirect("/user/signin");

        const user = await userModel.findOne({ email: decoded.email });
        if (user) {
            req.user = user;  // Attach user to req object
            return next();//calling the middleware next()
        }

        res.redirect("/user/signin");
    } catch (err) {
        console.error(`the error is:${err}`);
        res.status(500).send("Internal Server Error");
    }
};
