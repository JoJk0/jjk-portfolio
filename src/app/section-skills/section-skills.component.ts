import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { gsap } from 'gsap'
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MySkillsComponent } from '../my-skills/my-skills.component';

@Component({
  selector: 'app-section-skills',
  templateUrl: './section-skills.component.html',
  styleUrls: ['./section-skills.component.scss']
})
export class SectionSkillsComponent implements OnInit {


  @ViewChild('mySkillsButton', {read: ElementRef})
  mySkillsButton: ElementRef;

  @ViewChild('mySkills', {read: ViewContainerRef})
  target: ViewContainerRef;

  @ViewChild('mySkillsBackground', {read: ElementRef})
  mySkillsBackground: ElementRef;
  
  mySkillsPos = {
    'position': 'fixed',
    'z-index': '16',
    'top': '0px',
    'left': '0px',
    'width': '0px',
    'height': '0px',
    'display': 'none'
  };

  mySkillsContainerStyle = {
    'display': 'none'
  }

  constructor(public dialog: MatDialog, private location: Location) { }

  ngOnInit(): void {
  }

  openMySkills(): void{

    // Set new Pos of style
    let el = this.mySkillsButton.nativeElement;
    let coords = el.getBoundingClientRect();
    this.mySkillsPos = {

      'position': 'fixed',
      'z-index': '16',
      'top': coords.top+'px',
      'left': (coords.left+(el.offsetWidth/2)-(el.offsetHeight/2))+'px',
      'width': el.offsetHeight+'px',
      'height': el.offsetHeight+'px',
      'display': 'block'

    }

    let transformOptions = {
      duration: 0.7, 
      scale: 50
    };
    let transformOptionsOut = {
      duration: 0.4, 
      scale: 0
    };
    gsap.to(this.mySkillsBackground.nativeElement, transformOptions);

    setTimeout(() => {
          const dialogRef = this.dialog.open(MySkillsComponent, {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          backdropClass: 'dialogBackdrop',
          panelClass: 'my-skills-container',
          id: 'my-skills-container'
      });
      this.location.go("/skills");

      dialogRef.afterClosed().subscribe(result => {
        gsap.to(this.mySkillsBackground.nativeElement, transformOptionsOut);
        this.location.go("/");
      });
      
    }, 200);
    //let childComponent = this.componentFactoryResolver.resolveComponentFactory(MySkillsComponent);
    //this.target.clear();
    //this.componentRef = this.target.createComponent(childComponent);
    //console.log(this.componentRef); 
    //this.buttonSkillsOpen = true;

  }

}
