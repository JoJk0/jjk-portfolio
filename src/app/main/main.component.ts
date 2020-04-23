import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ComponentFactory } from '@angular/core';
import { SectionHiComponent } from '../section-hi/section-hi.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit {

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

  private componentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void { 
    console.log(this.target);
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
    setTimeout(() => {
      this.mySkillsContainerStyle = {
        'display': 'flex'
      }
    }, 700);
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(MySkillsComponent);
    this.target.clear();
    this.componentRef = this.target.createComponent(childComponent);
    console.log(this.componentRef); 
    //this.buttonSkillsOpen = true;
    let transformOptions = {
      duration: 0.7, 
      scale: 50
    };
    gsap.to(this.mySkillsBackground.nativeElement, transformOptions);
  }

  closeMySkills(): void{
    
  }
}
