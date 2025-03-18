## **User**
  + Registration. User inputs email, password, firstName, lastName;
  + Logging In. User inputs email, password;
    - Logged user can create new project. User inputs name, theme (dropdown), description.
    - Logget user can see list of his projects.
  + User Page.
    - Edit Personal information.
    - Delete (archive) account.

## **Project** + **Roles**
  + User who created the project gets role *Project Managet* in **Roles** Table;
  + Project Managet can add other users to the project giving them *Project Managet* or *member/participant* role,
  new row in **Roles** Table created;
  + Project Managet can remove users with role *member/participant* from project, related row removed from **Roles** Table;
  + Project Managet can mark project as *finished*. To do this, the project manager have to create a report.
  
## **Column**
  + There is a **board** on the project page, that contains columns of this project;
  + By default, three columns are created with the project. **These columns cannot be deleted**.;
  + Project Managet can create custom columns with custom name and order;
  + Column automatically gets related project id;
  + Project Managet can re-order, rename, delete columns. **Default columns cannot be touched**.

## **Task**
  + Project Managet can add new tasks to specific column, createn new row in the **Tasks** table;
    - Task get name, description, and, optionally, start and end dates;
    - Task automatically gets related column and project ids.
  + **Project Managet cannot add new tasks to *finished* projects**;
  + Project Managet can edit and delete task;
  + Project Managet can move task to different column;
  + Project Managet can mark task as blocked by other task. Blocked task cannot be moved to different column;
  + Project Managet can assing entry from **Roles** Table, related to this project, to a task;
  + Project Managet can archive task, removing task from board, by setting column id to null.

## **Comment**
  + Users with access to task can post comments to specific task;
  + Comment automatically gets related user and task ids;
  + User can edit, delete and format their comments. 