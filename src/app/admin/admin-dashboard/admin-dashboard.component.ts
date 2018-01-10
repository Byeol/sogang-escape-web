import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Room } from 'app/rooms/shared/room';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  rooms$: Observable<Room[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.rooms$ = this.afs.collection<Room>('rooms', ref => ref.orderBy('name')).snapshotChanges().map(actions => actions.map(a => ({
      id: a.payload.doc.id,
      ...a.payload.doc.data() as Room
    })));
  }
}
