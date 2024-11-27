import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubjectService {
   private apiUrl = environment.apiUrl;

   private http = inject(HttpClient);

   public getSubjects(): Observable<any> {
      return this.http.get(`${this.apiUrl}subject/semester`);
   }

   public getSubjectById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}subject/${id}`);
   }

   public requestTutoring(id: string, date: string): Observable<any> {
      return this.http.post(`${this.apiUrl}subject/sendRequest/${id}`, {date},{ responseType: 'text' as 'json' });
   }
    
}