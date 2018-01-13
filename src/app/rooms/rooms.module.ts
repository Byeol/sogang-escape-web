import { NgModule } from '@angular/core';
import { PasswordVerifyComponent } from 'app/rooms/password-verify/password-verify.component';
import { RoomContentComponent } from 'app/rooms/room-content/room-content.component';
import { RoomResolver } from 'app/rooms/shared/room-resolver';
import { RoomGuard } from 'app/rooms/shared/room.guard';
import { RoomService } from 'app/rooms/shared/room.service';
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
    RoomContentComponent,
    AnswerVerifyComponent,
    PasswordVerifyComponent
  ],
  providers: [
    RoomGuard,
    RoomResolver,
    RoomService
  ]
})
export class RoomsModule { }
