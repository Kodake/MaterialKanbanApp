import { Component, OnInit } from '@angular/core';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.kanbanService.sideBar.next(!this.kanbanService.sideBar.value);
  }

}