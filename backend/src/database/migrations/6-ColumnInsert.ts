import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnInsert1742924639407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.columns ("project_id", "name", "order", "is_custom")
        VALUES
        -- ('1', 'Not started', '1', 'false'),
        -- ('1', 'In progress', '2', 'false'),
        -- ('1', 'Finished', '4', 'false'),
        -- ('2', 'Not started', '1', 'false'),
        -- ('2', 'In progress', '2', 'false'),
        -- ('2', 'Finished', '3', 'false'),
        ('1', 'In review', '4', 'true');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.columns;
      `);
  }
}
