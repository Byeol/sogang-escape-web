import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { Room } from '../shared/room';
import { RoomService } from '../shared/room.service';

@Component({
  selector: 'app-password-verify',
  templateUrl: './password-verify.component.html',
  styleUrls: ['./password-verify.component.scss']
})
export class PasswordVerifyComponent {
  @Input() room: AngularFirestoreDocument<Room>;

  state: string;
  private correctCode = '1234';
  private enteredNumbers = [];
  private codeLength = 4;
  private submitted = false;

  constructor(
    private snackBar: MatSnackBar,
    private service: RoomService
  ) { }

  get numbers(): number[] {
    return Array.from(Array(10).keys()).filter(v => v).concat(0);
  }

  get dots(): boolean[] {
    return Array.from(Array(this.codeLength).keys()).map(i => (this.enteredNumbers[i] !== undefined));
  }

  get enteredCode(): string {
    return this.enteredNumbers.join('');
  }

  async enter(number: number) {
    if (this.submitted) {
      return this.snackBar.open('Trying to unlock... Please wait!', 'OK', {
        duration: 3000
      });
    }

    this.enteredNumbers.push(number);

    if (this.enteredNumbers.length >= this.codeLength) {
      this.submitted = true;
      this.state = await this.checkPassword(this.enteredCode) ? 'correct' : 'wrong';
      this.enteredNumbers.length = 0;
      this.submitted = false;
    } else {
      this.state = '';
    }
  }

  private async checkPassword(enteredCode: string): Promise<boolean> {
    try {
      const res = await this.service.checkPassword({
        roomId: this.room.ref.id,
        password: enteredCode
      }).toPromise();

      this.snackBar.open(res.message, 'OK', {
        duration: 3000
      });

      return res.correct;
    } catch (e) {
      this.snackBar.open('An error occurred, please try again!', 'OK', {
        duration: 3000
      });
    }

    return false;
  }
}
