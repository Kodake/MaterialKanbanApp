import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  sideBar = new BehaviorSubject<any>(true);
  constructor() { }
}
