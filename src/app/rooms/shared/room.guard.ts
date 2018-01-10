import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { Room } from './room';

@Injectable()
export class RoomGuard implements CanActivate {
  constructor(private afs: AngularFirestore, private router: Router, private snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const roomId = route.paramMap.get('roomId');
    return this.checkPermission(roomId);
  }

  private checkPermission(roomId: string): Promise<boolean> {
    return this.afs.collection<Room>('rooms').doc<Room>(roomId).ref.get()
      .then(room => room.exists)
      .catch(err => {
        this.snackBar.open('Restricted Access!');
        return Promise.resolve(false);
      });
  }
}
