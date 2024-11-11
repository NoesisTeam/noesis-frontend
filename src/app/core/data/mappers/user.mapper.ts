import { User, UserCreate } from '../../domain/entities';
import { LoginResponseModel, SignupResponse } from '../models';

export class UserMapper {
  static fromLoginResponse(response: LoginResponseModel): {
    message: string;
    user: User;
  } {
    return {
      message: response.message,
      user: {
        id_user: response.user.id,
        user_name: response.user.user_name,
        user_password: response.user.user_password,
        email: undefined,
        phone_number: undefined,
        semester: undefined,
        id_career: undefined,
        sex: undefined,
      },
    };
  }

  static fromSignupResponse(response: UserCreate): SignupResponse {
    return {
      user: {
        id_user: 0,
        user_name: response.user_name,
        user_password: response.user_password,
        email: undefined,
        phone_number: undefined,
        semester: undefined,
        id_career: undefined,
        sex: undefined,
      },
    };
  }
}
