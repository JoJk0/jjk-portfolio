import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // <-- do not forget to import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  private fragment: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    try {
      console.log(this.fragment);
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { console.log(e);}
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(targetElement: string) {
    this.progressbarUpdate(targetElement);
  }
  
  progressbarUpdate(e){
    let progressbar = document.getElementById('progressbar');
    let currentPos = window.pageYOffset || document.documentElement.scrollTop;
    let pageHeight = document.body.firstElementChild.getBoundingClientRect().height;
    currentPos = currentPos+(document.body.clientHeight*(currentPos/(pageHeight-document.body.clientHeight)));
    let progress = (currentPos/pageHeight)*100;
    progressbar.style.width = progress+"%";
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/