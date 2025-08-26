import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class UsersInsert1742896192584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('qwerty', saltRounds);

    await queryRunner.query(/* sql */ `
        INSERT INTO public.users ("email", "password", "first_name", "last_name")
        VALUES
        ('Kyrychenko@example.com', '${passwordHash}', 'Dmytro', 'Kyrychenko'),
        ('Serhiyenko@example.com', '${passwordHash}', 'Serhiy', 'Serhiyenko'),
        ('Egorenko@example.com', '${passwordHash}', 'Egor', 'Egorenko'),
        ('Viktorenko@example.com', '${passwordHash}', 'Viktor', 'Viktorenko'),
        ('Volodymyrenko@example.com', '${passwordHash}', 'Volodymyr', 'Volodymyrenko');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        DELETE FROM public.users;
      `);
  }
}
