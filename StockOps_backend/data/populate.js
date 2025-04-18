import {sequelize, Users, Product, Inventory, InventoryProduct }from "../app/models/associations.js"

async function populateDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Connexion réussie à la base de données.");

        // USERS
        await Users.bulkCreate([
            {
                user_id: 1,
                name: 'Alice',
                email: 'alice@example.com',
                password: 'password123',
            },
        ]);

        // INVENTORY
        await Inventory.bulkCreate([
            {
                inventory_id: 1,
                name: 'Inventaire Principal',
                user_id: 1,
            },
        ]);

        // PRODUCTS
        await Product.bulkCreate([
            {
                product_id: 1,
                name: 'Produit A',
                reference: 'REF123',
                batch_number: 'BATCH001',
                expiration_date: new Date('2025-12-31'),
                purchase_url: 'http://example.com/productA',
            },
            {
                product_id: 2,
                name: 'Produit B',
                reference: 'REF456',
                batch_number: 'BATCH002',
                expiration_date: new Date('2026-06-30'),
                purchase_url: 'http://example.com/productB',
            },
        ]);

        // INVENTORY_PRODUCT
        await InventoryProduct.bulkCreate([
            {
                product_id: 1,
                inventory_id: 1,
                quantity: 100,
            },
            {
                product_id: 2,
                inventory_id: 1,
                quantity: 50,
            },
        ]);

        console.log("Données insérées avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error.message);
        console.error("Stack trace:", error.stack);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

populateDatabase();