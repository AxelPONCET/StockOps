import sequelize from "./connect.js";
import { DataTypes, Model } from "sequelize";

class Users extends Model { }

Users.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

},
    {
        sequelize,
        tableName: "users",
    });

export default Users;