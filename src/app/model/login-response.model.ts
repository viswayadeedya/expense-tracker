export interface LoginResponse {
  identifier: String;
  password: String;
}

export interface RegisterResponse {
  id?: number;
  username: String;
  password: String;
  profileName: String;
  email: String;
}
