import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MySkillsComponent } from '../my-skills/my-skills.component';

@Component({
  selector: 'app-skills-opener',
  templateUrl: './skills-opener.component.html',
  styleUrls: ['./skills-opener.component.scss']
})
export class SkillsOpenerComponent implements OnInit {

  sub: any;
  dialogRef;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dialogRef = this.dialog.open(MySkillsComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      backdropClass: 'dialogBackdrop',
      panelClass: ['my-skills-container', "skills-opener"],
      id: 'my-skills-container'
    });
  }

}
