import { Router } from "express";
import inventoryController from "./controllers/inventoryController.js";
import productController from "./controllers/productController.js";
import userController from "./controllers/userController.js";
import authentificationController from "./controllers/authentificationController.js";

const router = Router();

//* Router *// 

// User
router.get("/api/users/:userId", userController.getUserById);

router.post("/api/users", userController.addUser);

router.patch("/api/users/:userId", userController.updateOneUser);

router.delete("/api/users/:userId", userController.deleteOneUser);

// Inventory

router.get("/api/inventories/:userId", inventoryController.getUserInventory);
router.get("/api/inventories/:userId/:inventoryId", inventoryController.getOneInventory);

router.post("/api/inventory", inventoryController.addInventory);

router.patch("/api/inventory/:inventoryId", inventoryController.updateInventory);

router.delete("/api/inventory/:inventoryId", inventoryController.deleteOneInventory);

// Product

router.post("/api/product", productController.addProduct);

router.patch("/api/product/:productId", productController.updateProduct);

router.delete("/api/product/:productId", productController.deleteProduct);

// Login

router.post("/api/login", authentificationController.login);

export default router;