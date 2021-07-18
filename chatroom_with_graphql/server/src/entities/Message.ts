import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Message {
  private static messages: Message[] = [];
  static find() {
    return this.messages;
  }

  static findOne(id: number) {
    return this.messages[id];
  }

  static findLast() {
    return this.messages[this.messages.length-1];
  }

  static create(user: string, content: string): number {
    const id = this.messages.length;
    this.messages.push({ id, user, content });

    return id;
  }

  @Field(() => ID)
  id: number;

  @Field()
  user: string;

  @Field()
  content: string;
}
