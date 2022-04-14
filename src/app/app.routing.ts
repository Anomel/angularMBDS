import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AddAssignmentComponent} from './assignment/add-assignment/add-assignment.component';
import {ListAssignmentComponent} from './assignment/list-assignment/list-assignment.component';
import {DetailsAssignmentComponent} from './assignment/details-assignment/details-assignment.component';
import {EditAssignmentComponent} from './assignment/edit-assignment/edit-assignment.component';
import {RenduAssignmentComponent} from './assignment/rendu-assignment/rendu-assignment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    },
      {
        path: 'add-assignment',
        component: AddAssignmentComponent
      },
      {
        path: 'list-assignment',
        component: ListAssignmentComponent
      },
      {
        path: 'details-assignment/:id',
        component: DetailsAssignmentComponent
      },
      {
        path: 'edit-assignment/:id/edit',
        component: EditAssignmentComponent
      },
      {
        path: 'rendu-assignment',
        component: RenduAssignmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
