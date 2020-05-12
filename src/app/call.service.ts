import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor() { }

  // Navigation
  subject = new Subject<any>();
  sendNavTo(section: string){
    this.subject.next({ id: section });
  }

  getNavTo(): Observable<any>{
    return this.subject.asObservable();
  }

  // Current section
  currentSectionSubject = new Subject<any>();
  sendCurrentSection(section: string){
    this.currentSectionSubject.next({ id: section });
  }
  getCurrentSection(): Observable<any>{
    return this.currentSectionSubject.asObservable();
  }

}
