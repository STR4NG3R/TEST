import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Notes extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: "jsonb"})
  content: Object
}
