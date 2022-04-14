import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddAssignmentComponent } from './assignment/add-assignment/add-assignment.component';
import {CommonModule} from '@angular/common';
import {AdminLayoutRoutes} from './layouts/admin-layout/admin-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ListAssignmentComponent } from './assignment/list-assignment/list-assignment.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DetailsAssignmentComponent } from './assignment/details-assignment/details-assignment.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditAssignmentComponent } from './assignment/edit-assignment/edit-assignment.component';
import { RenduAssignmentComponent } from './assignment/rendu-assignment/rendu-assignment.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,

        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatCardModule,
        MatCheckboxModule,
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddAssignmentComponent,
    ListAssignmentComponent,
    DetailsAssignmentComponent,
    EditAssignmentComponent,
    RenduAssignmentComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
