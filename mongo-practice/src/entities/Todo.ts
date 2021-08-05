import { Entity, BaseEntity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @ObjectIdColumn() 
  id!: ObjectID;

  @Column()
  title!: string;

  @Column()
  text!: string;
}
