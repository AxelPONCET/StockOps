import sequelize from "./connect";
import { DataTypes, Model } from "sequelize";

class User extends Model { }

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.VARCHAR(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.VARCHAR(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.VARCHAR(255),
        allowNull: false,
    },



},
    {
        sequelize,
        tableName: "user",
    });

export default User;