import { Routes } from '@angular/router';
import { LoginComponent } from '../componenet/login/login.component';
import { RegisterComponent } from '../componenet/register/register.component';
import { GetCoursesComponent } from '../componenet/get-courses/get-courses.component';
import { NewCourseComponent } from '../componenet/new-course/new-course.component';
import { GetLessonsComponent } from '../componenet/get-lessons/get-lessons.component';
import { AddLessonComponent } from '../componenet/add-lesson/add-lesson.component';

export const routes: Routes = [
    {path: 'Login',component: LoginComponent},
    {path: 'Register',component: RegisterComponent},
    {path: 'GetCourses',component: GetCoursesComponent},
    {path: 'NewCourses',component: NewCourseComponent},
    {path: 'GetLessons',component: GetLessonsComponent},
    {path: 'NewLesson',component: AddLessonComponent},
];
