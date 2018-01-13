export const CHECK_PASSWORD_URL = 'https://us-central1-sogang-escape.cloudfunctions.net/checkPassword';

export interface CheckPasswordRequest {
  roomId: string;
  password: string;
}

export interface CheckPasswordResponse {
  message: string;
  correct?: boolean;
}
