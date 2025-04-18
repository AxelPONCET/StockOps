import jsonwebtoken from "jsonwebtoken";
import argon2 from "argon2";
import { Inventory, Product, Users } from "../models/associations.js"


const secret = process.env.SECRET;

const authentificationController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Missing parameters" });

        try {
            const user = await Users.findOne({ where: { email } });
            if (!user) return res.status(400).json({ error: "User not found" });

            const validPassword = await argon2.verify(user.password, password)
            if (!validPassword) return res.status(400).json({ error: "Invalid password" });

            const token = jsonwebtoken.sign({ id: user.id }, secret, { expiresIn: "24h" });
            res.status(200).json({ token });
        } catch (error) {
            next(error);

        }

    },

    checkAuthentification: async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(" ")[1];
            try {
                const jwtContent = jsonwebtoken.verify(token, secret);
                req.user = jwtContent;
            } catch (err) {
                console.log("Invalid token", err);
            }
        }
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
        } else {
            next();
        }
    },

    checkidentity: async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Missing user id" });
        }
        try {
            const user = await Users.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            if (req.user.id !== user.id) {
                return res.status(403).json({ error: "Forbidden" });
            }
            next();
        } catch (error) {
            next(error);
        }
    },
}

export default authentificationController;
