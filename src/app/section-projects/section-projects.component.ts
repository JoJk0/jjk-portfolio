import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Projects } from '../projects';
import { ArtViewComponent } from '../art-view/art-view.component';
import { MatDialog } from '@angular/material/dialog';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-section-projects',
  templateUrl: './section-projects.component.html',
  styleUrls: ['./section-projects.component.scss']
})
export class SectionProjectsComponent implements OnInit {

  @ViewChildren('art', {read: ElementRef})
  arts: QueryList<ElementRef>;

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
  
  constructor(public dialog: MatDialog, private jsonData: DataJsonService, private location: Location,) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){

    this.jsonData.getProjects().subscribe(
      response => {
          this.projects = response;
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

}
