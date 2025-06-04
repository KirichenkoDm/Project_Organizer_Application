import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersInsert1742896192584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.users ("id", "email", "password", "first_name", "last_name")
        VALUES
        ('1', 'Kyrychenko@example.com', 'qwerty', 'Dmytro', 'Kyrychenko'),
        ('2', 'Serhiyenko@example.com', 'qwerty', 'Serhiy', 'Serhiyenko'),
        ('3', 'Egorenko@example.com', 'qwerty', 'Egor', 'Egorenko'),
        ('4', 'Viktorenko@example.com', 'qwerty', 'Viktor', 'Viktorenko'),
        ('5', 'Volodymyrenko@example.com', 'qwerty', 'Volodymyr', 'Volodymyrenko');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.users;
      `);
  }
}
