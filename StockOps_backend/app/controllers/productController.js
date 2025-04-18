import { sequelize, User, Product, Inventory } from "../models/associations.js"

const productController = {

    // POST a Product

    async addProduct(req, res, next) {
        const { name, reference, batch_number, expiration_date, purchase_url } = req.body;

        try {
            if (!name || !reference || !batch_number || expiration_date || purchase_url) {
                res.status(400).json({ message: "Information manquante." })
            }
            const newProduct = await Product.create({
                name,
                reference,
                batch_number,
                expiration_date,
                purchase_url
            });

            res.status(200).json(newProduct)
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
            res.status(500).json({ message: "Erreur serveur." });
        }

    },

    // PATCH one Product

    async updateProduct(req, res, next) {
        const productId = req.params.productId;
        const { name, reference, batch_number, expiration_date, purchase_url } = req.body;

        try {

            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ message: "Produit non trouvé." });
            }
            
            // if the value are not false or undefined the value is updated
            if (name && name !== undefined) product.name = name;
            if (reference && reference !== undefined) product.reference = reference;
            if (batch_number && batch_number !== undefined) product.batch_number = batch_number;
            if (expiration_date && expiration_date !== undefined) product.expiration_date = expiration_date;
            if (purchase_url && purchase_url !== undefined) product.purchase_url = purchase_url;

            await product.save();

            res.status(200).json(product)
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
            if (!product){
                res.status(404).json({message: "Produit non trouvé"});
            }

            await product.destroy();

            res.status(200).json({message: "Produit supprimé avec succès."})
        } catch (error) {
            console.error("Erreur lors de la suppression du produit:", error);
            res.status(500).json({ message: "Erreur serveur." });
        }
    }


}

export default productController;