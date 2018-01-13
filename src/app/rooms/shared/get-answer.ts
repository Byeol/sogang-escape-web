export const GET_ANSWER_URL = 'https://us-central1-sogang-escape.cloudfunctions.net/getAnswer';

export interface GetAnswerRequest {
  numberA: number;
  numberB: number;
}

export interface GetAnswerResponse {
  message: string;
  answer?: number;
}
