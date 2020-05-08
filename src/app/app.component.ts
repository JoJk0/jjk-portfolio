import { Component, HostBinding, HostListener, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // <-- do not forget to import
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/