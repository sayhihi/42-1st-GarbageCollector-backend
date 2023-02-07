-- migrate:up
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    model_number VARCHAR(200) NOT NULL,
    description VARCHAR(3000) NULL,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2) NULL,
    main_image VARCHAR(1000) NULL,
    sub_image VARCHAR(1000) NULL,
    category_id INT NOT NULL,
    status_id INT NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT products_categories_fkey FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT products_products_status_fkey FOREIGN KEY (status_id) REFERENCES products_status (id)
);

-- migrate:down
DROP TABLE products;
