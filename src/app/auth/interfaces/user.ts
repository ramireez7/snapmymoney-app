export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  balance?: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfileEdit {
  name: string;
  email: string;
}

export interface UserAvatarEdit {
  avatar: string;
}

export interface UserPasswordEdit {
  password: string;
}