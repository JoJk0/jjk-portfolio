import { Component, HostBinding, HostListener, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // <-- do not forget to import
import { MainComponent } from './main/main.component';
import { gsap } from 'gsap';
import { ScrollGSAPService } from './scroll-gsap.service';
import { Subscription } from 'rxjs';
import { CallService } from './call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements AfterViewInit {

  @HostListener('window:resize', ['$event.target'])
  onResize(targetElement: string) {
    this.resizeApp();
  }

  constructor(public call: CallService) { }

  ngAfterViewInit() {


    this.updateGlobals();
  }

  updateGlobals(): void {
    globals.screenWidth = window.innerWidth;
    globals.screenHeight = window.innerHeight;
    globals.breakpoints.forEach((breakpoint) => {
      if(globals.screenWidth >= breakpoint.min && globals.screenWidth <= breakpoint.max){
        globals.device = breakpoint.name;
      }
    });
  }

  resizeApp(){

    this.updateGlobals();
    setTimeout(() => {
      this.call.onResizeNotifier.notify(true);
    })
    
  }

}

export var globals = {
  breakpoints: [
    { 
      name: 'mobileP',
      min: 0,
      max: 480
    },
    {
      name: 'mobileL',
      min: 481,
      max: 767
    },
    {
      name: 'tabletP',
      min: 768,
      max: 1023
    },
    {
      name: 'tabletL',
      min: 1024,
      max: 1365
    },
    {
      name: 'desktop',
      min: 1366,
      max: 20000
    }
  ],
  screenWidth: 0,
  screenHeight: 0,
  device: ''
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/