-- migrate:up
ALTER TABLE order_items ADD quantity INT NOT NULL;

-- migrate:down
ALTER TABLE order_items DROP quantity;

