import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskInsert1742926783780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.tasks (
          "name", 
          "description", 
          "start", 
          "end", 
          "project_id", 
          "column_id", 
          "assigned_id", 
          "blocked_by"
        )
        VALUES
        (
          'Test task 1', 
          'Test description 1', 
          NOW(), 
          NOW() + INTERVAL '5 days', 
          '1', 
          '1', 
          '2', 
          NULL
        ),
        (
          'Test task 2', 
          'Test description 2', 
          NULL, 
          NULL, 
          '1', 
          '1', 
          '1', 
          NULL
        ),
        (
          'Test task 3', 
          'Test description 3', 
          NOW()+ INTERVAL '1 days', 
          NOW() + INTERVAL '7 days', 
          '1', 
          '2', 
          NULL, 
          NULL
        ),
        (
          'Test task 4', 
          'Test description 4', 
          NULL, 
          NULL, 
          '1', 
          '3', 
          '1', 
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
