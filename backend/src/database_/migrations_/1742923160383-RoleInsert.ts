import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleInsert1742923160383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        INSERT INTO public.roles ("projectid", "userid", "role")
        VALUES
        ('ada76564-1768-40f8-83f7-ec016abc6b75', '220fe93b-c17b-4fa9-88e6-274c39c5bb23', 'Owner'::roles_enum),
        ('ada76564-1768-40f8-83f7-ec016abc6b75', '3d889c0d-2b33-4da8-a2c6-ce9c8226c113', 'Project manager'::roles_enum),
        ('ada76564-1768-40f8-83f7-ec016abc6b75', 'b0b21246-3cd6-4fc6-b9ce-22c85875516a', 'Member'::roles_enum),
        ('ada76564-1768-40f8-83f7-ec016abc6b75', 'bc929007-ffd3-4367-b648-d907eaaa4a65', 'Member'::roles_enum),
        ('ae28c834-aef6-470d-83f8-f8420837c1e9', '220fe93b-c17b-4fa9-88e6-274c39c5bb23', 'Member'::roles_enum),
        ('ae28c834-aef6-470d-83f8-f8420837c1e9', '3d889c0d-2b33-4da8-a2c6-ce9c8226c113', 'Project manager'::roles_enum),
        ('ae28c834-aef6-470d-83f8-f8420837c1e9', 'b0b21246-3cd6-4fc6-b9ce-22c85875516a', 'Owner'::roles_enum);
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        DELETE FROM public.roles;
      `);
    }

}
