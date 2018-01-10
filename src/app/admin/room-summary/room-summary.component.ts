import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Room } from 'app/rooms/shared/room';
import { RoomAnswer } from 'app/rooms/shared/room-answer';
import { RoomCount } from 'app/rooms/shared/room-count';
import { RoomOperation } from 'app/rooms/shared/room-operation';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-room-summary',
  templateUrl: './room-summary.component.html',
  styleUrls: ['./room-summary.component.css']
})
export class RoomSummaryComponent implements OnInit {
  @Input() room: Room;
  count$: Observable<RoomCount>;
  answers$: Observable<RoomAnswer[]>;
  operations$: Observable<RoomOperation[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.count$ = this.afs.collection<RoomCount>('counts').doc<RoomCount>(this.room.id).valueChanges();
    this.answers$ = this.afs.collection('rooms').doc(this.room.id)
      .collection<RoomAnswer>('answers', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
    this.operations$ = this.afs.collection('rooms').doc(this.room.id)
      .collection<RoomOperation>('operations', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }
}
