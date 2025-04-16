import { sequelize, User, Product, Inventory, InventoryProduct } from "../models/associations.js"

const inventoryController = {

    // GET all inventories

    async getUserInventory(req, res, next) {
        const userId = req.params.userId;

        try {
            const inventories = await Inventory.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Product,
                        as: "product",
                        through: {
                            model: InventoryProduct,
                            attributes: ["quantity"]
                        }
                    }
                ]
            });

            res.status(200).json(inventories);
        } catch (error) {
            console.error('Erreur récupération inventaire utilisateur:', error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // GET one inventory

    async getOneInventory(req, res, next) {

    },

    // POST a inventory

    async postInventory(req, res, next) {

    },

    // PATCH one inventory

    async patchOneInventory(req, res, next) {

    },

    // DELETE one inventory

    async deleteOneInventory(req, res, next) {

    }


}