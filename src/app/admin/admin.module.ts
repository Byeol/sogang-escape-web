import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RoomAnswersComponent } from './room-answers/room-answers.component';
import { RoomOperationsComponent } from './room-operations/room-operations.component';
import { RoomSummaryContentComponent } from './room-summary-content/room-summary-content.component';
import { RoomSummaryComponent } from './room-summary/room-summary.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminDashboardComponent,
    RoomSummaryComponent,
    RoomAnswersComponent,
    RoomOperationsComponent,
    RoomSummaryContentComponent
  ]
})
export class AdminModule { }
