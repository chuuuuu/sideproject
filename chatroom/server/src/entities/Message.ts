import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Message {
  static create(senderId: string, content: string): Message {
    const createdAt = new Date();
    const message: Message = { senderId, content, createdAt };
    return message;
  }

  @Field()
  senderId: string;

  @Field()
  content: string;

  @Field(() => String)
  createdAt: Date;
}
