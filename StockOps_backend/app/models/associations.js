import sequelize from "./connect.js";
import Inventory from "./Inventory.js";
import Product from "./Product.js";
import Users from "./Users.js";
import InventoryProduct from "./InventoryProduct.js";

// User <-> Inventory association
Users.hasMany(Inventory, { as: "inventory", foreignKey: "user_id" });
Inventory.belongsTo(Users, { as: "users", foreignKey: "user_id" });

// Inventory <-> InventoryProduct <-> Product association
Inventory.belongsToMany(Product, {
    through: InventoryProduct,
    foreignKey: "inventory_id",
    otherKey: "product_id",
    as: "product"
})

Product.belongsToMany(Inventory, {
    through: InventoryProduct,
    foreignKey: "product_id",
    otherKey: "inventory_id",
    as: "inventories"
})

export {
    sequelize, Inventory, Product, Users, InventoryProduct
}

