import { Message } from "../entities/Message";
import { Arg, Resolver, Query, Mutation } from "type-graphql";

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(): Message[] {
    return Message.find();
  }

  @Mutation(() => Number)
  postMessage(
    @Arg("user") user: string,
    @Arg("content") content: string
  ): number {
    return Message.create(user, content);
  }
}
