import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { RoomOperation } from 'app/rooms/shared/room-operation';
import { Observable } from 'rxjs/Observable';

import { AnswerExample } from '../shared/answer-example';
import { GET_ANSWER_URL, GetAnswerResponse } from '../shared/get-answer';
import { Room } from '../shared/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  roomDoc$: AngularFirestoreDocument<Room>;
  room$: Observable<Room>;
  examples$: Observable<AnswerExample[]>;
  answer: number;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.route.data.subscribe((data: { room: AngularFirestoreDocument<Room> }) => {
      this.roomDoc$ = data.room;
      this.room$ = data.room.valueChanges();
    });

    this.examples$ = afs.collection<AnswerExample>('examples').valueChanges();
  }

  async onSubmit(form: NgForm) {
    const numberA = form.value.numberA;
    const numberB = form.value.numberB;

    try {
      await this.afs.collection<Room>('rooms').doc<Room>(this.roomDoc$.ref.id).collection<RoomOperation>('operations').add({
        numberA: numberA,
        numberB: numberB,
        timestamp: new Date()
      });

      const res = await this.http.post(GET_ANSWER_URL, {
        numberA: numberA,
        numberB: numberB
      }).toPromise() as GetAnswerResponse;

      this.answer = res.answer;
      this.snackBar.open(res.message, 'OK', {
        duration: 3000
      });
    } catch (e) {
      this.snackBar.open('An error occurred, please try again!', 'OK', {
        duration: 3000
      });
    }
  }
}
