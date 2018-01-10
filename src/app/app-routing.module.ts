import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/auth';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canActivate: [ AuthGuard ]
      },
      {
        path: 'rooms',
        loadChildren: 'app/rooms/rooms.module#RoomsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
