import { MigrationInterface, QueryRunner } from 'typeorm';

export class SampleProduct1707681779957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO category (id, category_name, description, image_url) VALUES (1, 'furniture', 'Furniture for home decoration', 'https://ycax1owz6zsv8w4g.public.blob.vercel-storage.com/furniture-category-image.jpg');

INSERT INTO product (id, sku, name, description, price, discount, category_id, trending_title, stock, added_by_id)
VALUES (1, 'hmsof22', 'Loveseat Sofa', 'Fantastic sofa for home decoration', 400, 0.5, 1, 'new', 30, 1);

INSERT INTO product (id, sku, name, description, price, discount, category_id, trending_title, stock, added_by_id)
VALUES (2, 'hmlmp22', 'Beige Table Lamp', 'Fantastic table lamp for table decoration', 50, 0.5, 1, 'new', 30, 1);

INSERT INTO product (id, sku, name, description, price, discount, category_id, trending_title, stock, added_by_id)
VALUES (3, 'hmdsof22', 'Decoration Sofa', 'Fantastic sofa for decoration', 500, 0.5, 1, 'new', 30, 1);

INSERT INTO product (id, sku, name, description, price, discount, category_id, trending_title, stock, added_by_id)
VALUES (4, 'hmwrdrb22', 'Bedroom Wardrobe', 'Fantastic Wardrobe for decoration', 300, 0.5, 1, 'new', 30, 1);

INSERT INTO product (id, sku, name, description, price, discount, category_id, trending_title, stock, added_by_id)
VALUES (5, 'ofsta22', 'Tray Table', 'Fantastic Tray Table for decoration', 350, 0.5, 1, 'new', 30, 1);

INSERT INTO product (id, sku, name, description, price, discount, category_id, trending_title, stock, added_by_id)
VALUES (6, 'oflmp22', 'Table Lamp', 'Fantastic lamp for decoration', 50, 0.5, 1, 'new', 30, 1);





INSERT INTO product_image (product_id, url)
VALUES (1, 'https://ycax1owz6zsv8w4g.public.blob.vercel-storage.com/sofa.png');

INSERT INTO product_image (product_id, url)
VALUES (2, 'https://ycax1owz6zsv8w4g.public.blob.vercel-storage.com/lamp.png');

INSERT INTO product_image (product_id, url)
VALUES (3, 'https://ycax1owz6zsv8w4g.public.blob.vercel-storage.com/sofa-white.png');

INSERT INTO product_image (product_id, url)
VALUES (4, 'https://ycax1owz6zsv8w4g.public.blob.vercel-storage.com/wardrob.png');

INSERT INTO product_image (product_id, url)
VALUES (5, 'https://ycax1owz6zsv8w4g.public.blob.vercel-storage.com/table-stand.png');

INSERT INTO product_image (product_id, url)
VALUES (6, 'https://ycax1owz6zsv8w4g.public.blob.vercel-storage.com/table-lamp.jpeg');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM product_image;

    DELETE FROM product;

    DELETE FROM category;
    `);
  }
}
