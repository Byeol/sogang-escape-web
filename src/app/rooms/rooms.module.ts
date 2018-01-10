import { NgModule } from '@angular/core';
import { RoomResolver } from 'app/rooms/shared/room-resolver';
import { RoomGuard } from 'app/rooms/shared/room.guard';
import { SharedModule } from 'app/shared/shared.module';

import { AnswerVerifyComponent } from './answer-verify/answer-verify.component';
import { RoomComponent } from './room/room.component';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RoomsRoutingModule
  ],
  declarations: [
    RoomComponent,
    AnswerVerifyComponent
  ],
  providers: [
    RoomGuard,
    RoomResolver
  ]
})
export class RoomsModule { }
