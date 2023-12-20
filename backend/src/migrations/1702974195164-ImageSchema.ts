import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageSchema1702974195164 implements MigrationInterface {
    name = 'ImageSchema1702974195164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "trending_title" text`);
        await queryRunner.query(`ALTER TABLE "product_image" ALTER COLUMN "public_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_image" ALTER COLUMN "public_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "trending_title"`);
    }

}
