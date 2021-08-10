import { Article } from "../entities/Article";
import { Arg, Resolver, Query, ObjectType, Field } from "type-graphql";

@ObjectType()
class Response {
  @Field(() => [String], { nullable: true })
  errors?: String[];

  @Field(() => String, { nullable: true })
  data?: String;
}

@Resolver()
export class ArticleResolver {
  @Query(() => Response)
  getContent(@Arg("address") address: string): Response {
    if (address.length > Article.addressLen) {
      return {
        errors: [`address length must not longer than ${Article.addressLen}`],
      };
    }

    return { data: Article.findContent(address) };
  }

  @Query(() => Response)
  getAddress(@Arg("content") content: string): Response {
    if (content.length > Article.contentLen) {
      return {
        errors: [`content length must not longer than ${Article.contentLen}`],
      };
    }

    return { data: Article.findAddress(content) };
  }
}
