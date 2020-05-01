import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtViewComponent } from '../art-view/art-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-opener',
  templateUrl: './project-opener.component.html',
  styleUrls: ['./project-opener.component.scss']
})
export class ProjectOpenerComponent implements OnInit {

  projectID: number;
  sub: any;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.projectID = +params['id']; // (+) converts string 'id' to a number
    });

    const dialogRef = this.dialog.open(ArtViewComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      backdropClass: 'dialogBackdrop',
      panelClass: 'art-view-container',
      id: 'art-view-container',
      data: { projectID: this.projectID }
    });

    dialogRef.afterClosed().subscribe(result => {
      //gsap.to(this.mySkillsBackground.nativeElement, transformOptionsOut);
    });
    
  }

}
