import { User } from "../user.entity.js";

export const userProviders = [
  {
    provide: 'USER',
    useValue: User,
  },
]
