const { appDataSource } = require("./appDataSource");

const getProducts = async (categoryId, sort = "NONE") => {
  try {
    const whereClause = categoryId ? `WHERE p.category_id = ${categoryId}` : ``;

    const sortOption = Object.freeze({
      HIGH_PRICE: "ORDER BY p.price DESC",
      LOW_PRICE: "ORDER BY p.price",
      NEW: "ORDER BY p.create_at DESC",
      NONE: "",
    });

    return appDataSource.query(
      `SELECT
        p.id AS productId,
        p.name AS productName,
        p.main_image AS mainImage, 
        p.sub_image AS subImage, 
        p.price, 
        p.discount_price AS discountPrice,
        p.create_at AS createAt, 
        s.status 
      FROM products p 
      INNER JOIN products_status s 
      ON p.status_id = s.id
      ${whereClause}
      ${sortOption[sort]};
      `
    );
  } catch (err) {
    const error = new Error("INVALID_LISTS");
    error.statusCode = 400;
    throw error;
  }
};

const getProductDetail = async (productId) => {
  try {
    const data = await appDataSource.query(
      `SELECT
        p.name AS productName,
        p.model_number AS modelNumber,
        p.description,
        p.price,
        p.discount_price AS discountPrice,
        p.main_image AS mainImage,
        p.sub_image AS subImage,
        ps.status,
        po.options AS productOptions,
        di.images AS detailImages
      FROM products p
      INNER JOIN products_status ps ON p.status_id = ps.id
      LEFT JOIN (
        SELECT
        product_id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "productOptionId", id,
            "productOptionName" , name,
            "inventory", inventory,
            "extraPrice", extra_price
            )
            ) AS options
            FROM product_options
            GROUP BY product_id
            ) po ON po.product_id = p.id
            LEFT JOIN (
              SELECT
              product_id,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  "sequence" , sequence,
                  "imageUrl", image
                  )
                  ) AS images
                  FROM detail_images
                  GROUP BY product_id
                  ) di ON di.product_id = p.id
                  WHERE p.id = ?
                  GROUP BY p.id;`,
      [productId]
    );
    return data;
  } catch (err) {
    const error = new Error("INVALID_PRODUCT_DETAIL");
    error.statusCode = 400;
    throw error;
  }
};

const getInventoryByProductOptionId = async (productOptionId) => {
  const [result] = await appDataSource.query(
    `
    SELECT
      id,
      inventory
    FROM product_options
    WHERE id = ? 
  `,
    [productOptionId]
  );
  return result;
};

const getPricebyproductOptionId = async (productOptionId) => {
  const result = appDataSource.query(
    `SELECT
    po.id,
    po.extra_price,
    p.price
    FROM product_options po
    JOIN products p
    ON po.product_id = p.id
    WHERE po.product_id = ?;
    `,
    [productOptionId]
  );
};

module.exports = {
  getProducts,
  getProductDetail,
  getInventoryByProductOptionId,
};
