-- migrate:up
CREATE TABLE detail_images(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    sequence INT NOT NULL,
    image VARCHAR(1000) NOT NULL,
    CONSTRAINT detail_images_products_fkey FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE detail_images;
