import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { RoomService } from 'app/rooms/shared/room.service';
import { Observable } from 'rxjs/Observable';

import { AnswerExample } from '../shared/answer-example';
import { GET_ANSWER_URL, GetAnswerResponse } from '../shared/get-answer';
import { Room } from '../shared/room';
import { RoomOperation } from '../shared/room-operation';

@Component({
  selector: 'app-room-content',
  templateUrl: './room-content.component.html',
  styleUrls: ['./room-content.component.css']
})
export class RoomContentComponent {
  @Input() room: AngularFirestoreDocument<Room>;
  @Input() data: Room;
  examples$: Observable<AnswerExample[]>;
  answer: number;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private service: RoomService
  ) {
    this.examples$ = afs.collection<AnswerExample>('examples').valueChanges();
  }

  async onSubmit(form: NgForm) {
    const numberA = form.value.numberA;
    const numberB = form.value.numberB;

    try {
      await this.afs.collection<Room>('rooms').doc<Room>(this.room.ref.id).collection<RoomOperation>('operations').add({
        numberA: numberA,
        numberB: numberB,
        timestamp: new Date()
      });

      const res = await this.service.getAnswer({
        numberA: numberA,
        numberB: numberB
      }).toPromise();

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
