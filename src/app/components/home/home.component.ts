import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchComponent } from '../search/search.component';
import { HomeService } from './home.service';
import { PeriodicElement } from '../../models/periodic-element.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableComponent, SpinnerComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [HomeService],
})
export class HomeComponent implements OnInit {
  public data: PeriodicElement[] = [];
  public filteredData: PeriodicElement[] = [];
  public editedData: PeriodicElement[] = [];
  public currentData: PeriodicElement[] = [];

  public loading: boolean = true;
  private keyword: string = '';

  private dialog = inject(MatDialog);

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getData(this.keyword);
  }

  private getData(filter: string): void {
    this.loading = true;
    this.homeService.getData(filter).subscribe(
      (data) => {
        this.currentData = data;
      },
      (error) => console.error(error),
      () => (this.loading = false)
    );
  }

  public filterData(word: string): void {
    this.keyword = word;
    this.currentData = [];
    this.getData(word);
  }

  public openDialog(data: PeriodicElement): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.homeService.editData(data, result);
        this.currentData = [];
        this.getData(this.keyword);
      }
    });
  }
}
