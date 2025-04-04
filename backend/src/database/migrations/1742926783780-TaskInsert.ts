import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskInsert1742926783780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.tasks (
          "name", 
          "description", 
          "start", 
          "end", 
          "projectid", 
          "columnid", 
          "assignedid", 
          "blockedby"
        )
        VALUES
        (
          'Test task 1', 
          'Test description 1', 
          NOW(), 
          NOW() + INTERVAL '5 days', 
          'ada76564-1768-40f8-83f7-ec016abc6b75', 
          '3a986512-3f90-442c-9d13-11663fe180e8', 
          'b0b21246-3cd6-4fc6-b9ce-22c85875516a', 
          NULL
        ),
        (
          'Test task 2', 
          'Test description 2', 
          NULL, 
          NULL, 
          'ada76564-1768-40f8-83f7-ec016abc6b75', 
          '56ea1f61-4d6d-4460-801f-19f99df12c63', 
          '220fe93b-c17b-4fa9-88e6-274c39c5bb23', 
          NULL
        ),
        (
          'Test task 3', 
          'Test description 3', 
          NOW()+ INTERVAL '1 days', 
          NOW() + INTERVAL '7 days', 
          'ada76564-1768-40f8-83f7-ec016abc6b75', 
          '6f069f1e-e9a3-4a3f-a48c-1b056525b015', 
          NULL, 
          NULL
        ),
        (
          'Test task 4', 
          'Test description 4', 
          NULL, 
          NULL, 
          'ada76564-1768-40f8-83f7-ec016abc6b75', 
          '6f069f1e-e9a3-4a3f-a48c-1b056525b015', 
          '220fe93b-c17b-4fa9-88e6-274c39c5bb23', 
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
