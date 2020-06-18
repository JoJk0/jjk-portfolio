import { Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Projects } from '../projects';
import { ArtViewComponent } from '../art-view/art-view.component';
import { MatDialog } from '@angular/material/dialog';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollGSAPService } from '../scroll-gsap.service';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-section-projects',
  templateUrl: './section-projects.component.html',
  styleUrls: ['./section-projects.component.scss']
})
export class SectionProjectsComponent implements OnInit {

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
  
  constructor(public dialog: MatDialog, private jsonData: DataJsonService, private location: Location, private detector: ChangeDetectorRef) { }

  ngOnInit(){

    this.jsonData.getProjects().subscribe(
      response => {

          // Set projects to var
          this.projects = response;

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
            this.animateOnScroll();
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

    // Title - show
    let projectsTitleTween = gsap.fromTo(this.projectsTitleEl.nativeElement, { y: '-1em', opacity: 0 }, { y: '0em', opacity: 1 });
    let projectsTitleSettings = { el: section, tween: projectsTitleTween, duration: duration(0.5), triggerHook: "center", offset: startAt(0), debug: false, origin: "top" };
    this.animateScrollTween(projectsTitleSettings);

    // Move title to the bottom
    let titleMoveTween = gsap.fromTo(this.artListEl.nativeElement, { height: '0em' }, { height: '45em', ease: 'power2.inOut' });
    let titleMoveSettings = { el: section, tween: titleMoveTween, duration: duration(0.2), triggerHook: "center", offset: startAt(0.3), debug: false, origin: "top" };
    this.animateScrollTween(titleMoveSettings);

    // Move art
    let diff = 0.0;
    this.arts.forEach((art) => {

      // Elements
      let imgContainerEl = art.nativeElement.children[0];
      let artTitleEl = imgContainerEl.children[1].children[0];
      let artInsideTitleEl = imgContainerEl.children[2].children[0].children[0];
      let artDescEl = art.nativeElement.children[1];
      

    // --- In ---
      // Pre-set values
      let setShowTitle = gsap.to(artTitleEl, { left: '-200%' });
      let setShowTitleSettings = { el: section, tween: setShowTitle, duration: duration(0), triggerHook: "center", offset: startAt(0), debug: false, origin: "top" };
      this.animateScrollTween(setShowTitleSettings);

      let setShowInsideTitle = gsap.to(artInsideTitleEl, { marginLeft: '-200%' });
      let setShowInsideTitleSettings = { el: section, tween: setShowInsideTitle, duration: duration(0), triggerHook: "center", offset: startAt(0), debug: false, origin: "top" };
      this.animateScrollTween(setShowInsideTitleSettings);

      let setShowImage = gsap.to(imgContainerEl, { left: '100vw' });
      let setShowImageSettings = { el: section, tween: setShowImage, duration: duration(0), triggerHook: "center", offset: startAt(0), debug: false, origin: "top" };
      this.animateScrollTween(setShowImageSettings);


      // Show text
      let showTitleTween = gsap.fromTo(artTitleEl, { left: '-200%', ease: 'power2.out' }, { immediateRender: false, left: '0%', ease: 'power2.out'});
      let showTitleSettings = { el: section, tween: showTitleTween, duration: duration(0.8), triggerHook: "center", offset: startAt(0.2+diff), debug: false, origin: "top" };
      this.animateScrollTween(showTitleSettings);

      // Show inside text
      let showInsideTitleTween = gsap.fromTo(artInsideTitleEl, { marginLeft: '-200%', ease: 'power2.out' }, { immediateRender: false, marginLeft: '0%', ease: 'power2.out' });
      let showInsideTitleSettings = { el: section, tween: showInsideTitleTween, duration: duration(0.8), triggerHook: "center", offset: startAt(0.2+diff), debug: false, origin: "top" };
      this.animateScrollTween(showInsideTitleSettings);

      // Show image
      let showImageTween = gsap.fromTo(imgContainerEl, { left: '100vw', ease: 'power2.out' }, { immediateRender: false, left: '0vw', ease: 'power2.out' });
      let showImageSettings = { el: section, tween: showImageTween, duration: duration(0.8), triggerHook: "center", offset: startAt(0.2+diff), debug: false, origin: "top" };
      this.animateScrollTween(showImageSettings);
    
    // Scroll page
      let scrollArtTween = gsap.fromTo(art.nativeElement, { top: '15vh' }, { immediateRender: false, top: '-100vh', ease: 'none'});
      let scrollArtSettings = { el: section, tween: scrollArtTween, duration: duration(0.8), triggerHook: "center", offset: startAt(1.2+diff), debug: false, origin: "top" };
      this.animateScrollTween(scrollArtSettings);

    // --- Out ---

      // Hide text
      let hideTitleTween = gsap.fromTo(artTitleEl, { left: '0%', paused: true, ease: 'power4.in' }, { immediateRender: false, left: '200%', ease: 'power4.in'});
      let hideTitleSettings = { el: section, tween: hideTitleTween, duration: duration(0.8), triggerHook: "center", offset: startAt(1.2+diff), debug: false, origin: "top" };
      this.animateScrollTween(hideTitleSettings);

      // Hide inside text
      let hideInsideTitleTween = gsap.fromTo(artInsideTitleEl, { marginLeft: '0%', paused: true, ease: 'power4.in' }, { immediateRender: false, marginLeft: '200%', ease: 'power4.in' });
      let hideInsideTitleSettings = { el: section, tween: hideInsideTitleTween, duration: duration(0.8), triggerHook: "center", offset: startAt(1.2+diff), debug: false, origin: "top" };
      this.animateScrollTween(hideInsideTitleSettings);

      // Hide image
      let hideImageTween = gsap.fromTo(imgContainerEl, { left: '0vw', paused: true, ease: 'power4.in' }, { immediateRender: false, left: '-100vw', ease: 'power4.in' });
      let hideImageSettings = { el: section, tween: hideImageTween, duration: duration(0.8), triggerHook: "center", offset: startAt(1.2+diff), debug: false, origin: "top" };
      this.animateScrollTween(hideImageSettings);
      
      // Post-set values
      let setHideTitle = gsap.to(artTitleEl, { left: '200%' });
      let setHideTitleSettings = { el: section, tween: setHideTitle, duration: duration(0), triggerHook: "center", offset: startAt(2), debug: false, origin: "top" };
      this.animateScrollTween(setHideTitleSettings);

      let setHideInsideTitle = gsap.to(artInsideTitleEl, { marginLeft: '200%' });
      let setHideInsideTitleSettings = { el: section, tween: setHideInsideTitle, duration: duration(0), triggerHook: "center", offset: startAt(2), debug: false, origin: "top" };
      this.animateScrollTween(setHideInsideTitleSettings);

      let setHideImage = gsap.to(imgContainerEl, { left: '-100vw' });
      let setHideImageSettings = { el: section, tween: setHideImage, duration: duration(0), triggerHook: "center", offset: startAt(2), debug: false, origin: "top" };
      this.animateScrollTween(setHideImageSettings);

      diff = diff+1.6;

    });

  }

  private animateScrollTween(settings): void{
    let scrollTween = new ScrollGSAPService(settings);
    this.scrollTweens.push(scrollTween);
    scrollTween.animate();
  }

}
// 0 -> 0.5 0.5+a/2
// 0.5 -> 0.75
// 1 -> 1

// y = 0.5x+0.5