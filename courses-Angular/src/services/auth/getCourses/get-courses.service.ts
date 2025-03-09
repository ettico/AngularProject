import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { course } from '../../../models/course';
import { lesson } from '../../../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {
  private baseUrl = 'http://localhost:3000/api/courses'; // כתובת ה-API שלך

  constructor(private http: HttpClient) {}

 
  getAllCourses(token: string): Observable<any[]> {
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
}
getAllLessons(token: string,id:number): Observable<any[]> {
   
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });
  return this.http.get<any[]>(`${this.baseUrl}/${id}/lessons`, { headers });
}

postLesson(title: string, content: string, courseId: string | null, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });

  const lesson = { title, content, courseId };
  console.log("Creating lesson:", lesson);

  return this.http.post<lesson>(`${this.baseUrl}/${courseId}/lessons`, lesson, { headers });
}

postCourses(title:string,description:string,teacherId:string|null,token:string):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  const course={title,description,teacherId}
  console.log(course)
  return this.http.post<course>(`${this.baseUrl}`,course,{headers})
}
putCourses(title:string,description:string,teacherId:string|null,token:string,id:number):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });
  const course={title,description,teacherId}
  return this.http.put<course>(`${this.baseUrl}/${id}`,course,{headers})
}
putLesson(title: string, content: string, courseId: number, token: string, lessonId: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });
  
  const lesson = { title, content, courseId };
  return this.http.put<lesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers });
}

}



