import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskInsert1742926783780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.tasks (
          "name", 
          "description", 
          "order",
          "project_id", 
          "column_id",
          "start", 
          "end"
        )
        VALUES
        (
          'Test task 1', 
          'Test description 1', 
          '1',
          '3',
          '1',
          NOW(), 
          NOW() + INTERVAL '5 days'
        ),
        (
          'Test task 2', 
          'Test description 2', 
          '2',
          '3',
          '1',
          NOW(), 
          NOW() + INTERVAL '5 days'
        ),
        (
          'Test task 3', 
          'Test description 3', 
          '3',
          '3',
          '1',
          NULL, 
          NULL
        ),
        (
          'Test task 4', 
          'Test description 4', 
          '1',
          '3',
          '7',
          NULL, 
          NULL
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.tasks;
      `);
  }
}
