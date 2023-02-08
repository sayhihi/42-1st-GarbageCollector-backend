-- migrate:up
CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_option_id INT NOT NULL,
    status_id INT NOT NULL,
    order_number VARCHAR(100),
    reciever VARCHAR(200) NOT NULL,
    address VARCHAR(500) NOT NULL,
    phone_number VARCHAR(100) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT orders_users_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT orders_product_options_fkey FOREIGN KEY (product_option_id) REFERENCES product_options (id),
    CONSTRAINT orders_orders_status_fkey FOREIGN KEY (status_id) REFERENCES orders_status (id)
);

-- migrate:down
DROP TABLE orders;
