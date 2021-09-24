import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showFiller = true;
  sideBar = false;

  @ViewChild("drawer", { static: true }) drawerRef: { open: () => void; close: () => void; } | undefined;

  constructor(private kanbanService: KanbanService, private router: Router) {}

  ngOnInit() {
    this.kanbanService.sideBar.subscribe((sideBar) => {
      console.log(sideBar);
      this.sideBar = sideBar;
      if (sideBar) {
        this.drawerRef?.open();
      } else {
        this.drawerRef?.close();
      }
    });
  }

  changePage(path: any) {
    this.router.navigate([path]);
  }
}
