export interface User {
  id: string;
  userId: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone: string;
  bio: string;
  avatar: string;
  favorites: string[];
  shelfBooks: string[];
}
