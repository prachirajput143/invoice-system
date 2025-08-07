import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss',
  standalone:false
})
export class AddStudentComponent {
 student = {
    name: '',
    age: null,
    email: ''
  };

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.studentService.addStudent(this.student);
      form.reset();
      this.router.navigate(['/student-list']); // Go to student list
    }
  }

}
