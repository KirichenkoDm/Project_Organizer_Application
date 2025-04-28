import { Module } from "@nestjs/common";
import { ColumnService } from "./column.service";
import { ColumnController } from "./column.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnEntity } from "./columns.entity";
import { ColumnRepository } from "./column.repository";
import { ColumnCore } from "./column.core";

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository, ColumnCore],
  exports: [ColumnService],
})
export class ColumnModule { }
