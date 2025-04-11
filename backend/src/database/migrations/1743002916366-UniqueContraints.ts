import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueContraints1743002916366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `\
        ALTER TABLE public.roles
          ADD CONSTRAINT "roles_project_id_user_id_unique" UNIQUE ("project_id", "user_id");
        ALTER TABLE public.columns
          ADD CONSTRAINT "roles_column_name_project_id_unique" UNIQUE ("column_name", "project_id");
        ALTER TABLE public.projects
          DROP CONSTRAINT "projects_name_unique";
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        ALTER TABLE public.roles
          DROP CONSTRAINT "roles_project_id_user_id_unique";
        ALTER TABLE public.columns
          DROP CONSTRAINT "roles_column_name_project_id_unique";  
      `);
  }
}
