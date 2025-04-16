import sequelize from "./connect";
import { DataTypes, Model } from "sequelize";

class InventoryProduct extends Model { }

InventoryProduct.init({
    inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
            model:"inventory",
            key: "inventory_id"
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
            model:"product",
            key: "product_id"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},
    {
        sequelize,
        tableName: "inventory_product",
    });

export default Inventory;