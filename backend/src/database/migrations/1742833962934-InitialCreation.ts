import { MigrationInterface, QueryRunner } from "typeorm";
export class InitialCreation1742833962934 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */`
      -- users table
      CREATE TABLE public.users (
        id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY, 
        email varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL, 
        salt varchar(255) NOT NULL, 
        firstName varchar(255) NOT NULL, 
        lastName varchar(255) NOT NULL, 
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        archivedAt TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        
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
        id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY, 
        "name" varchar(255) NOT NULL, 
        theme public.project_theme_enum DEFAULT 'Computer science' NOT NULL, 
        "description" varchar(255) NOT NULL, 
        report varchar(255) DEFAULT NULL, 
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        archivedAt TIMESTAMP WITH TIME ZONE DEFAULT NULL, 

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
        id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY, 
        "role" public.roles_enum DEFAULT 'Member' NOT NULL, 
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        archivedAt TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        projectId uuid NOT NULL, 
        userId uuid NOT NULL
      );

      -- tasks table
      CREATE TABLE public.tasks (
        id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY, 
        "name" varchar(255) NOT NULL, 
        "description" varchar(255) NOT NULL, 
        "start" TIMESTAMP WITH TIME ZONE, 
        "end" TIMESTAMP WITH TIME ZONE, 
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        archivedAt TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        projectId uuid NOT NULL, 
        columnId uuid NOT NULL, 
        blockedBy uuid,
        assignedId uuid
      );

      -- columns table
      CREATE TABLE public.columns (
        id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
        columnName varchar(255) NOT NULL, 
        "order" integer NOT NULL, 
        isCustom boolean NOT NULL, 
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        archivedAt TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        projectId uuid NOT NULL
      );

      -- comments table
      CREATE TABLE public.comments (
        id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
        "text" jsonb DEFAULT '{}' :: jsonb NOT NULL, 
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL, 
        archivedAt TIMESTAMP WITH TIME ZONE DEFAULT NULL, 
        userId uuid NOT NULL, 
        taskId uuid NOT NULL
      );

      -- foreign keys
      -- users
      --ALTER TABLE public.users
      --  ADD CONSTRAINT users_foreign_key_roleId
      --    FOREIGN KEY (roleId)
      --      REFERENCES public.roles(id);
      
      -- roles
      ALTER TABLE public.roles
        ADD CONSTRAINT roles_foreign_key_projectId
          FOREIGN KEY (projectId) 
            REFERENCES public.projects(id);

      ALTER TABLE public.roles
        ADD CONSTRAINT roles_foreign_key_userId 
          FOREIGN KEY (userId) 
            REFERENCES public.users(id); 
      
      -- columns
      ALTER TABLE public.columns 
        ADD CONSTRAINT columns_foreign_key_projectId 
          FOREIGN KEY (projectId) 
            REFERENCES public.projects(id);

      -- tasks
      ALTER TABLE public.tasks
        ADD CONSTRAINT tasks_foreign_key_projectId
          FOREIGN KEY (projectId) 
            REFERENCES public.projects(id);

      ALTER TABLE public.tasks 
        ADD CONSTRAINT tasks_foreign_key_columnId 
          FOREIGN KEY (columnId) 
            REFERENCES public.columns(id);

      ALTER TABLE public.tasks 
        ADD CONSTRAINT tasks_self_refference_blockedBy
         FOREIGN KEY (blockedBy) 
          REFERENCES public.tasks(id);

      ALTER TABLE public.tasks
        ADD CONSTRAINT tasks_foreign_key_assignedId
          FOREIGN KEY (assignedId)
            REFERENCES public.users(id);

      -- comments
      ALTER TABLE public.comments 
        ADD CONSTRAINT comments_foreign_key_userId 
          FOREIGN KEY (userId) 
            REFERENCES public.users(id);

      ALTER TABLE public.comments 
        ADD CONSTRAINT comments_foreign_key_taskId 
          FOREIGN KEY (taskId) 
            REFERENCES public.tasks(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */`
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
