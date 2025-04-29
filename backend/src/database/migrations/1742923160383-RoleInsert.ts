import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleInsert1742923160383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.roles ("project_id", "user_id", "role")
        VALUES
        ('3', '3', 'Owner'::roles_enum),
        ('3', '4', 'Project manager'::roles_enum),
        ('3', '5', 'Member'::roles_enum),
        ('3', '6', 'Member'::roles_enum),
        ('4', '3', 'Member'::roles_enum),
        ('4', '4', 'Project manager'::roles_enum),
        ('4', '7', 'Owner'::roles_enum);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.roles;
      `);
  }
}
