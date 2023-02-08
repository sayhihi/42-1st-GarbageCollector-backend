-- migrate:up
CREATE TABLE products_status(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE products_status;
