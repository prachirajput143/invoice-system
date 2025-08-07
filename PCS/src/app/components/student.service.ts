import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: any[] = [];

  addStudent(student: any) {
    this.students.push({ ...student }); 
  }

  getStudents() {
    return this.students;
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }
}
