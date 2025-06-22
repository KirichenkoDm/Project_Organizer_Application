# Project Organizer Application
## Prerequirements:
  + Operating system: Windows 11;
  + Installed latest node.js and NPM
    - https://nodejs.org/en/download/current
    - after installation, run: npm install -g npm
  + You need to have local PostgreSQL database
    - Download and install pgAdmin 4 v9.4: https://www.pgadmin.org/download/pgadmin-4-windows/
    - setup local server: https://www.pgadmin.org/docs/pgadmin4/development/connecting.html
    - create empty local database: https://www.pgadmin.org/docs/pgadmin4/development/database_dialog.html
## Sutup:
### To setup database:
  + Inserts database credentials into /backend/.env.local in lines 2-5.
  + Rename file /backend/.env.local to /backend/.env
  + Run commands:
    - cd backend/
    - npm run migrations:up
  + Done!

### To start backend:
  + Run commands:
    - cd backend/
    - npm start
  + Done!

### To start backend:
  + Run commands:
    - cd frontend/
    - npm run dev
  + Go to http://localhost:3000/home
  + Done!