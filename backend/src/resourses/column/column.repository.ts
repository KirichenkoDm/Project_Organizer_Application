import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ColumnEntity } from ".";

@Injectable()
export class ColumnRepository extends Repository<ColumnEntity> {

  constructor(private dataSource: DataSource) {
    super(ColumnEntity, dataSource.createEntityManager());
  }
}