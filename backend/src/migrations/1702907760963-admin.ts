import { MigrationInterface, QueryRunner } from 'typeorm';

export class Admin1702907760963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user"("id", "name", "email", "password", "role") VALUES (1, 'admin','admin@email.com','$2b$10$bJCzRoSm7GhIohTYLo1NTufIBkCvoujzbtTivTDjCKHwwxJXgZT3.', 'admin')`,
    );
  }

  public async down(): Promise<void> {}
}
