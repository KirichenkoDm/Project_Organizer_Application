import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectInsert1742910651015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.projects ("id", "name", "theme", "description")
        VALUES 
        ('1', 'Humanitarian testing project first', 'Humanitarian'::project_theme_enum, 'Example description for first testing project'),
        ('2', 'Functional security testing project second', 'Functional security'::project_theme_enum, 'Example description for second testing project');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.projects;
      `);
  }
}
