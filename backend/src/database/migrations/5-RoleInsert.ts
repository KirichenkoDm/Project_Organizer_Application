import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleInsert1742923160383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.roles ("project_id", "user_id", "role")
        VALUES
        ('1', '1', 'Owner'::roles_enum),
        ('1', '2', 'Project manager'::roles_enum),
        ('1', '3', 'Project manager'::roles_enum),
        ('1', '4', 'Member'::roles_enum),
        ('1', '5', 'Member'::roles_enum),
        ('2', '2', 'Owner'::roles_enum),
        ('2', '1', 'Member'::roles_enum);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.roles;
      `);
  }
}
