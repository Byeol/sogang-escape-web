import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from 'app/rooms/room/room.component';
import { RoomResolver } from 'app/rooms/shared/room-resolver';
import { RoomGuard } from 'app/rooms/shared/room.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':roomId',
        component: RoomComponent,
        canActivate: [
          RoomGuard
        ],
        resolve: {
          room: RoomResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
