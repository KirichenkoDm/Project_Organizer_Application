import { Module } from '@nestjs/common';
import { 
  ColumnModule, 
  CommentModule, 
  ProjectModule, 
  RoleModule, 
  TaskModule, 
  UserModule 
} from './resourses';

@Module({
  imports: [
    UserModule, 
    RoleModule, 
    ProjectModule, 
    ColumnModule, 
    TaskModule, 
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
