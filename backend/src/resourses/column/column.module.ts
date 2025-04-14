import { Module } from "@nestjs/common";
import { ColumnService } from "./column.service";
import { ColumnController } from "./column.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnEntity } from "./columns.entity";
import { ColumnRepository } from "./column.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository],
  exports: [ColumnService],
})
export class ColumnModule { }
