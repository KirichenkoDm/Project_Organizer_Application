import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnInsert1742924639407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.columns ("project_id", "name", "order", "is_custom")
        VALUES
        ('3', 'In review', '4', 'true')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.columns;
      `);
  }
}
