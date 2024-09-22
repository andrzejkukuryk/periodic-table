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
  selector: 'app-edit-dialog',
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
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<EditDialogComponent>);
  public data = inject<PeriodicElement>(MAT_DIALOG_DATA);

  public formGroup = new FormGroup({
    position: new FormControl(this.data.position, {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
      updateOn: 'change',
    }),
    name: new FormControl(this.data.name, {
      validators: [Validators.maxLength(12)],
      updateOn: 'change',
    }),
    weight: new FormControl(this.data.weight, {
      validators: [
        Validators.required,
        Validators.pattern('[0-9]+(.[0-9]+)?$'),
      ],
      updateOn: 'change',
    }),
    symbol: new FormControl(this.data.symbol, {
      validators: [Validators.maxLength(5)],
      updateOn: 'change',
    }),
  });

  ngOnInit(): void {
    this.markFieldsAsTouched();
    this.observeForChanges();
  }

  public editedElement: PeriodicElement = { ...this.data };

  public isInvalid(fieldName: string, errorType: string): boolean {
    const nameControl = this.formGroup.get(fieldName);
    if (nameControl != null) {
      return nameControl.hasError(errorType);
    } else {
      return false;
    }
  }

  private markFieldsAsTouched(): void {
    this.formGroup.valueChanges.subscribe(() => {
      Object.keys(this.formGroup.controls).forEach((field) => {
        const control = this.formGroup.get(field);
        if (control) {
          control.markAsTouched();
        }
      });
    });
  }

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

  handleClickClose(): void {
    this.dialogRef.close();
  }
}
