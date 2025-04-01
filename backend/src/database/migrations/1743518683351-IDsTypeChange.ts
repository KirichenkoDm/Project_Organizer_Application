import { MigrationInterface, QueryRunner } from "typeorm";

export class IDsTypeChange1743518683351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        -- remove foreign keys and unique constraints
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_foreign_key_projectid";
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_foreign_key_userid";
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_project_id_user_id_unique";

        ALTER TABLE public.columns DROP CONSTRAINT IF EXISTS "columns_foreign_key_projectid";
        ALTER TABLE public.columns DROP CONSTRAINT IF EXISTS "roles_column_name_project_id_unique";

        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_foreign_key_assignedid";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_foreign_key_columnid";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_foreign_key_projectid";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_self_refference_blockedby";

        ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS "comments_foreign_key_taskid";
        ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS "comments_foreign_key_userid";
      `);

      await queryRunner.query(/* sql */`
        -- remove primary keys
        ALTER TABLE public.users DROP CONSTRAINT IF EXISTS "users_pkey";
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_pkey";
        ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS "projects_pkey";
        ALTER TABLE public.columns DROP CONSTRAINT IF EXISTS "columns_pkey";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_pkey";
        ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS "comments_pkey";
      `);

      await queryRunner.query(/* sql */`
        -- remove columns
        ALTER TABLE public.users DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.projects DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.roles DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.columns DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.comments DROP COLUMN IF EXISTS "id";

        ALTER TABLE public.roles DROP COLUMN IF EXISTS "project_id";
        ALTER TABLE public.roles DROP COLUMN IF EXISTS "user_id";

        ALTER TABLE public.columns DROP COLUMN IF EXISTS "project_id";

        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "project_id";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "column_id";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "blocked_by";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "assigned_id";

        ALTER TABLE public.comments DROP COLUMN IF EXISTS "user_id";
        ALTER TABLE public.comments DROP COLUMN IF EXISTS "task_id";
      `);

      await queryRunner.query(/* sql */`
        -- return columns with new types
        ALTER TABLE public.users ADD COLUMN "id" SERIAL NOT NULL PRIMARY KEY; 
        ALTER TABLE public.projects ADD COLUMN "id" SERIAL NOT NULL PRIMARY KEY; 
        ALTER TABLE public.roles ADD COLUMN "id" SERIAL NOT NULL PRIMARY KEY;
        ALTER TABLE public.columns ADD COLUMN "id" SERIAL NOT NULL PRIMARY KEY;
        ALTER TABLE public.tasks ADD COLUMN "id" SERIAL NOT NULL PRIMARY KEY;
        ALTER TABLE public.comments ADD COLUMN "id" SERIAL NOT NULL PRIMARY KEY;

        ALTER TABLE public.roles ADD COLUMN "project_id" INTEGER NOT NULL;
        ALTER TABLE public.roles ADD COLUMN "user_id" INTEGER NOT NULL;

        ALTER TABLE public.columns ADD COLUMN "project_id" INTEGER NOT NULL;

        ALTER TABLE public.tasks ADD COLUMN "project_id" INTEGER NOT NULL;
        ALTER TABLE public.tasks ADD COLUMN "column_id" INTEGER NOT NULL;
        ALTER TABLE public.tasks ADD COLUMN "blocked_by" INTEGER;
        ALTER TABLE public.tasks ADD COLUMN "assigned_id" INTEGER;

        ALTER TABLE public.comments ADD COLUMN "user_id" INTEGER NOT NULL;
        ALTER TABLE public.comments ADD COLUMN "task_id" INTEGER NOT NULL;
      `);
      
      await queryRunner.query(/* sql */`
        -- return keys
        -- roles
        ALTER TABLE public.roles 
          ADD CONSTRAINT "roles_foreign_key_project_id"
            FOREIGN KEY ("project_id") 
              REFERENCES public.projects("id");

        ALTER TABLE public.roles 
          ADD CONSTRAINT "roles_foreign_key_user_id"
            FOREIGN KEY ("user_id")
              REFERENCES public.users("id");

        ALTER TABLE public.roles
          ADD CONSTRAINT "roles_project_id_user_id_unique" 
            UNIQUE ("project_id", "user_id");

        -- columns
        ALTER TABLE public.columns 
          ADD CONSTRAINT "columns_foreign_key_project_id"
            FOREIGN KEY ("project_id")
              REFERENCES public.projects("id");

        ALTER TABLE public.columns
          ADD CONSTRAINT "roles_column_name_project_id_unique" 
            UNIQUE ("column_name", "project_id");

        -- tasks
        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_foreign_key_assigned_id"
            FOREIGN KEY ("assigned_id")
            REFERENCES public.users("id");

        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_foreign_key_column_id"
            FOREIGN KEY ("column_id")
              REFERENCES public.columns("id");

        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_foreign_key_project_id"
            FOREIGN KEY ("project_id")
              REFERENCES public.projects("id");

        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_self_refference_blocked_by"
            FOREIGN KEY ("blocked_by")
              REFERENCES public.tasks("id");

        -- comments
        ALTER TABLE public.comments 
          ADD CONSTRAINT "comments_foreign_key_task_id"
            FOREIGN KEY ("task_id")
              REFERENCES public.tasks("id");

        ALTER TABLE public.comments 
          ADD CONSTRAINT "comments_foreign_key_user_id"
            FOREIGN KEY ("user_id")
              REFERENCES public.users("id");
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        -- remove keys
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_foreign_key_project_id";
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_foreign_key_user_id";
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_project_id_user_id_unique";

        ALTER TABLE public.columns DROP CONSTRAINT IF EXISTS "columns_foreign_key_project_id";
        ALTER TABLE public.columns DROP CONSTRAINT IF EXISTS "roles_column_name_project_id_unique";

        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_foreign_key_assigned_id";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_foreign_key_column_id";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_foreign_key_project_id";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_self_refference_blocked_by";

        ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS "comments_foreign_key_task_id";
        ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS "comments_foreign_key_user_id";
      `);

      await queryRunner.query(/* sql */`
        ALTER TABLE public.users DROP CONSTRAINT IF EXISTS "users_pkey";
        ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS "roles_pkey";
        ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS "projects_pkey";
        ALTER TABLE public.columns DROP CONSTRAINT IF EXISTS "columns_pkey";
        ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS "tasks_pkey";
        ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS "comments_pkey";
      `);

      await queryRunner.query(/* sql */`
        -- remove columns
        ALTER TABLE public.users DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.projects DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.roles DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.columns DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "id";
        ALTER TABLE public.comments DROP COLUMN IF EXISTS "id";

        ALTER TABLE public.roles DROP COLUMN IF EXISTS "project_id";
        ALTER TABLE public.roles DROP COLUMN IF EXISTS "user_id";

        ALTER TABLE public.columns DROP COLUMN IF EXISTS "project_id";

        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "project_id";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "column_id";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "blocked_by";
        ALTER TABLE public.tasks DROP COLUMN IF EXISTS "assigned_id";

        ALTER TABLE public.comments DROP COLUMN IF EXISTS "user_id";
        ALTER TABLE public.comments DROP COLUMN IF EXISTS "task_id";
      `);

      await queryRunner.query(/* sql */`
        -- return columns with old types
        ALTER TABLE public.users ADD COLUMN "id" uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY;
        ALTER TABLE public.projects ADD COLUMN "id" uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY; 
        ALTER TABLE public.roles ADD COLUMN "id" uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY;
        ALTER TABLE public.columns ADD COLUMN "id" uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY;
        ALTER TABLE public.tasks ADD COLUMN "id" uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY;
        ALTER TABLE public.comments ADD COLUMN "id" uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY;

        ALTER TABLE public.roles ADD COLUMN "project_id" uuid NOT NULL;
        ALTER TABLE public.roles ADD COLUMN "user_id" uuid NOT NULL;

        ALTER TABLE public.columns ADD COLUMN "project_id" uuid NOT NULL;

        ALTER TABLE public.tasks ADD COLUMN "project_id" uuid NOT NULL;
        ALTER TABLE public.tasks ADD COLUMN "column_id" uuid NOT NULL;
        ALTER TABLE public.tasks ADD COLUMN "blocked_by" uuid;
        ALTER TABLE public.tasks ADD COLUMN "assigned_id" uuid;

        ALTER TABLE public.comments ADD COLUMN "user_id" uuid NOT NULL;
        ALTER TABLE public.comments ADD COLUMN "task_id" uuid NOT NULL;
      `);

      await queryRunner.query(/* sql */`
        -- return keys
        -- roles
        ALTER TABLE public.roles 
          ADD CONSTRAINT "roles_foreign_key_project_id"
            FOREIGN KEY ("project_id") 
              REFERENCES public.projects("id");

        ALTER TABLE public.roles 
          ADD CONSTRAINT "roles_foreign_key_user_id"
            FOREIGN KEY ("user_id")
            REFERENCES public.users("id");

        ALTER TABLE public.roles
          ADD CONSTRAINT "roles_project_id_user_id_unique" UNIQUE ("project_id", "user_id");

        -- columns
        ALTER TABLE public.columns 
          ADD CONSTRAINT "columns_foreign_key_project_id"
            FOREIGN KEY ("project_id")
              REFERENCES public.projects("id");

        ALTER TABLE public.columns
          ADD CONSTRAINT "roles_column_name_project_id_unique" UNIQUE ("column_name", "project_id");

        -- tasks
        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_foreign_key_assigned_id"
            FOREIGN KEY ("assigned_id")
            REFERENCES public.users("id");

        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_foreign_key_column_id"
            FOREIGN KEY ("column_id")
              REFERENCES public.columns("id");

        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_foreign_key_project_id"
            FOREIGN KEY ("project_id")
              REFERENCES public.projects("id");

        ALTER TABLE public.tasks 
          ADD CONSTRAINT "tasks_self_refference_blocked_by"
            FOREIGN KEY ("blocked_by")
              REFERENCES public.tasks("id");

        -- comments
        ALTER TABLE public.comments 
          ADD CONSTRAINT "comments_foreign_key_task_id"
            FOREIGN KEY ("task_id")
              REFERENCES public.tasks("id");

        ALTER TABLE public.comments 
          ADD CONSTRAINT "comments_foreign_key_user_id"
            FOREIGN KEY ("user_id")
              REFERENCES public.users("id");
      `);
    }
}
