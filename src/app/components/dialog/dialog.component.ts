import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  model,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../models/periodic-element.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
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
    position: new FormControl(this.data.position),
    name: new FormControl(this.data.name),
    weight: new FormControl(this.data.weight),
    symbol: new FormControl(this.data.symbol),
  });

  ngOnInit(): void {
    this.observeForChanges();
  }

  // public formPosition = new FormControl(this.data.position);
  // public formName = new FormControl(this.data.name);
  // public formWeight = new FormControl(this.data.weight);
  // public formSymbol = new FormControl(this.data.symbol);

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

  public handleClickSave(): void {
    console.log(this.editedElement);
  }

  handleClickClose(): void {
    this.dialogRef.close();
  }
}
