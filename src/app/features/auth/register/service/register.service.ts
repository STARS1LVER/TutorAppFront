
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RegisterService {
   
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = environment.apiUrl;



    public register( data: any ): Observable<any> {
        return this.http.post(`${this.apiUrl}auth/register`, data);
    }

    public login(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}auth/login`, data)
            .pipe(
                tap((response: any) => {
                    if (response.token) {
                        localStorage.setItem('token', response.token);
                        this.router.navigate(['/students']);
                    }
                })
            );
    }
    public getToken(): string | null {
        return localStorage.getItem('token');
    }


    public logout(): Observable<any> {
        localStorage.removeItem('token');
        return this.http.post(`${this.apiUrl}auth/logout`, {})
            .pipe(
                tap(() => {
                    localStorage.clear(); 
                }),
                catchError((error) => {
                    console.error('Error durante el logout:', error);
                    throw error;
                })
            );
    }

}