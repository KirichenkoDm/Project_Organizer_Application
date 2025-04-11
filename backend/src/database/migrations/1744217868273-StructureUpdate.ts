import { MigrationInterface, QueryRunner } from "typeorm";

export class StructureUpdate1744217868273 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      ALTER TABLE public.users DROP COLUMN IF EXISTS "salt";
      ALTER TABLE public.users ADD COLUMN "refresh_token" varchar(255) DEFAULT NULL;

      ALTER TABLE public.tasks ADD COLUMN "order" integer NOT NULL;

      ALTER TABLE public.projects DROP COLUMN IF EXISTS "report";
      ALTER TABLE public.projects ADD COLUMN "report" jsonb DEFAULT '{}' :: jsonb;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      ALTER TABLE public.users DROP COLUMN IF EXISTS "refresh_token";
      ALTER TABLE public.users ADD COLUMN "salt" varchar(255) NOT NULL;

      ALTER TABLE public.tasks DROP COLUMN IF EXISTS "order";

      ALTER TABLE public.projects DROP COLUMN IF EXISTS "report";
      ALTER TABLE public.projects ADD COLUMN "report" varchar(255) DEFAULT NULL;
    `);
  }

}
