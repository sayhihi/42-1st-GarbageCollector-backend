-- migrate:up
ALTER TABLE products 
ALTER discount_price SET DEFAULT (`price`);

-- migrate:down
ALTER TABLE products
ALTER discount_price DROP DEFAULT;