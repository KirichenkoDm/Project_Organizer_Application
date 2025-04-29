import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultColumnTrigger1744647861089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        CREATE OR REPLACE FUNCTION public.create_default_columns()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO public.columns ("project_id", "name", "order", "is_custom")
          VALUES
            (NEW.id,  'To Do', 1, false),
            (NEW.id, 'In Progress', 2, false),
            (NEW.id, 'Finished', 3, false);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);

      await queryRunner.query(/* sql */`
        CREATE TRIGGER trigger_create_default_columns
        AFTER INSERT ON public.projects
        FOR EACH ROW
        EXECUTE FUNCTION public.create_default_columns();  
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        DROP TRIGGER IF EXISTS trigger_create_default_columns ON public.projects;
    `);

    await queryRunner.query(/* sql */`
        DROP FUNCTION IF EXISTS public.create_default_columns;
    `);
    }

}
