import sequelize from "./connect";
import Inventory from "./Inventory";
import Product from "./Product";
import User from "./User";
import InventoryProduct from "./InventoryProduct";

// User <-> Inventory association
User.hasMany(Inventory, { as: "inventory", foreignKey: "user_id" });
Inventory.belongsTo(User, { as: "user", foreignKey: "user_id" });

// Inventory <-> InventoryProduct <-> Product association
Inventory.belongsToMany(Product, {
    through: InventoryProduct,
    foreignKey: "inventory_id",
    otherKey: "product_id",
    as: "products"
})

Product.belongsToMany(Inventory, {
    through: InventoryProduct,
    foreignKey: "product_id",
    otherKey: "inventory_id",
    as: "inventories"
})

export {
    sequelize, Inventory, Product, User, InventoryProduct
}

