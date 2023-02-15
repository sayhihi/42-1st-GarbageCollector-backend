-- migrate:up
ALTER TABLE carts
ADD CONSTRAINT user_id_product_option_id_unique UNIQUE (user_id, product_option_id);

-- migrate:down
ALTER TABLE carts
DROP CONSTRAINT user_id_product_option_id_unique;

