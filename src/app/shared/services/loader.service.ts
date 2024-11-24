import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('');

  constructor() { }

  get loading$() {
    return this.isLoading.asObservable();
  }

  get message$() {
    return this.message.asObservable();
  }

  setLoading(loading: boolean) {
    this.isLoading.next(loading);
  }

  setMessage(message: string) {
    this.message.next(message);
  }
} 