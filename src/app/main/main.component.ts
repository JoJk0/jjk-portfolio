import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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
    console.log(bgPosY);
    this.bgPos = {
      'background-position': `-${(bgPosX)}px -${(bgPosY)}px`
    }
  }

  ngOnInit(): void {
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
