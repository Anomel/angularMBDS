import { Injectable } from '@angular/core';
import { Assignment } from '../assignment/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  level:number=0;

  constructor() { }

  log(assignment: Assignment, action:string) {
    if(this.level >= 1)
      console.log("LOGGING SERVICE : " + assignment.nom + " " + action);
  }

  setLoggingLevel(val:number) {
    this.level = val;
  }
}
