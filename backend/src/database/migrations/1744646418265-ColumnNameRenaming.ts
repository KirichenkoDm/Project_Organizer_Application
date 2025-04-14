import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnNameRenaming1744646418265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(/* sql */ `
        ALTER TABLE public.columns 
          RENAME COLUMN "column_name" TO "name";
        ALTER TABLE public.columns 
          RENAME CONSTRAINT "roles_column_name_project_id_unique" TO "columns_name_project_id_unique";
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(/* sql */ `
        ALTER TABLE public.columns 
          RENAME COLUMN "name" TO "column_name";
        ALTER TABLE public.columns 
          RENAME CONSTRAINT "columns_name_project_id_unique" TO "column_name_project_id_unique";
      `);
    }

}
