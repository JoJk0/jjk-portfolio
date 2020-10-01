import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataJsonService } from './data-json.service';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { AnimatedDirective } from './animated.directive';
import { SectionHiComponent } from './section-hi/section-hi.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { ArtViewComponent } from './art-view/art-view.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectOpenerComponent } from './project-opener/project-opener.component';
import { SkillsOpenerComponent } from './skills-opener/skills-opener.component';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';
import { SectionSkillsComponent } from './section-skills/section-skills.component';
import { SectionProjectsComponent } from './section-projects/section-projects.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import * as Hammer from 'hammerjs';
import { CvComponent } from './cv/cv.component';
import { FooterComponent } from './footer/footer.component';

@Injectable() export class MyHammerConfig extends HammerGestureConfig {

  overrides = <any>{
  swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent,        
      children: [
        {
          path: 'skills',
          component: SkillsOpenerComponent
        }
      ] 
      },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { 
        path: 'projects', 
        component: PortfolioComponent,
        children: [
          {
            path: ':id',
            component: ProjectOpenerComponent
          }
        ] 
      },
      { path: 'cv', component: CvComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatStepperModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    HammerModule,
    NgxUsefulSwiperModule,
    PinchZoomModule,
    RecaptchaV3Module
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    MenuComponent,
    MainComponent,
    AnimatedDirective,
    SectionHiComponent,
    MySkillsComponent,
    ArtViewComponent,
    PortfolioComponent,
    PageNotFoundComponent,
    ProjectOpenerComponent,
    SkillsOpenerComponent,
    GetInTouchComponent,
    SectionSkillsComponent,
    SectionProjectsComponent,
    CvComponent,
    FooterComponent
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [MySkillsComponent],
  providers: [
    CartService,
    DataJsonService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdVt88ZAAAAACjzpUIkS5NxYV093paEt3d43VTi' }
  ]
})

export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
