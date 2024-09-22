import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchComponent } from '../search/search.component';
import { PeriodicElement } from '../../models/periodic-element.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DataProviderService } from 'src/app/fake-api/data-provider.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableComponent, SpinnerComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public data: PeriodicElement[] = [];

  public loading: boolean = true;
  private keyword: string = '';

  private dialog = inject(MatDialog);

  constructor(private dataProviderService: DataProviderService) {}

  ngOnInit(): void {
    this.getData(this.keyword);
  }

  private getData(filter: string): void {
    this.loading = true;
    this.data = [];
    this.dataProviderService.getData(filter).subscribe(
      (data) => {
        this.data = data;
        this.loading = false;
      },
      (error) => console.error(error)
    );
  }

  public filterData(word: string): void {
    this.keyword = word;
    this.getData(word);
  }

  public openDialog(data: PeriodicElement): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataProviderService.editData(data, result);
        this.getData(this.keyword);
      }
    });
  }
}
