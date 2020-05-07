import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projects } from '../projects';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-art-view',
  templateUrl: './art-view.component.html',
  styleUrls: ['./art-view.component.scss']
})
export class ArtViewComponent implements OnInit {

  projectID: number;
  origin: string;
  found: boolean = false;

  projects: Projects[];
  public project: Projects;
  
  constructor(private jsonData: DataJsonService, public dialogRef: MatDialogRef<ArtViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private location: Location) {
    this.projectID = data.projectID;
    this.origin = data.origin;
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

  loadProject(): void{
    let found: number = -1;
    this.projects.forEach((project: Projects) => {
      if(project.id == this.projectID){
        found = project.id;
        this.project = project;
      }
    });
    //console.log(this.project.colours.background);
  }

  close(): void{
    this.location.go("/"+this.origin);
    this.dialogRef.close();
  }

}
