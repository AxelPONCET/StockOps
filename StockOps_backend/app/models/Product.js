
import sequelize from "./connect";
import { DataTypes, Model } from "sequelize";

class Product extends Model { }

Product.init({
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.VARCHAR(255),
        allowNull: false,
    },
    reference: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    batch_number: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    purchase_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        sequelize,
        tableName: "product",
    });

export default Product;