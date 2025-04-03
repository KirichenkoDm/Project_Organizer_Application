import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersInsert1742896192584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        INSERT INTO public.users ("email", "password", "salt", "firstname", "lastname")
        VALUES
        ('Kyrychenko@example.com', 'qwerty', '12345', 'Dmytro', 'Kyrychenko'),
        ('Serhiyenko@example.com', 'qwerty', '12345', 'Serhiy', 'Serhiyenko'),
        ('Egorenko@example.com', 'qwerty', '12345', 'Egor', 'Egorenko'),
        ('Viktorenko@example.com', 'qwerty', '12345', 'Viktor', 'Viktorenko'),
        ('Volodymyrenko@example.com', 'qwerty', '12345', 'Volodymyr', 'Volodymyrenko');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.users;
      `);
  }
}
