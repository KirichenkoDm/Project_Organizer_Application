## **User**
  + Registration. User inputs email, password, firstName, lastName;
  + Logging In. User inputs email, password;
    - Logged user can create new project. User inputs name, theme (dropdown), description.
    - Logged user can see list of his projects.
  + User Page.
    - Edit Personal information.
    - Delete (archive) account.
x
## **Project** + **Roles**
  + User who created the project gets role *Owner* in **Roles** Table;
    - hierarchy of roles: Owner -> Project Manager -> member.
  + Project Manager+ can add other users to the project, giving them *Project Manager* or *member/participant* role;
  new row in **Roles** Table created;
  + Project Manager+ can remove users with role *member/participant* from project, related row removed from **Roles** Table;
  + Owner can remove users with role *Project Manager* from project;
  + Project Manager+ can mark project as *finished*. To do this, he had to create a report.
  
## **Column**
  + There is a **board** on the project page, that contains columns of this project;
  + By default, three columns are created with the project.
  + Project Manager+ can create custom columns with custom name and order;
  + Column automatically gets related project id;
  + Project Manager+ can re-order, rename, delete columns. 
    - **Default columns cannot be deleted or removed, but can be renamed**.

## **Task**
  + Any role can add new tasks to the first default column (representing "not started"), creating new row in the **Tasks** table;
    - Task get name, description, and, optionally, start and end dates;
    - Task automatically gets related column and project ids.
  + **New tasks cannot be added to *finished* projects**;
  + Project Manager+ can archive task; 
    - Archived tasks can be viewed and restored from the *archive*.
  + All roles in the project can assign themselves or any other participant of the project to the task;
  + Any role can move task to different column; 
    - If no one assigned to the task, it cannot be moved from "not started" column. 
  + Any role can mark a task as blocked by other task. Blocked task cannot be moved to the third default column (representing "finished");

## **Comment**
  + Users with access to task can post comments to specific task;
  + Comment automatically gets related user and task ids;
  + User can edit, delete and format **their** comments. 