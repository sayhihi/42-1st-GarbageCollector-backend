-- migrate:up
ALTER TABLE orders ADD payment_method_id INT NOT NULL AFTER phone_number;
ALTER TABLE orders ADD CONSTRAINT orders_payment_method_fkey FOREIGN KEY (payment_method_id) REFERENCES payment_method (id);


-- migrate:down
ALTER TABLE orders DROP FOREIGN KEY orders_payment_method_fkey;
ALTER TABLE orders DROP payment_method_id;

