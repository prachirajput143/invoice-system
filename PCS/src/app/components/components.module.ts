import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ComponentsRoutingModule } from './components-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    AddStudentComponent,
    StudentListComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
