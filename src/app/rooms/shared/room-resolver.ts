import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Room } from './room';

@Injectable()
export class RoomResolver implements Resolve<AngularFirestoreDocument<Room>> {
  constructor(private afs: AngularFirestore) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AngularFirestoreDocument<Room>> {
    const roomId = route.paramMap.get('roomId');
    return Promise.resolve(this.afs.collection<Room>('rooms').doc(roomId));
  }
}
