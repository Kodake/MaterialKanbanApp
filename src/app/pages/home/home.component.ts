import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

const todoStr = localStorage.getItem("tl-todo") || "[]";
const processStr = localStorage.getItem("tl-process") || "[]";
const doneStr = localStorage.getItem("tl-done") || "[]";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  todo = JSON.parse(todoStr);
  process = JSON.parse(processStr);
  done = JSON.parse(doneStr);

  constructor(public dialog: MatDialog) { }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveToLocal();
  }

  saveToLocal() {
    localStorage.setItem("tl-todo", JSON.stringify(this.todo));
    localStorage.setItem("tl-process", JSON.stringify(this.process));
    localStorage.setItem("tl-done", JSON.stringify(this.done));
  }

  addTodo(result: { text: any; type: any; priority: any; }) {
    const date = new Date();
    this.todo.unshift({
      id: Math.random(),
      text: result.text,
      type: result.type,
      priority: result.priority,
      time: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    });
    this.saveToLocal();
  }

  start(item: { id: any; }) {
    this.todo = this.todo.filter((one: { id: any; }) => one.id !== item.id);
    this.process.unshift(item);
  }

  finish(item: { id: any; }) {
    this.process = this.process.filter((one: { id: any; }) => one.id !== item.id);
    this.done.unshift(item);
  }

  deleteFromDone(item: { id: any; }) {
    this.done = this.done.filter((one: { id: any; }) => one.id !== item.id);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: "450px",
      height: "550px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      // alert(JSON.stringify(result));
      if (!result || !result.text) {
        return;
      }
      this.addTodo(result);
    });
  }
}
