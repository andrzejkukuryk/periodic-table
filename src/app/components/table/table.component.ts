import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data!: PeriodicElement[];

  @Output() selectedRow: EventEmitter<PeriodicElement> =
    new EventEmitter<PeriodicElement>();

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public handleClick(row: PeriodicElement): void {
    this.selectedRow.next(row);
  }

  constructor() {}
}
