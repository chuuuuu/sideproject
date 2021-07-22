import { Article } from "../entities/Article";
import {
  Arg,
  Resolver,
  Query,
} from "type-graphql";

@Resolver()
export class ArticleResolver {
  @Query(() => String)
  content(
    @Arg("address") address: string
  ): string {
    return Article.findContent(address);
  }

  @Query(() => String)
  address(
    @Arg("content") content: string
  ): string {
    return Article.findAddress(content);
  }
}
