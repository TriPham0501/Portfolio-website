export interface User {
  username?: string;
  password?: string;
}

export interface UserResponse {
  username: string;
  displayname: string;
  accessToken: string;
  capabilities: string[];
}

export interface Profile {
  Username: string;
  DisplayName: string;
  Role: string;
  Capabilities: string[];
}