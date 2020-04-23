import { Component, OnInit } from '@angular/core';
import { DataJsonService } from '../data-json.service';
import { Skills } from '../skills';
import { UniModules } from '../uni-modules';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent implements OnInit {

  skills: Skills[] = [];
  uniModules: UniModules[] = [];

  constructor(private jsonData: DataJsonService) { }

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

}
