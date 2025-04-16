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
        const userId = req.params.userId;
        const inventoryId = req.params.inventoryId;

        try {
            const inventory = await Inventory.findOne({
                where: {
                    user_id: userId,
                    inventory_id: inventoryId
                },
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

            if (!inventory) {
                return res.status(404).json({ message: "Inventaire non trouvé pour cet utilisateur." });
            }

            res.status(200).json(inventory);
        } catch (error) {
            console.error('Erreur récupération inventaire utilisateur:', error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // POST a inventory

    async addInventory(req, res, next) {
        const { name, user_id } = req.body;

        try {
            if (!name || !user_id) {
                return res.status(400).json({ message: 'Nom et user_id sont requis.' });
            }

            const newInventory = await Inventory.create({
                name,
                user_id
            });

            res.status(200).json(newInventory)
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'inventaire:", error);
            res.status(500).json({ message: "Erreur serveur." });
        }
    },

    // PATCH one inventory

    async updateInventory(req, res, next) {
        const inventoryId = req.params.inventoryId;
        const name = req.body;

        try {
            const inventory = await Inventory.findByPk(inventoryId);

            if (!inventory) {
                return res.status(404).json({ message: "Inventaire non trouvé." });
            }

            if (name && name !== undefined) inventory.name = name;

            await inventory.save();

            res.status(200).json(inventory);

        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'inventaire:", error);
            res.status(500).json({ message: "Erreur serveur." });
        }

    },

    // DELETE one inventory

    async deleteOneInventory(req, res, next) {
        const inventoryId = req.params.inventoryId;

        try {
            const inventory = await Inventory.findByPk(inventoryId);

            if (!inventory) {
                return res.status(404).json({ message: "Inventaire non trouvé." });
            }

            await inventory.destroy();

            res.status(200).json({ message: "Inventaire supprimé avec succès." });

        } catch (error) {
            console.error("Erreur lors de la suppression de l'inventaire:", error);
            res.status(500).json({ message: "Erreur serveur." });
        }
    }


}