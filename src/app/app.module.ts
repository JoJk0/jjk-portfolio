import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { ScrollGSAPService } from './scroll-gsap.service';

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
      { path: '**', component: PageNotFoundComponent }
    ]),
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
    MatTooltipModule
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
    SectionProjectsComponent
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [MySkillsComponent],
  providers: [
    CartService,
    DataJsonService
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
