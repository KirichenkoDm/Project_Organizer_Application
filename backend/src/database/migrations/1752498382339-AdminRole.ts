import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminRole1752498382339 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    //admin column
    await queryRunner.query(/* sql */ `
      ALTER TABLE public.users
      ADD COLUMN "is_admin" BOOLEAN DEFAULT false NOT NULL; 
    `);

    //admin roles_enum value
    await queryRunner.query(/* sql */ `
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type t
          JOIN pg_enum e ON t.oid = e.enumtypid
          WHERE t.typname = 'roles_enum' AND e.enumlabel = 'admin'
        ) THEN
          ALTER TYPE public.roles_enum ADD VALUE 'admin';
        END IF;
      END
      $$;
    `);

    //trigger
    await queryRunner.query(/* sql */ `
      CREATE OR REPLACE FUNCTION public.add_admin_roles_to_project()
      RETURNS TRIGGER AS $$
      DECLARE
        admin_user RECORD;
      BEGIN
        FOR admin_user IN
          SELECT id FROM public."users" WHERE "is_admin" = true
        LOOP
          INSERT INTO public.roles ("role", "project_id", "user_id")
          VALUES ('admin'::roles_enum, NEW.id, admin_user.id);
        END LOOP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    //attach trigger
    await queryRunner.query(/* sql */ `
      CREATE TRIGGER trigger_add_admin_roles
      AFTER INSERT ON public.projects
      FOR EACH ROW
      EXECUTE FUNCTION public.add_admin_roles_to_project();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_add_admin_roles ON public.projects;
    `);

    await queryRunner.query(`
      DROP FUNCTION IF EXISTS public.add_admin_roles_to_project;
    `);

    await queryRunner.query(`
      ALTER TABLE public."user"
      DROP COLUMN "isAdmin";
    `);
  }
}
