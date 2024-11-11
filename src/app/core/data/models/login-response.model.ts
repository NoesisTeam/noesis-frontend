export interface LoginResponseModel {
  message: string;
  user: {
    id: number;
    user_name: string;
    user_password: string;
  };
}
