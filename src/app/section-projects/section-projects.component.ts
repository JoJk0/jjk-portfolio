import { Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild, AfterViewInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { Projects } from '../projects';
import { ArtViewComponent } from '../art-view/art-view.component';
import { MatDialog } from '@angular/material/dialog';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollGSAPService } from '../scroll-gsap.service';
import { Scroll } from '@angular/router';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-section-projects',
  templateUrl: './section-projects.component.html',
  styleUrls: ['./section-projects.component.scss']
})
export class SectionProjectsComponent implements OnInit{

  @Input() skeletons: QueryList<ElementRef>;
  @Output() updateSkeleton = new EventEmitter<number>();
  
  // Elements
  @ViewChildren('art', {read: ElementRef}) arts: QueryList<ElementRef>;
  @ViewChild('projectsTitle') projectsTitleEl: ElementRef;
  @ViewChild('hungry') hungryEl: ElementRef;
  @ViewChild('projectsLink') projectsLinkEl: ElementRef;
  @ViewChild('artList') artListEl: ElementRef;
  @ViewChild('sectionProjectsContainer') sectionProjectsContainerEl: ElementRef;

  // Properties
  public scrollTweens: ScrollGSAPService[] = [];
  public skeleton: ElementRef;
  public fireStorage: AngularFireStorage;
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
  projectCovers: Array<String> = [];
  
  constructor(public dialog: MatDialog, private jsonData: DataJsonService, private location: Location, private detector: ChangeDetectorRef, fireStorage: AngularFireStorage) {
    this.fireStorage = fireStorage;
  }

  async loadSkeletons(){

    await this.skeletons;

    this.skeletons.forEach((skeleton) => {
      if(skeleton.nativeElement.id == 'section-projects-skeleton'){
            
        this.skeleton = skeleton;
        this.detector.detectChanges();
        setTimeout(() => {
          this.animateOnScroll();
        }, 0);

        // this.onResizeSub = this.call.onResizeNotifier.$.subscribe(bool => {
        //   this.onResize();
        // });

      }
    });

  }

  ngOnInit(){

    this.jsonData.getProjects().subscribe(
      response => {

          // Set projects to var
          response.forEach((project) => {
            if(project.showcasePos != -1){
              this.projects.push(project);
              this.detector.detectChanges();
            }
          });
  
          // Load projects image
          let storageRoot = this.fireStorage.storage.ref();
          let projectRef = storageRoot.child('projects');

          this.projects.forEach((project) => {
            let thisProjectRef = projectRef.child(project.id+'');
            thisProjectRef.child("0.png").getDownloadURL().then((url) => {
              this.projectCovers[project.id] = url;
              console.log(project.id+" "+url+" "+thisProjectRef);
              this.detector.detectChanges();
            });
          });

          // Update skeleton
          let counter = 0;
          response.forEach((project) => {
            if(project.showcasePos != -1){
              counter++;
            }
          });
          this.updateSkeleton.emit(counter);

          setTimeout(() => {
            this.detector.detectChanges();
            this.loadSkeletons();
          }, 0);
      },
      error => console.log(error)
    );

  }

  getProjectsNo(): number{
    return this.arts.length;
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

  animateOnScroll(){

    let section = this.sectionProjectsContainerEl.nativeElement;
    let duration = (i: number) => { return window.innerHeight*i/2 }; // <0,2>
    let startAt = (i: number) => { return window.innerHeight*2+window.innerHeight*i/2 }; // <0,2>

    let projectsTimeline = gsap.timeline({ paused: true })

    // Title - show
    .fromTo(this.projectsTitleEl.nativeElement, { y: '1em', opacity: 0 }, { duration: 0.5, y: '0em', opacity: 1 }, 0)

    // Move title to the top
    .fromTo(this.artListEl.nativeElement, { height: '0em' }, { duration: 0.2, height: '65vh', ease: 'power2.inOut' }, 0.3);

    // Move art
    let diff = 0.0;
    this.arts.forEach((art) => {

      // Pair project's view with Project obj
      let currentProject: Projects;
      this.projects.forEach((project) => {
        if("project-"+project.id == art.nativeElement.id){
          currentProject = project;
        }
      });

      // Elements
      let imgContainerEl = art.nativeElement.children[0];
      let artTitleEl = imgContainerEl.children[1].children[0];
      let artInsideTitleEl = imgContainerEl.children[2].children[0].children[0];
      let artDescEl = art.nativeElement.children[1];
      

    // --- In ---
      
      projectsTimeline
      // Pre-set values

      .set(art.nativeElement, { display: 'flex' }, 0.3+diff)

      .to(artTitleEl, { duration: 0, left: '-200%' }, 0.3+diff)

      .to(artInsideTitleEl, { duration: 0, marginLeft: '-200%' }, 0.3+diff)


      // Show text
      .fromTo(artTitleEl, { left: '-200%', ease: 'power2.out' }, { duration: 0.8, immediateRender: false, left: '0%', ease: 'power2.out'}, 0.5+diff)

      // Show inside text
      .fromTo(artInsideTitleEl, { marginLeft: '-200%', ease: 'power2.out' }, { duration: 0.8, immediateRender: false, marginLeft: '0%', ease: 'power2.out' }, 0.5+diff)

      // Show image
      .fromTo(imgContainerEl.children[0], { clipPath: 'circle(0em)', ease: 'power2.out' }, { duration: 1.2, immediateRender: false, clipPath: 'circle(70em)', ease: 'power2.out' }, 0.5+diff)

      // Darken image for shwoing text
      .fromTo(imgContainerEl.children[0].children[0], { filter: 'brightness(1) contrast(1) saturate(1)' }, { filter: 'brightness(0.4) contrast(0.95) saturate(1.5)' }, 0.8+diff)
      .fromTo(imgContainerEl.children[2], { filter: 'brightness(1) contrast(1) saturate(1)' }, { filter: 'brightness(0.4) contrast(0.95) saturate(1.5)' }, 0.8+diff)

    // --- Out ---

      // Hide text
      .fromTo(artTitleEl, { left: '0%', paused: true, ease: 'power4.in' }, { duration: 0.8, immediateRender: false, left: '200%', ease: 'power4.in'}, 1.5+diff)

      // Hide inside text
      .fromTo(artInsideTitleEl, { marginLeft: '0%', paused: true, ease: 'power4.in' }, { duration: 0.8, immediateRender: false, marginLeft: '200%', ease: 'power4.in' }, 1.5+diff)

      // Hide image
      .fromTo(imgContainerEl.children[0], { opacity: '1', paused: true, ease: 'power4.in' }, { duration: 0.8, immediateRender: false, opacity: '0', ease: 'power4.in' }, 1.5+diff)
      
      // Post-set values
      .to(artTitleEl, { duration: 0, left: '200%' }, 2.3+diff)
      
      .to(artInsideTitleEl, { duration: 0, marginLeft: '200%' }, 2.3+diff)

      .to(imgContainerEl, { duration: 0, eft: '-100vw' }, 2.3+diff);

      diff = diff+1.6;

    });

    projectsTimeline

    .fromTo(this.projectsLinkEl.nativeElement, { opacity: 0 }, { duration: 0.5, opacity: 1 }, diff-0.6);


    ScrollTrigger.create({

      id: 'projectsScrollTrigger',
      animation: projectsTimeline,
      trigger: this.skeleton.nativeElement,
      start: "top center",
      end: "bottom center",
      scrub: true, 
      markers: false

    });

  }


}
// 0 -> 0.5 0.5+a/2
// 0.5 -> 0.75
// 1 -> 1

// y = 0.5x+0.5