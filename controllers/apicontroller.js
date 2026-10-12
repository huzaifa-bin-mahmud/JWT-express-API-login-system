const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required",
        });
        }
        if (
        username != "admin" ||
        !(await bcrypt.compare(password, process.env.ADMIN_pass))
        ) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password",
        });
        }

        res.status(200).json({
        success: true,
        message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Internal server error",
        });
    }
};

module.exports = { login };
