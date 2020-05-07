import { Component, OnInit, Inject } from '@angular/core';
import { DataJsonService } from '../data-json.service';
import { Skills } from '../skills';
import { UniModules } from '../uni-modules';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent implements OnInit {

  skills: Skills[] = [];
  uniModules: UniModules[] = [];

  constructor(private jsonData: DataJsonService, public dialogRef: MatDialogRef<MySkillsComponent>, private location: Location) { }

  ngOnInit(): void {
  
    this.jsonData.getSkills().subscribe(
      response => {
          this.skills = response;
      },
      error => console.log(error)
    );

    this.jsonData.getUniModules().subscribe(
      response => {
          this.uniModules= response;
      },
      error => console.log(error)
    );

  }

  close(): void{
    this.location.go("/");
    this.dialogRef.close();
  }

}
