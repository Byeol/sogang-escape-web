import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Room } from '../shared/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  roomDoc$: AngularFirestoreDocument<Room>;
  room$: Observable<Room>;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data: { room: AngularFirestoreDocument<Room> }) => {
      this.roomDoc$ = data.room;
      this.room$ = data.room.valueChanges();
    });
  }
}
