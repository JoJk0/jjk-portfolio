import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ComponentFactory, ViewChildren, QueryList } from '@angular/core';
import { SectionHiComponent } from '../section-hi/section-hi.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { gsap } from 'gsap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtViewComponent } from '../art-view/art-view.component';
import { Projects } from '../projects';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit {

  // Section refs
  @ViewChildren('scrollable', {read: ElementRef})
  sections: QueryList<ElementRef>;

  @ViewChild('mySkillsButton', {read: ElementRef})
  mySkillsButton: ElementRef;

  @ViewChild('mySkills', {read: ViewContainerRef})
  target: ViewContainerRef;

  @ViewChild('mySkillsBackground', {read: ElementRef})
  mySkillsBackground: ElementRef;

  @ViewChildren('art', {read: ElementRef})
  arts: QueryList<ElementRef>;

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

  artPos = {
    'position': 'fixed',
    'z-index': '16',
    'top': '0px',
    'left': '0px',
    'width': '0px',
    'height': '0px',
    'display': 'none'
  };

  projects: Projects[] = [];

  private componentRef: ComponentRef<any>;

  private fragment: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public dialog: MatDialog, private jsonData: DataJsonService, private location: Location, private route: ActivatedRoute) { }

  ngAfterViewInit(): void { 
    this.jsonData.getProjects().subscribe(
      response => {
          this.projects = response;
      },
      error => console.log(error)
    );
    this.route.fragment.subscribe(fragment => { 
      this.fragment = fragment; 
      let hash = '#';
      let fullFragment = hash.concat(fragment);
      if(!fragment){
        fragment = '';
      }
      try {
        let el = this.getElement(fragment);
        el.nativeElement.scrollIntoView();
      } catch (e) { console.log(e);}

    });
  }

  getProjectsNo(): number{
    return this.arts.length;
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

  openArt(id: number, projectIDDb: number): void{
    // Get boundedrect
    let el = this.arts.toArray()[id].nativeElement;
    let coords = el.getBoundingClientRect();
    this.artPos = {
      'position': 'fixed',
      'z-index': '16',
      'top': coords.top+'px',
      'left': (coords.left+(el.offsetWidth/2)-(el.offsetHeight/2))+'px',
      'width': el.offsetHeight+'px',
      'height': el.offsetHeight+'px',
      'display': 'block'
    }
    setTimeout(() => {
      const dialogRef = this.dialog.open(ArtViewComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        backdropClass: 'dialogBackdrop',
        panelClass: 'art-view-container',
        id: 'art-view-container',
        data: { projectID: projectIDDb, origin: '' }
      });
      this.location.go("/projects/"+projectIDDb);

      dialogRef.afterClosed().subscribe(result => {
        //gsap.to(this.mySkillsBackground.nativeElement, transformOptionsOut);
      });
    });
  }

  getElement(name: string = ''): ElementRef{
    let el: ElementRef;
    this.sections.toArray().forEach((section) => {
      if(section.nativeElement.id == "start" && name == ''){
        el = section
      } else if(section.nativeElement.id == name){
        el = section;
      }
    });
    return el;
  }

}