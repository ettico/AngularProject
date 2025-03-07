import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth/';

  constructor(private http: HttpClient) {}

  Login(email:string,password:string):Observable<any>
  {
    const user={email,password}
    return this.http.post(`${this.baseUrl}login`,user).pipe(
      tap((response:any)=>{
        if(response.token){
          sessionStorage.setItem("token",response.token)
          localStorage.setItem('userId',response.userId);
          console.log(sessionStorage.getItem("token"));
          console.log(localStorage.getItem("userId"));     
        }
      })
    )
  }
  Register(name:string,email:string,password:string,role:string):Observable<any>{
    const user={name,email,password,role}
    console.log(user);
    return this.http.post(`${this.baseUrl}register `,user).pipe(
      tap((response:any)=>{
        if(response.token){
          sessionStorage.setItem("token",response.token)
          console.log(sessionStorage.getItem("token"));
        }
      })
    )
    
  }
}
