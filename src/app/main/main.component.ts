import { Component, OnInit, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})

export class MainComponent implements OnInit {

  public bgPos = null;
  public bgWidth;
  public bgHeight;

  constructor() { 

    this.bgWidth = 5000;
    this.bgHeight = 1850;

    let bgPosX = window.innerWidth/2;
    let bgPosY = window.innerHeight-this.bgHeight/2;

    this.bgPos = {
      'background-position': `-${(bgPosX)}px -${(bgPosY)}px`
    }
  }

  ngOnInit(): void {

    // Hi - IR
    


    // // Hi - out
    // var tl = new TimelineMax();
    // tl.to("#hi .cnt", 1, {y: "-10%", opacity: 0})
    //   .to("#hi .jojko", 1, {y: "-10%", opacity: 0}, 0)
    //   .to("#hi #me", 1, {y: "-10%", opacity: 0}, 0);
    // new ScrollMagic.Scene({
    //   duration: '50%',
    //   offset: 0 
    // })
    // .setPin("#hi")
    // .setTween(tl)
    // .addTo(this.controller);

    // // What I do - in
    // new ScrollMagic.Scene({
    //   duration: '50%',
    //   offset: 0,
    //   triggerElement: "#what-i-do"
    // })
    // .setPin("#what-i-do")
    // .setTween("#what-i-do", {opacity: 1})
    // .addTo(this.controller);

    // // What I do - out
    // new ScrollMagic.Scene({
    //   duration: '50%',
    //   //offset: '200',
    //   triggerElement: "#what-i-do",
    //   triggerHook: 0.2
    // })
    // .setTween("#what-i-do", {opacity: 0})
    // .addTo(this.controller);

    // // What I've made - in
    // new ScrollMagic.Scene({
    //   duration: '50%',
    //   offset: 0,
    //   triggerElement: "#what-i-did"
    // })
    // .setTween("#what-i-did", {opacity: 1})
    // .addTo(this.controller);

    // // What I've made - out
    // new ScrollMagic.Scene({
    //   duration: '50%',
    //   //offset: '200',
    //   triggerElement: "#what-i-did",
    //   triggerHook: 0.2
    // })
    // .setTween("#what-i-did", {opacity: 0})
    // .addTo(this.controller);

    // // Get in touch - in
    // new ScrollMagic.Scene({
    //   duration: '50%',
    //   offset: 0,
    //   triggerElement: "#get-in-touch"
    // })
    // .setTween("#get-in-touch", {opacity: 1})
    // .addTo(this.controller);

    // // Get in touch - out
    // new ScrollMagic.Scene({
    //   duration: '50%',
    //   //offset: '200',
    //   triggerElement: "#get-in-touch",
    //   triggerHook: 0.2
    // })
    // .setTween("#get-in-touch", {opacity: 0})
    // .addTo(this.controller);
  
  }

  @HostListener("window:scroll", []) trackScroll() {
    // States: Case 1
    // if(this.controller.scrollPos() > 0){
    //   this.controller.scrollTo("#what-i-do");
    // }
  }

  moveBackground(e){
    let element = document.getElementById("hi");
    let x = element.style.backgroundPositionX.slice(0,-2);
    let y = element.style.backgroundPositionY.slice(0,-2);
    let currentPosX = parseInt(x);
    let currentPosY = parseInt(y);

    let change = 1;
    let newChangeX = e.movementX;
    let newChangeY = e.movementY;

    let boundTop = 50;
    let boundBottom = 50;
    let boundLeft = 700;
    let boundRight = 700;

    console.log(newChangeY);
    if((currentPosY-newChangeY) >= -boundTop && newChangeY <= 0 || (currentPosY-newChangeY) <= window.innerHeight-this.bgHeight/1.5+boundBottom && newChangeY >= 0){
      newChangeY = 0;
    } else{
      newChangeY = newChangeY/10;
    }
    if((currentPosX-newChangeX) >= -boundLeft && newChangeX <= 0 || (currentPosX-newChangeX) <= window.innerWidth-this.bgWidth/1.5+boundRight && newChangeX >= 0){
      newChangeX = 0;
    } else{
      newChangeX = newChangeX/10;
    }
    // if(newChangeX >= 0){
    //   newChangeX = change;
    // } else{
    //   newChangeX = change*(-1);
    // }
    // if(newChangeY >= 0){
    //   newChangeY = change;
    // } else{
    //   newChangeY = change*(-1);
    // }

    let newPosX = currentPosX-newChangeX;
    let newPosY = currentPosY-newChangeY;

    this.bgPos = {
      //'background-position': `-${e.clientX}px -${e.clientY}px`
      'background-position': `${(newPosX)}px ${(newPosY)}px`
    }

    //console.log(this.bgPos);
  }
}
