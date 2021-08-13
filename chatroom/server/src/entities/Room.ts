import { ObjectType, Field } from "type-graphql";
import { Message } from "./Message";
import { User } from "./User";
import { v4 } from "uuid";
import events from "events";

@ObjectType()
export class Room {
  private static pending: User[] = [];

  private static eventEmitter = new events.EventEmitter();

  private static create(alice: User, bob: User): Room {
    const room: Room = { id: v4(), messages: [], users: [alice, bob] };
    alice.room = room;
    bob.room = room;

    return room;
  }

  static async pair(alice: User) {
    if (alice.room) {
      throw new Error("you have already been in a room");
    }

    if (this.pending.length) {
      const bob = this.pending.pop()!;
      const room = this.create(alice, bob);
      this.eventEmitter.emit(`${bob.id}|pair`, room);

      return room;
    }

    this.pending.push(alice);
    const room = await new Promise<Room>((res) =>
      this.eventEmitter.on(`${alice.id}|pair`, (room: Room) => {
        res(room);
      })
    );

    return room;
  }

  @Field()
  id: string;

  @Field(() => [User])
  users: User[];

  @Field(() => [Message])
  messages: Message[];
}
