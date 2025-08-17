import fetch from 'node-fetch';
import config from "../config/config.js";

// Get token
const authMiddleware = async (req, res, next) => {
  try {
        const response = await fetch(`${config.baseURL}/auth/login`, {
            method: "POST",
            headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: config.username,
                password: config.password,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch token");
        }

        const data = await response.json();
        req.token = data.token;

    next();
    } catch (err) {
        console.error("Error fetching token:", err.message);
        res.status(401).json({ error: "Unauthorized" });
    }
};

export default authMiddleware;