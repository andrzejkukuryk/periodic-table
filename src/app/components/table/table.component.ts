import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element.model';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, SpinnerComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [TableService],
})
export class TableComponent implements OnInit {
  public data!: PeriodicElement[];
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  ngOnInit(): void {
    this.setData();
  }

  private setData(): void {
    this.loading.next(true);
    this.tableService.getData().subscribe(
      (elements) => {
        this.data = elements;
      },
      (error) => console.error(error),
      () => this.loading.next(false)
    );
  }

  constructor(private tableService: TableService) {}
}
