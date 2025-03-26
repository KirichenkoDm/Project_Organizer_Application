import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamingDatabaseColumns1742990873704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        -- users table
        ALTER TABLE public.users RENAME COLUMN "firstname" TO "first_name";
        ALTER TABLE public.users RENAME COLUMN "lastname" TO "last_name";
        ALTER TABLE public.users RENAME COLUMN "createdat" TO "created_at";
        ALTER TABLE public.users RENAME COLUMN "updatedat" TO "updated_at";
        ALTER TABLE public.users RENAME COLUMN "archivedat" TO "archived_at";

        -- projects table
        ALTER TABLE public.projects RENAME COLUMN "createdat" TO "created_at";
        ALTER TABLE public.projects RENAME COLUMN "updatedat" TO "updated_at";
        ALTER TABLE public.projects RENAME COLUMN "archivedat" TO "archived_at";

        -- roles table
        ALTER TABLE public.roles RENAME COLUMN "projectid" TO "project_id";
        ALTER TABLE public.roles RENAME COLUMN "userid" TO "user_id";
        ALTER TABLE public.roles RENAME COLUMN "createdat" TO "created_at";
        ALTER TABLE public.roles RENAME COLUMN "updatedat" TO "updated_at";
        ALTER TABLE public.roles RENAME COLUMN "archivedat" TO "archived_at";

        -- columns table
        ALTER TABLE public.columns RENAME COLUMN "columnname" TO "column_name";
        ALTER TABLE public.columns RENAME COLUMN "iscustom" TO "is_custom";
        ALTER TABLE public.columns RENAME COLUMN "projectid" TO "project_id";
        ALTER TABLE public.columns RENAME COLUMN "createdat" TO "created_at";
        ALTER TABLE public.columns RENAME COLUMN "updatedat" TO "updated_at";
        ALTER TABLE public.columns RENAME COLUMN "archivedat" TO "archived_at";

        -- tasks table
        ALTER TABLE public.tasks RENAME COLUMN "projectid" TO "project_id";
        ALTER TABLE public.tasks RENAME COLUMN "columnid" TO "column_id";
        ALTER TABLE public.tasks RENAME COLUMN "blockedby" TO "blocked_by";
        ALTER TABLE public.tasks RENAME COLUMN "assignedid" TO "assigned_id";
        ALTER TABLE public.tasks RENAME COLUMN "createdat" TO "created_at";
        ALTER TABLE public.tasks RENAME COLUMN "updatedat" TO "updated_at";
        ALTER TABLE public.tasks RENAME COLUMN "archivedat" TO "archived_at";

        -- comments table 
        ALTER TABLE public.comments RENAME COLUMN "userid" TO "user_id";
        ALTER TABLE public.comments RENAME COLUMN "taskid" TO "task_id";
        ALTER TABLE public.comments RENAME COLUMN "createdat" TO "created_at";
        ALTER TABLE public.comments RENAME COLUMN "updatedat" TO "updated_at";
        ALTER TABLE public.comments RENAME COLUMN "archivedat" TO "archived_at";
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(/* sql */`
        -- users table
        ALTER TABLE public.users RENAME COLUMN "first_name" TO "firstname";
        ALTER TABLE public.users RENAME COLUMN "last_name" TO "lastname";
        ALTER TABLE public.users RENAME COLUMN "created_at" TO "createdat";
        ALTER TABLE public.users RENAME COLUMN "updated_at" TO "updatedat";
        ALTER TABLE public.users RENAME COLUMN "archived_at" TO "archivedat";

        -- project table
        ALTER TABLE public.projects RENAME COLUMN "created_at" TO "createdat";
        ALTER TABLE public.projects RENAME COLUMN "updated_at" TO "updatedat";
        ALTER TABLE public.projects RENAME COLUMN "archived_at" TO "archivedat";

        -- roles table
        ALTER TABLE public.roles RENAME COLUMN "project_id" TO "projectid";
        ALTER TABLE public.roles RENAME COLUMN "user_id" TO "userid";
        ALTER TABLE public.roles RENAME COLUMN "created_at" TO "createdat";
        ALTER TABLE public.roles RENAME COLUMN "updated_at" TO "updatedat";
        ALTER TABLE public.roles RENAME COLUMN "archived_at" TO "archivedat";

        -- columns table
        ALTER TABLE public.columns RENAME COLUMN "column_name" TO "columnname";
        ALTER TABLE public.columns RENAME COLUMN "is_custom" TO "iscustom";
        ALTER TABLE public.columns RENAME COLUMN "project_id" TO "projectid";
        ALTER TABLE public.columns RENAME COLUMN "created_at" TO "createdat";
        ALTER TABLE public.columns RENAME COLUMN "updated_at" TO "updatedat";
        ALTER TABLE public.columns RENAME COLUMN "archived_at" TO "archivedat";

        -- tasks table
        ALTER TABLE public.tasks RENAME COLUMN "project_id" TO "projectid";
        ALTER TABLE public.tasks RENAME COLUMN "column_id" TO "columnid";
        ALTER TABLE public.tasks RENAME COLUMN "blocked_by" TO "blockedby";
        ALTER TABLE public.tasks RENAME COLUMN "assigned_id" TO "assignedid";
        ALTER TABLE public.tasks RENAME COLUMN "created_at" TO "createdat";
        ALTER TABLE public.tasks RENAME COLUMN "updated_at" TO "updatedat";
        ALTER TABLE public.tasks RENAME COLUMN "archived_at" TO "archivedat";

        -- comments table
        ALTER TABLE public.comments RENAME COLUMN "user_id" TO "userid";
        ALTER TABLE public.comments RENAME COLUMN "task_id" TO "taskid";
        ALTER TABLE public.comments RENAME COLUMN "created_at" TO "createdat";
        ALTER TABLE public.comments RENAME COLUMN "updated_at" TO "updatedat";
        ALTER TABLE public.comments RENAME COLUMN "archived_at" TO "archivedat";
      `);
    }

}
