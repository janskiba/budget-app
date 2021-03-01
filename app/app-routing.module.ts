import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainAppPageComponent } from './main-app-page/main-app-page.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { DemoComponent } from './demo/demo.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
  },
  {
    path: 'mainAppPage',
    component: MainAppPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'demo',
    component: DemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
