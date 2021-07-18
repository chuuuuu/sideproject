import { Message } from "../entities/Message";
import {
  Arg,
  Resolver,
  Query,
  Mutation,
  Subscription,
  PubSub,
  Publisher,
  Root,
} from "type-graphql";

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(): Message[] {
    return Message.find();
  }

  @Mutation(() => Number)
  async postMessage(
    @Arg("user") user: string,
    @Arg("content") content: string,
    @PubSub("messages") publish: Publisher<Message>
  ): Promise<number> {
    const id = Message.create(user, content);
    await publish(Message.findLast());
    return id;
  }

  @Subscription({ topics: "messages" })
  newMessage(@Root() message: Message): Message {
    return message;
  }
}
