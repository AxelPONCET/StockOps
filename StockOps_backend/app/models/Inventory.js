import sequelize from "./connect.js";
import { DataTypes, Model } from "sequelize";

class Inventory extends Model { }

Inventory.init({
    inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},
    {
        sequelize,
        tableName: "inventory",
    });

export default Inventory;