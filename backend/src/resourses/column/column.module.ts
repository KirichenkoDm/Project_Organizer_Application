import { Module } from "@nestjs/common";
import { ColumnService } from "./column.service";
import { ColumnController } from "./column.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnEntity } from "./columns.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule { }
