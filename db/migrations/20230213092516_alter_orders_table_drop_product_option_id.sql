-- migrate:up
ALTER TABLE orders DROP FOREIGN KEY orders_product_options_fkey;
ALTER TABLE orders DROP product_option_id;

-- migrate:down
ALTER TABLE orders ADD product_option_id INT NOT NULL;
ALTER TABLE orders ADD FOREIGN KEY (product_option_id) REFERENCES product_options (id);