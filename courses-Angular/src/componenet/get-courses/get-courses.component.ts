import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // הוספת ייבוא של MatTooltipModule
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { course } from '../../models/course';
import { GetCoursesService } from '../../services/auth/getCourses/get-courses.service';
import { user } from '../../models/user';

@Component({
  selector: 'app-get-user',
  standalone: true,
  imports: [
    MatTooltipModule, // הוספת MatTooltipModule לרשימת הייבוא
    MatIconModule,
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './get-courses.component.html',
  styleUrl: './get-courses.component.css'
})
export class GetCoursesComponent {
  courses: course[] = [];
  token: string | any = sessionStorage.getItem("token");
  role: string | any = localStorage.getItem('role');

  constructor(private courseService: GetCoursesService, private http: HttpClient, private router: Router) {}

  delete(id: number | undefined) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`http://localhost:3000/api/courses/${id}`, { headers })
      .subscribe(
        (response) => {
          console.log('Course deleted successfully', response);
          this.courses = this.courses.filter(course => course.id !== id);
        },
        (error) => {
          console.error('Error deleting course', error);
        }
      );
  }

  editCourse(course: any) {
    this.router.navigate(['/NewCourses'], { state: { courseData: course } });
  }

  showLesson(course: any) {
    this.router.navigate(['/GetLessons'], { state: { courseData: course } });
  }

  ngOnInit() {
    this.courseService.getAllCourses(this.token).subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  AddPerson(x: course) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const userId: string | null = localStorage.getItem('userId');
    this.http.post<user>(`http://localhost:3000/api/courses/${x.id}/enroll`, { userId }, { headers })
      .subscribe(
        (response) => {
          console.log('the user joined successfully', response);
        },
        (error) => {
          console.error('Error ', error);
          alert('הנך רשום כבר לקורס זה');
        }
      );
  }

  deletePerson(c: course) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const userId: string | null = localStorage.getItem('userId');
    this.http.delete<user>(`http://localhost:3000/api/courses/${c.id}/unenroll`, {
      headers,
      body: { userId }
    })
      .subscribe(
        (response) => {
          console.log('the user deleted successfully', response);
        },
        (error) => {
          console.error('Error ', error);
          alert('הנך לא רשום לקורס זה');
        }
      );
  }
}
