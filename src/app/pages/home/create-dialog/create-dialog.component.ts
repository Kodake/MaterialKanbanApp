import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {

  textFormControl = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();

  text = "";
  typeList = [
    {
      name: "Bug",
      value: 0
    },
    {
      name: "Renew",
      value: 1
    },
    {
      name: "New function",
      value: 2
    }
  ];

  priorityList = [
    {
      name: "Low",
      value: 0
    },
    {
      name: "Normal",
      value: 1
    },
    {
      name: "High",
      value: 2
    }
  ];
  priority = this.priorityList[0];
  type = this.typeList[0];

  constructor(private dialog: MatDialogRef<CreateDialogComponent>) {}

  save() {
    this.dialog.close({
      text: this.text,
      type: this.type,
      priority: this.priority
    });
  }

}
