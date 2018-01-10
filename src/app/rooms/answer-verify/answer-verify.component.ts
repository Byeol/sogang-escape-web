import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { RoomAnswer } from 'app/rooms/shared/room-answer';
import * as firebase from 'firebase/app';

import { Answer } from '../shared/answer';
import { Room } from '../shared/room';

@Component({
  selector: 'app-answer-verify',
  templateUrl: './answer-verify.component.html',
  styleUrls: ['./answer-verify.component.css']
})
export class AnswerVerifyComponent {
  @Input() room: AngularFirestoreDocument<Room>;

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) { }

  async onSubmit(form: NgForm) {
    const answer = (form.value.answer as number).toString();

    try {
      await this.afs.collection<Room>('rooms').doc<Room>(this.room.ref.id).collection<RoomAnswer>('answers').add({
        answer: answer,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      const res = await this.afs.collection<Answer>('answers').doc<Answer>(answer).ref.get();
      this.snackBar.open(res.data().answerText, 'OK', {
        duration: 3000
      });
    } catch (e) {
      this.snackBar.open('Wrong Answer!', 'OK', {
        duration: 3000
      });
    }
  }
}
