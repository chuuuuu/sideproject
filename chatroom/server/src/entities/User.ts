import { ObjectType, Field } from "type-graphql";
import { Room } from "./Room";
import { v4 } from "uuid";

@ObjectType()
export class User {
  static users: Record<string, User> = {};

  static findOne(userId: string): User | undefined {
    return this.users[userId];
  }

  static create(): User {
    const id = v4();
    const user: User = { id: id };
    this.users[id] = user;

    return user;
  }

  @Field()
  id: string;

  room?: Room;
}
