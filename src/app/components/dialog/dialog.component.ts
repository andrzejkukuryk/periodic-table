import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../models/periodic-element.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<DialogComponent>);
  public data = inject<PeriodicElement>(MAT_DIALOG_DATA);

  public formGroup = new FormGroup({
    position: new FormControl(this.data.position, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    name: new FormControl(this.data.name, Validators.maxLength(12)),
    weight: new FormControl(this.data.weight, [
      Validators.required,
      Validators.pattern('[0-9]+(.[0-9]+)?$'),
    ]),
    symbol: new FormControl(this.data.symbol, Validators.maxLength(5)),
  });

  ngOnInit(): void {
    this.observeForChanges();
  }

  public editedElement: PeriodicElement = { ...this.data };

  private observeForChanges(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value != null) {
        this.editedElement.position =
          value.position != null ? Number(value.position) : 0;
        this.editedElement.name = value.name != null ? value.name : '';
        this.editedElement.weight =
          value.weight != null ? Number(value.weight) : 0;
        this.editedElement.symbol = value.symbol != null ? value.symbol : '';
      }
    });
  }

  public isLengthInvalid(fieldName: string): boolean {
    const nameControl = this.formGroup.get(fieldName);
    if (nameControl != null) {
      return nameControl.hasError('maxlength');
    } else {
      return false;
    }
  }

  public isTypeInvalid(fieldName: string): boolean {
    const nameControl = this.formGroup.get(fieldName);
    if (nameControl != null) {
      return nameControl.hasError('pattern');
    } else {
      return false;
    }
  }

  public isRequired(fieldName: string): boolean {
    const nameControl = this.formGroup.get(fieldName);
    if (nameControl != null) {
      return nameControl.hasError('required') && nameControl.touched;
    } else {
      return false;
    }
  }

  handleClickClose(): void {
    this.dialogRef.close();
  }
}
