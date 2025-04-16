import sequelize from "./connect";
import { DataTypes, Model } from "sequelize";

class Inventory extends Model { }

Inventory.init({
    inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.VARCHAR(255),
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