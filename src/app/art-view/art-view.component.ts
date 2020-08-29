import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projects } from '../projects';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';
import { gsap } from 'gsap';
import { SwiperOptions } from 'swiper';
import { globals } from '../app.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-art-view',
  templateUrl: './art-view.component.html',
  styleUrls: ['./art-view.component.scss']
})
export class ArtViewComponent implements OnInit, AfterViewInit {

  @ViewChild('mobileTop') mobileTopEl: ElementRef;
  @ViewChild('mobileBottom') mobileBottomEl: ElementRef;
  @ViewChild('paginator') paginatorEl: ElementRef;
  @ViewChild('desktopViewer') desktopViewerEl: ElementRef;
  @ViewChild('otherPhotos') otherPhotosEl: ElementRef;

  @ViewChild('mainContainer') mainContainerEl: ElementRef;
  @ViewChild('desktopTitleLeft') desktopTitleLeftEl: ElementRef;
  @ViewChild('desktopTitleRight') desktopTitleRightEl: ElementRef;
  @ViewChild('rightPanel') rightPanelEl: ElementRef;
  @ViewChild('rightDetails') rightDetailsEl: ElementRef;

  projectID: number;
  origin: string;
  found: boolean = false;
  galleryOpen: boolean = false;
  public imageRefs: Array<String> = new Array<String>();
  public fontRefs: Array<String> = new Array<String>();
  currentPhoto: string = '';
  fireStorage: AngularFireStorage;

  projects: Projects[];
  public project: Projects;

  get globals(){ return globals }

  config: SwiperOptions = {
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', clickable: true },
    zoom: {
      maxRatio: 5,
    },
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 0
  };
  
  constructor(private jsonData: DataJsonService, public dialogRef: MatDialogRef<ArtViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private location: Location, private detector: ChangeDetectorRef, fireStorage: AngularFireStorage) {
    this.projectID = data.projectID;
    this.origin = data.origin;
    this.fireStorage = fireStorage;
   }

  ngOnInit(): void {
    this.jsonData.getProjects().subscribe(
      response => {
          this.projects = response;
          this.loadProject();
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit(): void{

    this.animateArtView();

  }

  animateArtView(): void{

    if(globals.device != "mobileP"){
      let introTimeline = gsap.timeline({ delay: 0.5 })
    
      .set(this.mainContainerEl.nativeElement, { opacity: 1 }, 0)
      .fromTo(this.desktopTitleLeftEl.nativeElement, { translateX: '-50%', opacity: 0 }, { duration: 0.7, translateX: '0%', opacity: 1, ease: 'expo.out' }, 0)
      .fromTo(this.desktopTitleRightEl.nativeElement, { translateX: '-50%', opacity: 0 }, { duration: 0.7, translateX: '0%', opacity: 1, ease: 'expo.out' }, 0)
      .fromTo(this.desktopViewerEl.nativeElement, { translateX: '-20%', opacity: 0 }, { duration: 0.7, translateX: '0%', opacity: 1, ease: 'expo.out' }, 0.5)
      .fromTo(this.rightPanelEl.nativeElement, { width: '0%', padding: '0em', paddingLeft: '0em' }, { duration: 1, width: '50%', padding: '1em', paddingLeft: '7em', ease: 'power4.out' }, 1)
      .fromTo(this.rightDetailsEl.nativeElement, { opacity: 0 }, { duration: 1, opacity: 1, ease: 'power4.out' }, 2)
      .fromTo(this.otherPhotosEl.nativeElement, { opacity: 0, translateY: '50%' }, { duration: 1, opacity: 1, translateY: '0%', ease: 'power4.out' }, 2);
  
    }

  }

  loadProject(): void{
    let found: number = -1;
    this.projects.forEach((project: Projects) => {
      if(project.id == this.projectID){
        found = project.id;
        this.project = project;

        let storageRoot = this.fireStorage.storage.ref();
        let projectRef = storageRoot.child('projects').child(''+project.id);

        // Load project images
        projectRef.listAll().then((res) => {
          let i = 0;
          res.items.forEach((imageRef) => {
            imageRef.getDownloadURL().then((url) => {
              this.imageRefs.push(url);
              i++;
              if(i == 1){
                this.currentPhoto = url;
              }
            });
          });
        });

        // Load font assets
        project.typography.forEach((font) => {

          let fontRef = storageRoot.child('fonts').child(font['name']+'.svg');
          fontRef.getDownloadURL().then((url) => {
            this.fontRefs.push(url);
          });

        });

      }
    });
    //console.log(this.project.colours.background);
  }

  close(): void{
    this.location.go("/"+this.origin);
    this.dialogRef.close();
  }

  showGallery(){
    
    if(this.galleryOpen == false && globals.device == "mobileP"){

      this.galleryOpen = true;
      let showTimeline = gsap.timeline()
      .to(this.mobileBottomEl.nativeElement, { duration: 0.5, marginTop: '90vh', ease: 'power2.out' }, 0)
      .to(this.mobileTopEl.nativeElement, { duration: 0.5, height: '90vh', ease: 'power2.out' }, 0)
      .fromTo(this.paginatorEl.nativeElement, { opacity: 0 }, { duration: 0.2, opacity: 1, ease: 'power2.out' }, 0.4);
    
    }

  }

  hideGallery(){
    
    if(this.galleryOpen == true && globals.device == "mobileP"){

      this.galleryOpen = false;
      let hideTimeline = gsap.timeline()
      .to(this.mobileBottomEl.nativeElement, { duration: 0.5, marginTop: '18em', ease: 'power2.out' }, 0)
      .to(this.mobileTopEl.nativeElement, { duration: 0.5, height: 'auto', ease: 'power2.out' }, 0)
      .fromTo(this.paginatorEl.nativeElement, { opacity: 1 }, { duration: 0.2, opacity: 0, ease: 'power2.out' }, 0);
    
    }

  }

  changePhoto(url: string){
    
    let changePhotoTimeline = gsap.timeline()
    .to(this.desktopViewerEl.nativeElement, { duration: 0.2, translateX: '-10%', opacity: 0, ease: 'power2.in' }, 0)
    .call(() => { this.currentPhoto = url; this.detector.detectChanges() }, [], 0.2)
    .to(this.desktopViewerEl.nativeElement, { duration: 0.2, translateX: '0%', opacity: 1, ease: 'power2.out' }, 0.4);

  }

  onResize(): void{

  }

}
