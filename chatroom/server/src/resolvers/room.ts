import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { MyContext } from "../types";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { Message } from "../entities/Message";

enum RoomChannel {
  message,
  isLeave,
}

@Resolver(Room)
export class RoomResolver {
  @Query(() => Room, { nullable: true })
  room(@Ctx() { req }: MyContext): Room | undefined {
    const userId = req.session.userId;
    if (!userId) {
      throw new Error("you should login first");
    }

    const user = User.findOne(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const room = user.room;
    return room;
  }

  @Mutation(() => Room)
  async pair(@Ctx() { req }: MyContext): Promise<Room> {
    const userId = req.session.userId;
    if (!userId) {
      throw new Error("you should login first");
    }

    const user = User.findOne(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const room = await Room.pair(user);

    return room;
  }

  //***********************************
  // message
  //***********************************

  @Subscription({
    topics: ({ context }) => {
      const { userId } = (context as MyContext).req.session;

      if (!userId) {
        throw new Error("you should login first");
      }

      return `ROOM|${RoomChannel.message}|${userId}`;
    },
  })
  subscribeMessage(@Root() message: Message): Message {
    return message;
  }

  @Mutation(() => Boolean)
  async message(
    @Arg("content") content: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    if (!content.length) {
      throw new Error("empty message is not allowed");
    }

    const userId = req.session.userId;
    if (!userId) {
      throw new Error("you should login first");
    }

    const user = User.findOne(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const room = user.room;
    if (!room) {
      throw new Error("you should pair first");
    }

    const message = Message.create(userId, content);
    room.messages.push(message);

    await Promise.all(
      room.users.map(async (user) => {
        const userId = user.id;
        await pubSub.publish(`ROOM|${RoomChannel.message}|${userId}`, message);
      })
    );

    return true;
  }

  //***********************************
  // leaveRoom
  //***********************************
  @Subscription({
    topics: ({ context }) => {
      const { userId } = (context as MyContext).req.session;

      if (!userId) {
        throw new Error("you should login first");
      }

      return `ROOM|${RoomChannel.isLeave}|${userId}`;
    },
  })
  subscribeIsLeave(@Root() isLeave: boolean): boolean {
    return isLeave;
  }

  @Mutation(() => Boolean)
  async leaveRoom(
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const userId = req.session.userId;
    if (!userId) {
      throw new Error("you should login first");
    }

    const user = User.findOne(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const room = user.room;
    if (!room) {
      throw new Error("you should pair first");
    }

    await Promise.all(
      room.users.map(async (user) => {
        user.room = undefined;
        const userId = user.id;
        await pubSub.publish(`ROOM|${RoomChannel.isLeave}|${userId}`, true);
      })
    );

    return true;
  }
}
