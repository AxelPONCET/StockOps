import { sequelize, Users, Product, Inventory, InventoryProduct } from "../models/associations.js"

const productController = {

    // POST a Product

    async addProduct(req, res, next) {
        const inventory_id = req.params.inventoryId;
        const { name, reference, batch_number, expiration_date, purchase_url, quantity } = req.body;

        try {
            // Vérification des informations manquantes
            if (!inventory_id) {
                return res.status(400).json({ message: "Inventaire manquant ou inconnu" });
            }

            if (!name || !reference || !batch_number || !expiration_date || !purchase_url || !quantity) {
                return res.status(400).json({ message: "Information manquante." });
            }

            // Créer le nouveau produit
            const newProduct = await Product.create({
                name,
                reference,
                batch_number,
                expiration_date,
                purchase_url
            });

            // Trouver l'inventaire par ID
            const inventory = await Inventory.findByPk(inventory_id);

            if (!inventory) {
                return res.status(404).json({ message: "Inventaire non trouvé." });
            }

            // Ajouter le produit à l'inventaire avec la quantité dans la table de liaison
            await inventory.addProduct(newProduct, { through: { quantity } });

            // Réponse unique après l'ajout du produit et de la quantité
            return res.status(200).json({
                message: "Produit ajouté à l'inventaire avec succès.",
                product: newProduct,
                inventory_id,
                quantity
            });

        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
            return res.status(500).json({ message: "Erreur serveur." });
        }
    },

    // PATCH one Product

    async updateProduct(req, res, next) {
        const productId = req.params.productId;
        const { name, reference, batch_number, expiration_date, purchase_url, inventory_id, quantity } = req.body;

        try {
            // Trouver le produit par son ID
            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ message: "Produit non trouvé." });
            }

            // Mettre à jour les informations du produit si elles sont fournies
            if (name && name !== undefined) product.name = name;
            if (reference && reference !== undefined) product.reference = reference;
            if (batch_number && batch_number !== undefined) product.batch_number = batch_number;
            if (expiration_date && expiration_date !== undefined) product.expiration_date = expiration_date;
            if (purchase_url && purchase_url !== undefined) product.purchase_url = purchase_url;

            await product.save();  // Sauvegarder les changements du produit

            // Si la quantité et l'inventaire sont fournis, mettre à jour la quantité dans la table de liaison
            if (quantity !== undefined && inventory_id !== undefined) {
                const inventoryProduct = await InventoryProduct.findOne({
                    where: {
                        inventory_id,
                        product_id: productId
                    }
                });

                if (!inventoryProduct) {
                    return res.status(404).json({ message: "Produit non trouvé dans cet inventaire." });
                }

                // Mettre à jour la quantité dans la table de liaison
                inventoryProduct.quantity = quantity;
                await inventoryProduct.save();  // Sauvegarder la quantité mise à jour

                return res.status(200).json({
                    message: "Produit et quantité mis à jour avec succès.",
                    product,
                    inventoryProduct
                });
            }

            // Si la quantité et l'inventaire ne sont pas fournis, simplement répondre avec le produit mis à jour
            res.status(200).json({ message: "Produit mis à jour avec succès.", product });

        } catch (error) {
            console.error("Erreur lors de la mise à jour du produit:", error);
            res.status(500).json({ message: "Erreur serveur." });
        }
    },

    // DELETE one Product
    async deleteProduct(req, res, next) {
        const productId = req.params.productId;

        try {
            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ message: "Produit non trouvé" });
            }

            // Supprimer les références dans la table de liaison 'inventory_product'
            await InventoryProduct.destroy({
                where: {
                    product_id: productId
                }
            });

            // Après avoir supprimé les références, supprimer le produit
            await product.destroy();

            return res.status(200).json({ message: "Produit supprimé avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression du produit:", error);
            return res.status(500).json({ message: "Erreur serveur." });
        }
    }


}

export default productController;