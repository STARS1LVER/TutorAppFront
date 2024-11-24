
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RegisterService {
   
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;



    public register( data: any ): Observable<any> {
        return this.http.post(`${this.apiUrl}auth/register`, data);
    }

}