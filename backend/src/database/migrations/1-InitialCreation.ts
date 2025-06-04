import { MigrationInterface, QueryRunner } from "typeorm";
export class InitialCreation1742833962934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      -- users table
      CREATE TABLE public.users (
        "id" SERIAL NOT NULL PRIMARY KEY, 
        "email" varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL, 
        "refresh_token" varchar(255) DEFAULT NULL, 
        "first_name" varchar(255) NOT NULL, 
        "last_name" varchar(255) NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "archived_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        
        CONSTRAINT users_email_unique UNIQUE ("email")
      );

      --projects table and enum
      CREATE TYPE public.project_theme_enum AS 
      ENUM(
        'Cybersecurity', 
        'Functional security', 
        'Engineering', 
        'Computer science', 
        'Humanitarian'
      );

      CREATE TABLE public.projects (
        "id" SERIAL NOT NULL PRIMARY KEY, 
        "name" varchar(255) NOT NULL, 
        "theme" public.project_theme_enum DEFAULT 'Computer science' NOT NULL, 
        "description" varchar(255) NOT NULL, 
        "report" varchar(255) DEFAULT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "archived_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, 

        CONSTRAINT projects_name_unique UNIQUE ("name")
      );

      -- roles table and enum
      CREATE TYPE public.roles_enum AS 
      ENUM(
        'Owner', 
        'Project manager', 
        'Member'
      );

      CREATE TABLE public.roles (
        "id" SERIAL NOT NULL PRIMARY KEY, 
        "role" public.roles_enum DEFAULT 'Member' NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "archived_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        "project_id" INTEGER NOT NULL, 
        "user_id" INTEGER NOT NULL
      );

      -- tasks table
      CREATE TABLE public.tasks (
        id SERIAL NOT NULL PRIMARY KEY, 
        "name" varchar(255) NOT NULL, 
        "description" varchar(255) NOT NULL, 
        "start" TIMESTAMP WITH TIME ZONE, 
        "end" TIMESTAMP WITH TIME ZONE,
        "order" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "archived_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        "project_id" INTEGER NOT NULL, 
        "column_id" INTEGER NOT NULL, 
        "blocked_by" INTEGER,
        "assigned_id" INTEGER
      );

      -- columns table
      CREATE TABLE public.columns (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "name" varchar(255) NOT NULL, 
        "order" integer NOT NULL, 
        "is_custom" boolean NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "archived_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        "project_id" INTEGER NOT NULL
      );

      -- comments table
      CREATE TABLE public.comments (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "text" jsonb DEFAULT '{}' :: jsonb NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        "archived_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        "user_id" INTEGER NOT NULL, 
        "task_id" INTEGER NOT NULL
      );

      -- foreign keys
      -- users
      --ALTER TABLE public.users
      --  ADD CONSTRAINT users_foreign_key_roleId
      --    FOREIGN KEY (roleId)
      --      REFERENCES public.roles(id);
      
      -- roles
      ALTER TABLE public.roles
        ADD CONSTRAINT roles_foreign_key_project_id
          FOREIGN KEY ("project_id") 
            REFERENCES public.projects(id);

      ALTER TABLE public.roles
        ADD CONSTRAINT roles_foreign_key_user_id 
          FOREIGN KEY ("user_id") 
            REFERENCES public.users(id); 
      
      -- columns
      ALTER TABLE public.columns 
        ADD CONSTRAINT columns_foreign_key_project_id 
          FOREIGN KEY ("project_id") 
            REFERENCES public.projects(id);

      -- tasks
      ALTER TABLE public.tasks
        ADD CONSTRAINT tasks_foreign_key_project_id
          FOREIGN KEY ("project_id") 
            REFERENCES public.projects(id);

      ALTER TABLE public.tasks 
        ADD CONSTRAINT tasks_foreign_key_column_id 
          FOREIGN KEY ("column_id") 
            REFERENCES public.columns(id);

      ALTER TABLE public.tasks 
        ADD CONSTRAINT tasks_self_reference_blocked_by
         FOREIGN KEY ("blocked_by") 
          REFERENCES public.tasks(id);

      ALTER TABLE public.tasks
        ADD CONSTRAINT tasks_foreign_key_assigned_id
          FOREIGN KEY ("assigned_id")
            REFERENCES public.users(id);

      -- comments
      ALTER TABLE public.comments 
        ADD CONSTRAINT comments_foreign_key_user_id 
          FOREIGN KEY ("user_id") 
            REFERENCES public.users(id);

      ALTER TABLE public.comments 
        ADD CONSTRAINT comments_foreign_key_task_id 
          FOREIGN KEY ("task_id") 
            REFERENCES public.tasks(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      DROP TABLE public.comments ;
      DROP TABLE public.columns;
      DROP TABLE public.tasks;
      DROP TABLE public.roles;
      DROP TYPE public.roles_enum;
      DROP TABLE public.projects;
      DROP TYPE public.project_theme_enum;
      DROP TABLE public.users;
    `);
  }
}
