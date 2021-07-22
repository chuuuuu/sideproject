import { BabelManager } from "../babel/BabelManager";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Article {
  static findContent(address: string){
    return BabelManager.getContent(address);
  }

  static findAddress(content: string){
    return BabelManager.getAddress(content);
  }

  @Field()
  address: string;

  @Field()
  content: string;
}
