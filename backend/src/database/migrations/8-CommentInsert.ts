import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentInsert1742928923624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.comments ("text", "user_id", "task_id")
        VALUES 
        ('{"content": "First test comment text"}'::jsonb, '1', '2'),
        ('{"content": "Second test comment text"}'::jsonb, '2', '2');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.comments;
      `);
  }
}
