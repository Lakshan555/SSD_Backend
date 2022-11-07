const User = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user
exports.register = async (req, res) => {
    const { name, password, role, NIC } = req.body;
    console.log("user registering...");

    const decryptedPassword = await bcrypt.hash(password, 10);

    try {
        let count = await User.count({});
        const user = await User.create({ NIC, name, password: decryptedPassword, role, staffId: `SID${++count}` });
        res.json({ isSuccessful: true, user });
    } catch (error) {
        console.error(error);
        res.json({ message: "Something went wrong!", isSuccessful: false });
    };
};

//login user
exports.login = async (req, res) => {
    const { NIC, password } = req.body;
    console.log("user login... ", req.user);

    try {
        const user = await User.findOne({ NIC });
        if (!user) {
            return res.json({ message: "User not found!", isSuccessful: false });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.json({ message: "Password is wrong!", isSuccessful: false });
        }
        user.password = null;

        //creating a JWT token 
        const token = await jwt.sign({ user }, "SSD_PROJECT_999", { expiresIn: "8h" });

        res.json({ isSuccessful: true, user, token });

    } catch (error) {
        console.error(error);
        res.json({ message: "Something went wrong!", isSuccessful: false });
    }
};