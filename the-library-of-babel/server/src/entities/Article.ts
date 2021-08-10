import { BabelManager } from "../babel/BabelManager";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Article {
  static contentLen = BabelManager.contentLen;
  static addressLen = BabelManager.addressLen;

  static findContent(address: string): string {
    return BabelManager.getContent(address);
  }

  static findAddress(content: string): string {
    return BabelManager.getAddress(content);
  }

  @Field()
  address: string;

  @Field()
  content: string;
}
