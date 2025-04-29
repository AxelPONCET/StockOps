BEGIN;

-- Suppression des tables existantes si elles existent
DROP TABLE IF EXISTS inventory_product CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS users CASCADE;

COMMIT;

BEGIN;

-- USER table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,  -- SERIAL pour auto-incrémentation dans PostgreSQL
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- INVENTORY table
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,  -- SERIAL pour auto-incrémentation
    name VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- PRODUCT table
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,  -- SERIAL pour auto-incrémentation
    name VARCHAR(255),
    reference TEXT,
    batch_number TEXT,
    expiration_date DATE,
    purchase_url TEXT
);

-- INVENTORY_PRODUCT (table de jonction pour la relation many-to-many)
CREATE TABLE inventory_product (
    product_id INT,
    inventory_id INT,
    quantity INT,
    PRIMARY KEY (product_id, inventory_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
);

COMMIT;

