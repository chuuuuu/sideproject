import DataLoader from "dataloader";
import { User } from "../entities/User";

// Input: Array of id
// e.g. [1, 78, 8, 9]
// Output: Corresponding Object Array
// e.g. [{id: 1, username: 'alice'}, {id: 78, username: 'bob'}, {id: 8, username: 'carol'}, {id: 9, username: 'dave'}]
export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    const sortedUsers = userIds.map((userId) => userIdToUser[userId]);
    return sortedUsers;
  });
