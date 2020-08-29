import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skills } from './skills';
import { Projects } from './projects';
import { UniModules } from './uni-modules';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root'
})
export class DataJsonService {

  private url: string = "https://jjk-portfolio.firebaseio.com/";
  private skillsUrl: string = this.url+"Skills.json";
  private projectsUrl: string = this.url+"Projects.json";
  private uniModulesUrl: string = this.url+"UniModules.json";
  private topicsUrl: string = this.url+"Topics.json";

  constructor(private http: HttpClient) { }

  getSkills(){
    return this.http.get<Skills[]>(this.skillsUrl);
  }

  getProjects(){
    return this.http.get<Projects[]>(this.projectsUrl);
  }

  getUniModules(){
    return this.http.get<String[]>(this.uniModulesUrl);
  }

  getTopics(){
    return this.http.get<Topic[]>(this.topicsUrl);
  }

}
