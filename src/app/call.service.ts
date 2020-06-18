import { Injectable, ElementRef, QueryList } from '@angular/core';
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

  // Menu pos change (mobileP only)
  private menuPosChangeSub = new Subject<HTMLElement>();
  menuPosChange$ = this.menuPosChangeSub.asObservable();
  sendMenuPosChange(section: HTMLElement){
    this.menuPosChangeSub.next(section);
  }

  // OnResize notifier (main -> children components)
  public onResizeNotifier: any = {
    subject: new Subject<boolean>(),
    $: this.subject.asObservable(),
    notify: (signal: boolean) => {
      this.subject.next(signal);
    }
  };

  // Pass skeleton to sections (main -> sections)
  public sendSkeletonPro : Promise<QueryList<ElementRef>>;
  public skeletonPromise: Promise<QueryList<ElementRef>> = new Promise<QueryList<ElementRef>>(resolve => {

    resolve(skeletons);
  });

}
