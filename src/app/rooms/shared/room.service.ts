import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CHECK_PASSWORD_URL, CheckPasswordRequest, CheckPasswordResponse } from 'app/rooms/shared/check-password';
import { GET_ANSWER_URL, GetAnswerRequest, GetAnswerResponse } from 'app/rooms/shared/get-answer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomService {
  constructor(private http: HttpClient) { }

  checkPassword(request: CheckPasswordRequest): Observable<CheckPasswordResponse> {
    return this.http.post(CHECK_PASSWORD_URL, request).map(response => response as CheckPasswordResponse);
  }

  getAnswer(request: GetAnswerRequest): Observable<GetAnswerResponse> {
    return this.http.post(GET_ANSWER_URL, request).map(response => response as GetAnswerResponse);
  }
}
