
import { sequelize, Users, Product, Inventory, InventoryProduct } from "../models/associations.js"
import argon2 from "argon2";

const userController = {

    // GET one User

    async getUserById(req, res, next) {
        const userId = req.params.userId;
        if (!userId) return res.status(400).json({ error: "Missing user id" });

        try {
            const user = await Users.findByPk(userId, {
                attributes: ["user_id", "name", "email"],
                include: [
                    {
                        model: Inventory,
                        as: "inventory",
                        attributes: [
                            "inventory_id",
                            "name",
                            "user_id"
                        ],
                        include: {
                            model: Product,
                            as: "product",
                            through: {
                                model: InventoryProduct,
                                as: "inventory_product",
                                attributes: ["quantity"]
                            }
                        }
                    }
                ]
            })
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    // POST a User

    async addUser(req, res, next) {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        
        if (!name || !email || !password) return res.status(400).json({ error: "Missing parameters" });

        try {
            let user = await Users.findOne({ where: { email } });
            if (user) {
                return res.status(409).json({ error: "Email already used" });
            }
            const hash = await argon2.hash(password);
            user = await Users.create({name, email, password: hash });
            console.log(user);
            
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }

    },

    // PATCH one User

    async updateOneUser(req, res, next) {
        const userId = req.params.userId;
        if (!userId) return res.status(400).json({ error: "Missing user id" });

        const { name, email, password } = req.body;
        if (!name && !email && !password) return res.status(400).json({ error: "Missing parameters" });

        try {
            const user = await Users.findByPk(userId);
            if (!user) return res.status(404).json({ error: "User not found" });

            const verifUser = await Users.findOne({ where: { email: email } });
            if (verifUser) return res.status(409).json({ error: "Email already used" });

            if (!password) {
                await user.update({ name, email });
            } else {
                const hash = await argon2.hash(password);
                await user.update({ name, email, password: hash });
            }

            res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    },

    // DELETE one User

    async deleteOneUser(req, res, next) {
        const userId = req.params.userId;
        if (!userId) return res.status(400).json({ error: "Missing user id" });

        try {
            const user = await Users.findByPk(userId);
            if (!user) return res.status(404).json({ error: "User not found" });

            user.destroy().then(() => {
                res.status(204).send();
            })
        } catch (error) {
            next(error);
        }
    }


}

export default userController;