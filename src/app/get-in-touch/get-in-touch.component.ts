import { Component, OnInit, ElementRef, ViewChild, Input, QueryList } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatStepper } from '@angular/material/stepper';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { EmailValidator } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { DataJsonService } from '../data-json.service';
import { Topic } from '../topic';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HttpClient, HttpParams } from '@angular/common/http';
import { ETIME } from 'constants';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.scss']
})

export class GetInTouchComponent implements OnInit {
  
  @Input() skeletons: QueryList<ElementRef>;
  
  @ViewChild('ctextarea') cTextarea: ElementRef;
  @ViewChild('textarea') textarea: ElementRef;
  @ViewChild('inputTester') inputTesterEl: ElementRef;
  @ViewChild('textareaTester') textareaTesterEl: ElementRef;
  @ViewChild('wavingHand') wavingHandEl: ElementRef;
  @ViewChild('topicSelect') topicSelectEl: ElementRef;

  firstOptions: FormGroup;
  secondOptions: FormGroup;
  thirdOptions: FormGroup;
  messageOptions: FormGroup;

  
  inputTesterValue: string;
  textareaTesterValue : string;
  testerWidth: number;
  testerHeight: number;
  topics: Topic[] = [];
  textareaPlaceholder: string;
  sentInfoTitle: string;
  sentInfoDesc: string;
  checkboxEmail: boolean = true;

  // Mat form
  formSending: boolean = false;
  formSuccess: boolean = false;
  formFailure: boolean = false;

  public skeleton: ElementRef;
  private shrinkFactor = 1;

  inputWidth: Object = {
    cname: 85,
    ctopic: 75,
    cemail: 230
  };
  inputHeight: number = 32;

  // Subscriptions
  private recaptchaSub: Subscription;

  
  constructor(fb: FormBuilder, private jsonData: DataJsonService, private http: HttpClient, private recaptchaV3Service: ReCaptchaV3Service) {
    this.firstOptions = fb.group({
      firstCtrl: [null, Validators.required]
    });
    this.secondOptions = fb.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdOptions = fb.group({
      thirdCtrl: ['', Validators.email]
    });
    this.messageOptions = fb.group({
      messageCtrl: ['', Validators.required],
      emailCopyCtrl: ['', '']
    });
  }

  ngOnInit(): void {

    this.jsonData.getTopics().subscribe(
      response => {
          this.topics = response;
          this.textareaPlaceholder = this.topics[0].draftText;
      },
      error => console.log(error)
    );

  }

  async ngAfterViewInit(){

    
    await this.skeletons;

    this.skeletons.forEach((skeleton) => {
      if(skeleton.nativeElement.id == 'get-in-touch-skeleton'){
            
        this.skeleton = skeleton;
        this.animateHand();
        
        // this.onResizeSub = this.call.onResizeNotifier.$.subscribe(bool => {
        //   this.onResize();
        // });

      }
    });

  }

  animateHand(): void{

    let handTimeline = gsap.timeline({ repeat: 3, yoyo: true, paused: true });

    handTimeline
    .fromTo(this.wavingHandEl.nativeElement, { rotate: 0 }, { duration: 2, rotate: 15, ease: 'power1.inOut' }, 0);

    ScrollTrigger.create({

      id: 'wavingHandScrollTrigger',
      animation: handTimeline,
      trigger: this.skeleton.nativeElement,
      start: "top center",
      end: "bottom center",
      scrub: false, 
      markers: false

    });

  }

  changeTopic(event): void{
    let value = event.value;
    this.topics.forEach((topic) => {
      if(topic.name == value){
        this.textareaPlaceholder = topic.draftText;
        this.textareaTesterValue = this.textareaPlaceholder;
        this.sentInfoTitle = topic.sentText.split("!")[0];
        this.sentInfoDesc = topic.sentText.split("!")[1];
        setTimeout(() => {
          let testerHeight = this.textareaTesterEl.nativeElement.offsetHeight;
          setTimeout(() => {
            this.inputHeight = testerHeight;
          }, 0);
        });
      }
    });
  }

  presizeInputPaste(event){
    let isTextarea = event.target.type == "textarea";
    let testerTarget;

    if(isTextarea){
      this.testerWidth = event.target.offsetWidth;
      testerTarget = this.textareaTesterEl.nativeElement;
    } else{
      testerTarget = this.inputTesterEl.nativeElement;
    };

    setTimeout(() => {
      let pasteValue = event.target.value;

      if(isTextarea){
        this.textareaTesterValue = pasteValue;
      } else{
        this.inputTesterValue = pasteValue;
      }

        setTimeout(() => {
          if(isTextarea){
            let testerHeight = this.textareaTesterEl.nativeElement.offsetHeight;
            this.inputHeight = testerHeight;
          } else{
            let testerWidth = this.inputTesterEl.nativeElement.offsetWidth;
            this.inputWidth[event.target.id] = testerWidth;
          }

        }, 0);

    }, 0);

  }

  presizeInput(event){
    let isTextarea = event.target.type == "textarea";

    if(typeof event.key != "undefined" && event.key != "Meta"){
      let key: string = event.key;
      let testerType = "input";
      let testerTarget;
      let testerPrevValue: string;
      let ignoreKey: boolean = false;
      let keysIgnore: string[] = [
        "Shift",
        "Backspace",
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
        "Alt",
        "Meta",
        "Control",
        "CapsLock",
        "Escape"
      ];
      if(isTextarea){
        this.testerWidth = event.target.offsetWidth;
        testerType = 'textarea';
        testerTarget = this.textareaTesterEl.nativeElement;
      } else{
        testerTarget = this.inputTesterEl.nativeElement;
      };
  
      keysIgnore.forEach((keyIgnore: string) => {
        if(keyIgnore == key){
          ignoreKey = true;
        }
      });
      // If new normal key entered add it
      if(!ignoreKey){
        if(isTextarea){
          this.textareaTesterValue = event.target.value+key;
        } else{
          this.inputTesterValue = event.target.value+key;
        }
      }
  
      // If backspace, delete key
      if(key == "Backspace"){
        if(isTextarea){
          this.textareaTesterValue = event.target.value.slice(0,-1);
          if(this.textareaTesterValue == ""){
            this.textareaTesterValue = event.target.placeholder;
          }
          if(this.textareaTesterValue.slice(-1) == "\n"){
            this.textareaTesterValue = this.textareaTesterValue+".";
          }
        } else{
          this.inputTesterValue = event.target.value.slice(0,-1);
          if(this.inputTesterValue == ""){
            this.inputTesterValue = event.target.placeholder;
          }
        }
      }
  
      // If enter entered, create new line
      if(key == "Enter"){
        if(isTextarea){
          this.textareaTesterValue = event.target.value+"\n.";
        } else{
          this.inputTesterValue = event.target.value+"\n.";
        }
      }
      if(!ignoreKey){
        setTimeout(() => {
          if(isTextarea){
            let testerHeight = testerTarget.offsetHeight;
            this.inputHeight = testerHeight;
          } else{
            let testerWidth = testerTarget.offsetWidth;
            this.inputWidth[event.target.id] = testerWidth;
          }
  
        }, 0);
      }

    }

  }
  resizeTextarea(event){
    let value= this.cTextarea.nativeElement.value;
    this.inputTesterValue = value;
    this.testerWidth = this.cTextarea.nativeElement.offsetWidth;

    let testerHeight = this.inputTesterEl.nativeElement.offsetHeight;
    this.inputHeight = testerHeight;
  }
  resizeInput(event?: any){
    let id;
    let text;
    let placeholder;
    let isTextarea;

    if(typeof event.target !== "undefined"){
      id = event.target.id;
      text = event.target.value;
      placeholder = event.target.placeholder;
      isTextarea = event.target.type == "textarea";
    } else{
      id = event.source.id;
      text = event.value;
      placeholder = event.source.placeholder;
      isTextarea = false;
    }

    let testerEl = isTextarea ? this.textareaTesterEl : this.inputTesterEl;

    // if(text == 0){
    //   if(isTextarea){
    //     this.textareaTesterValue = placeholder;
    //     this.inputHeight = testerEl.nativeElement.offsetHeight;
    //   } else{
    //     this.inputTesterValue = placeholder;
    //     this.inputWidth[id] = testerEl.nativeElement.offsetWidth;
    //   }
    // } else{
    //   if(isTextarea){
    //     this.textareaTesterValue = text;
    //     this.inputHeight = testerEl.nativeElement.offsetHeight;
    //   } else{
    //     this.inputTesterValue = text;
    //     this.inputWidth[id] = testerEl.nativeElement.offsetWidth;
    //   }
    // }

    if(isTextarea){
      this.testerWidth = this.cTextarea.nativeElement.offsetWidth;
      if(text == 0){
        this.textareaTesterValue = placeholder;
      } else{
        if(text.slice(-1) == "\n"){
          this.textareaTesterValue = text+".";
        } else{
          this.textareaTesterValue = text;
        };
      }
      setTimeout(() => {
        this.inputHeight = testerEl.nativeElement.offsetHeight;
      }, 0);

    } else{

      if(text == 0){
        this.inputTesterValue = placeholder;
      } else{
        this.inputTesterValue = text;
      }
      setTimeout(() => {
        this.inputWidth[id] = testerEl.nativeElement.offsetWidth;
      }, 0);

    }
    
  }

  onSubmit(): void{
    this.formSending = true;
    
    this.recaptchaSub = this.recaptchaV3Service.execute('importantAction').subscribe((token) => {

        let data = {
      
          topic: this.firstOptions.value.firstCtrl,
          name: this.secondOptions.value.secondCtrl,
          email: this.thirdOptions.value.thirdCtrl,
          message: this.messageOptions.value.messageCtrl,
          emailCopy: this.messageOptions.value.emailCopyCtrl,
          gRecaptchaResponse: token
    
        }
    
        this.http.post<any>('https://europe-west1-jjk-portfolio.cloudfunctions.net/sendEmail', data).subscribe({
        // this.http.post<any>('http://localhost:5000/jjk-portfolio/europe-west1/sendEmail', data).subscribe({
          next: data => {
            this.formSending = false;
            this.formSuccess = true;
          },
          error: error => {
            this.formSending = false;
            this.formFailure = true;
          }
        });

    });

  }

  ngOnDestroy(){
    if(this.formSuccess || this.formFailure){
      this.recaptchaSub.unsubscribe();
    }
  }

}