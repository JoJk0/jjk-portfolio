import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  progressbarHeight: number;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(targetElement: string) {
    this.progressbarUpdate();
  }
  
  progressbarUpdate(){
    let currentPos = window.pageYOffset || document.documentElement.scrollTop;
    let pageHeight = document.body.firstElementChild.getBoundingClientRect().height;
    currentPos = currentPos+(document.body.clientHeight*(currentPos/(pageHeight-document.body.clientHeight)));
    let progress = (currentPos/pageHeight)*100;
    this.progressbarHeight = progress;
  }
  
}
