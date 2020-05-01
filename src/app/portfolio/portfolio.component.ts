import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {OnInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Projects } from '../projects';
import { DataJsonService } from '../data-json.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  projects: Projects[] = [];
  availableProjects: Projects[] = [];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordFormCtrl = new FormControl();
  filteredKeywords: Observable<string[]>;
  keywords: string[] = [];
  allKeywords: string[] = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'PHP'];
  availableKeywords: string[] = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'PHP'];

  @ViewChild('keywordInput') keywordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private jsonData: DataJsonService) {
    this.filterMap();
    this.sortKeywords();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let lowercaseKeywords = this.keywords.map(function(x){ return x.toLowerCase() })

    // Add our keyword
    if ((value || '').trim()) {
      if(!lowercaseKeywords.includes(value.trim().toLowerCase())){
        this.keywords.push(value.trim());
        this.updateSearch();
      }
      if(this.availableKeywords.indexOf(value.trim())){
        const index = this.availableKeywords.indexOf(value.trim());
        if (index >= 0) {
          this.availableKeywords.splice(index, 1);
          this.sortKeywords();
        }
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.keywordFormCtrl.setValue(null);
  }

  remove(keyword: string): void {
    const index = this.keywords.indexOf(keyword);
    let lowercaseKeywords = this.availableKeywords.map(function(x){ return x.toLowerCase() })
    if (index >= 0) {
      if(!lowercaseKeywords.includes(keyword.trim().toLowerCase())){
        this.availableKeywords.push(keyword.trim());
        this.sortKeywords();
      }
      this.keywords.splice(index, 1);
      this.updateSearch();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.keywords.includes(event.option.viewValue)){
      this.keywords.push(event.option.viewValue);
      this.updateSearch();
    }
    if(this.availableKeywords.indexOf(event.option.viewValue)){
      const index = this.availableKeywords.indexOf(event.option.viewValue);
      if (index >= 0) {
        this.availableKeywords.splice(index, 1);
        this.sortKeywords();
      }
    }
    this.keywordInput.nativeElement.value = '';
    this.keywordFormCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allKeywords.filter(keyword => keyword.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  
    this.jsonData.getProjects().subscribe(
      response => {
          this.projects = response;
          this.availableProjects = response;
      },
      error => console.log(error)
    );

  }

  updateSearch(): void{
    this.availableProjects = [];
    let lowercaseKeywords = this.keywords.map(function(x){ return x.toLowerCase() })
    
    this.projects.forEach((project: Projects) => {
      let incl = false;
      if(this.keywords.length < 1){
        incl = true;
      } else{
        project.keywords.forEach((keyword: string) => {
          if(lowercaseKeywords.includes(keyword.toLowerCase())){
            incl = true;
          }
        });
      }
      if(incl){
        if(!this.availableProjects.includes(project)){
          this.availableProjects.push(project);
        }
      }
    });
    this.filterMap();
  }

  sortKeywords(): void{
    let keywords = this.availableKeywords.sort(function(a, b) {
      var nameA = a.toUpperCase(); // ignore upper and lowercase
      var nameB = b.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
    this.availableKeywords = keywords;
  }

  filterMap(): void{
    this.filteredKeywords = this.keywordFormCtrl.valueChanges.pipe(
      startWith(null),
      map((keyword: string | null) => keyword ? this._filter(keyword) : this.availableKeywords.slice()));
  }


  openArt(project: Object){

  }

}
