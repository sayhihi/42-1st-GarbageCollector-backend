-- migrate:up
CREATE TABLE order_items(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_option_id INT NOT NULL,
    order_id INT NOT NULL,
    CONSTRAINT order_items_product_options_fkey FOREIGN KEY (product_option_id) REFERENCES product_options (id),
    CONSTRAINT order_items_orders_fkey FOREIGN KEY (order_id) REFERENCES orders (id)
);

-- migrate:down
DROP TABLE order_items;
