import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnInsert1742924639407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.columns ("projectid", "columnname", "order", "iscustom")
        VALUES
        ('ada76564-1768-40f8-83f7-ec016abc6b75', 'Not started', '1', 'false'),
        ('ada76564-1768-40f8-83f7-ec016abc6b75', 'In progress', '2', 'false'),
        ('ada76564-1768-40f8-83f7-ec016abc6b75', 'Finished', '4', 'false'),
        ('ada76564-1768-40f8-83f7-ec016abc6b75', 'In review', '3', 'true'),
        ('ae28c834-aef6-470d-83f8-f8420837c1e9', 'Not started', '1', 'false'),
        ('ae28c834-aef6-470d-83f8-f8420837c1e9', 'In progress', '2', 'false'),
        ('ae28c834-aef6-470d-83f8-f8420837c1e9', 'Finished', '3', 'false');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.columns;
      `);
  }
}
