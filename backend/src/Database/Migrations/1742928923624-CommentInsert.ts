import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentInsert1742928923624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        INSERT INTO public.comments ("text", "userid", "taskid")
        VALUES 
        ('{"content": "First test comment text"}'::jsonb, '220fe93b-c17b-4fa9-88e6-274c39c5bb23', '3fefd8a8-6bbe-4373-86fb-8cc0ad4ea8f5'),
        ('{"content": "Second test comment text"}'::jsonb, '220fe93b-c17b-4fa9-88e6-274c39c5bb23', '3fefd8a8-6bbe-4373-86fb-8cc0ad4ea8f5');
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        DELETE FROM public.comments;
      `);
    }

}
