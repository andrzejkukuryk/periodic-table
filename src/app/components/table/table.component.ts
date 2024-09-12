import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [TableService],
})
export class TableComponent implements OnInit {
  ngOnInit(): void {
    this.setData();
  }

  public data!: PeriodicElement[];
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  private setData(): void {
    this.tableService.getData().subscribe(
      (elements) => (this.data = elements),
      (error) => console.error(error)
    );
  }

  constructor(private tableService: TableService) {}
}
