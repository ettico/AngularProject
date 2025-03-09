
import { Component } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { lesson } from '../../models/lesson';
import { GetCoursesService } from '../../services/auth/getCourses/get-courses.service';
import { Router, RouterLink } from '@angular/router';
import { course } from '../../models/course';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector:  'app-get-lessons',
  standalone: true,
  imports: [
     MatTooltipModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatDividerModule],
      templateUrl: './get-lessons.component.html',
      styleUrl: './get-lessons.component.css'
    })

export class GetLessonsComponent {
  lessons:lesson[] = [];
  courseData:any;
  role:string|any=localStorage.getItem('role')
  token:string|any=sessionStorage.getItem("token")
  constructor(private courseService:GetCoursesService,private http:HttpClient,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
  }
  delete( lessonid: number | undefined) {
    const courseid: number=this.courseData.id
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  
    // ודא שהכתובת נכונה
    this.http.delete(`http://localhost:3000/api/courses/${courseid}/lessons/${lessonid}`, { headers })
      .subscribe(
        (response) => {
          console.log('Lesson deleted successfully', response);
          // עדכון המערך לאחר מחיקת השיעור
          this.lessons = this.lessons.filter(lesson => lesson.id !== lessonid);
        },
        (error) => {
          console.error('Error deleting lesson', error); // טיפול בשגיאות
        }
      );
  }
 editCourse(lesson: any) {
  const course=this.courseData
  const courseData = JSON.parse(JSON.stringify(course)); 
  this.router.navigate(['/NewLesson'], { state: { courseData,lesson } });
}
AddLesson(){
  const course=this.courseData
  const courseData = JSON.parse(JSON.stringify(course)); // המרת ה-Class לאובייקט פשוט
  console.log("📤 נתונים שנשלחים לניווט:", courseData);
  this.router.navigate(['/NewLesson'], { state: { courseData } });
}
  ngOnInit() {
    this.courseService.getAllLessons(this.token,this.courseData.id).subscribe(
      (data) => {
        this.lessons = data; // שמירת המידע במערך
      },
      (error) => {
        console.error('Error fetching users', error); // טיפול בשגיאות
      }
    );
  }
}
