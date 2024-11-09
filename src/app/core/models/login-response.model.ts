// User interface within the response
export interface User {
  id: number;
  user_name: string;
  user_password: string;
}

// Interface for complete login response
export interface LoginResponse {
  message: string;
  user: User;
}
