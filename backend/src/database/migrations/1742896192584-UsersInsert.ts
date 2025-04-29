import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersInsert1742896192584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log("Inserting users");
    await queryRunner.query(/* sql */ `
        INSERT INTO public.users ("email", "password", "first_name", "last_name")
        VALUES
        ('kyrychenko@example.com', 'qwerty', 'Dmytro', 'Kyrychenko'),
        ('serhiyenko@example.com', 'qwerty', 'Serhiy', 'Serhiyenko'),
        ('egorenko@example.com', 'qwerty', 'Egor', 'Egorenko'),
        ('viktorenko@example.com', 'qwerty', 'Viktor', 'Viktorenko'),
        ('volodymyrenko@example.com', 'qwerty', 'Volodymyr', 'Volodymyrenko');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.users;
      `);
  }
}
