BEGIN;
DROP TABLE IF EXISTS game CASCADE;
DROP TABLE IF EXISTS player CASCADE;
DROP TABLE IF EXISTS challenge CASCADE;
DROP TABLE IF EXISTS proposition CASCADE;
DROP TABLE IF EXISTS vote_challenge CASCADE;
DROP TABLE IF EXISTS vote_proposition CASCADE;
COMMIT;

BEGIN;

-- USER table
CREATE TABLE USER (
    user_id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- INVENTORY table
CREATE TABLE INVENTORY (
    inventory_id INT PRIMARY KEY,
    name VARCHAR(255),
    creation_date DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
);

-- PRODUCT table
CREATE TABLE PRODUCT (
    product_id INT PRIMARY KEY,
    name VARCHAR(255),
    reference TEXT,
    batch_number TEXT,
    expiration_date DATE
    purchase_url TEXT
);

-- INVENTORY_PRODUCT (junction table for many-to-many relationship)
CREATE TABLE INVENTORY_PRODUCT (
    product_id INT,
    inventory_id INT,
    quantity INT,
    PRIMARY KEY (product_id, inventory_id),
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id),
    FOREIGN KEY (inventory_id) REFERENCES INVENTORY(inventory_id)
);
