import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { DataJsonService } from '../data-json.service';
import { Skills } from '../skills';
import { UniModules } from '../uni-modules';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { animate } from '@angular/animations';
import { gsap } from 'gsap';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent implements OnInit, AfterViewInit {

  // Animated elements
  @ViewChild('closeDialogButton') closeEl: ElementRef;
  @ViewChild('bgTitle') bgTitleEl: ElementRef;
  @ViewChildren('catTitle') catTitles: QueryList<ElementRef>;
  @ViewChildren('skill') skillEls: QueryList<ElementRef>;
  @ViewChildren('module') uniModulesEls: QueryList<ElementRef>;
  @ViewChild('uniModulesContainer') uniModulesContainerEl: ElementRef;
  @ViewChild('uniModulesTitle') uniModulesTitleEl: ElementRef;

  // Properties
  skills: Skills[] = [];
  uniModules: String[] = [];
  uniModulesGrouped: any = [];
  animationTimeline: gsap.core.Timeline;

  constructor(private jsonData: DataJsonService, public dialogRef: MatDialogRef<MySkillsComponent>, private location: Location) { }

  ngOnInit(): void {
  
    this.jsonData.getSkills().subscribe(
      response => {
          this.skills = response;
          setTimeout(() => {
            this.animateSkills();
          }, 0);
      },
      error => console.log(error)
    );

    this.jsonData.getUniModules().subscribe(
      response => {
          this.uniModules = response;

          const sorted = this.uniModules.sort((a, b) => a > b ? 1 : -1);

          const grouped = sorted.reduce((groups, unimodule) => {
              const letter = unimodule.charAt(0);

              groups[letter] = groups[letter] || [];
              groups[letter].push(unimodule);

              return groups;
          }, {});

          const result = Object.keys(grouped).map(key => ({key, unimodules: grouped[key]}));

          this.uniModulesGrouped = result;

          console.log(result);

          setTimeout(() => {
            this.animateUniModules();
          }, 0);
      },
      error => console.log(error)
    );

  }

  ngAfterViewInit(){

    this.animateIn();

  }

  close(): void{
    this.location.go("/");
    this.dialogRef.close();
  }

  animateIn(): void{

    this.animationTimeline = gsap.timeline({ delay: 0.4 });
    this.animationTimeline

    // BG Text
    .fromTo(this.bgTitleEl.nativeElement, { left: '-1em', opacity: 0 }, { duration: 1, left: '-0.1em', opacity: 0.3, ease: 'power4.out' }, 0)

    // Close
    .fromTo(this.closeEl.nativeElement, { scale: 0 }, { duration: 0.7, scale: 1.7, ease: 'back.out(1)' }, 1);

  }

  animateSkills(): void{

    // Categories
    let i = 0.0;
    this.catTitles.forEach((category) => {

      this.animationTimeline
      .fromTo(category.nativeElement, { scale: 0 }, { duration: 0.3, scale: 1, ease: 'back.out(1)' }, 0.5+i);
      
      i = i+0.2;

    });

    // Skills
    i = 0.0;
    this.skillEls.forEach((skill) => {

      this.animationTimeline
      .fromTo(skill.nativeElement, { scale: 0 }, { duration: 0.3, scale: 1.1, ease: 'back.out(1)' }, 0.5+i);

      i = i+0.03;

    });

  }

  animateUniModules(): void{

    // Uni modules - seperator
    this.animationTimeline
    
    .fromTo(this.uniModulesContainerEl.nativeElement, { scaleY: 0 }, { duration: 0.4, scaleY: 1, ease: 'power2.out' }, 1)
    .fromTo(this.uniModulesTitleEl.nativeElement, { scale: 0 }, { duration: 0.4, scale: 1, ease: 'power2.out' }, 1.4);

    let i = 0.0;

    this.uniModulesEls.forEach((module) => {

      this.animationTimeline
      .fromTo(module.nativeElement, { scale: 0 }, { duration: 0.3, scale: 1, ease: 'back.out(1)' }, 1.5+i);
      
      i = i+0.03;

    });

  }

}
