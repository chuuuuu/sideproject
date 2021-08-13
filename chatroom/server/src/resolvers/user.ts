import { User } from "../entities/User";
import { MyContext } from "../types";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => User)
  login(@Ctx() { req }: MyContext): User {
    if (!req.session.userId) {
      const user = User.create();
      req.session.userId = user.id;

      return user;
    }

    const user = User.findOne(req.session.userId);
    if (!user) {
      throw new Error("you have been deleted for some reason");
    }

    return user;
  }
}
