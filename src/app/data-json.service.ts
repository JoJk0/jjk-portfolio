import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skills } from './skills';
import { Projects } from './projects';
import { UniModules } from './uni-modules';

@Injectable({
  providedIn: 'root'
})
export class DataJsonService {

  private url: string = "http://localhost:3000/";
  private skillsUrl: string = this.url+"Skills";
  private projectsUrl: string = this.url+"Projects";
  private uniModulesUrl: string = this.url+"UniModules";

  constructor(private http: HttpClient) { }

  getSkills(){
    return this.http.get<Skills[]>(this.skillsUrl);
  }

  getProjects(){
    return this.http.get<Projects[]>(this.projectsUrl);
  }

  getUniModules(){
    return this.http.get<UniModules[]>(this.uniModulesUrl);
  }

}
