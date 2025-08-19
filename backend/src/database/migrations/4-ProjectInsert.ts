import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectInsert1742910651015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.projects ("name", "theme", "description")
        VALUES 
        ('Humanitarian testing project first', 'Humanitarian'::project_theme_enum, 'Example description for first testing project'),
        ('Functional security testing project second', 'Functional security'::project_theme_enum, 'Example description for second testing project');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.projects;
      `);
  }
}
