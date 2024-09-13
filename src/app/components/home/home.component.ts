import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchComponent } from '../search/search.component';
import { HomeService } from './home.service';
import { PeriodicElement } from '../../models/periodic-element.model';

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
  public currentData: PeriodicElement[] = [];

  public loading: boolean = true;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.setData();
  }

  private setData(): void {
    this.loading = true;
    this.homeService.getData().subscribe(
      (elements) => {
        this.data = elements;
        this.currentData = this.data;
      },
      (error) => console.error(error),
      () => (this.loading = false)
    );
  }

  public filterData(word: string): void {
    if (word !== '') {
      this.filteredData = this.data.filter((element) =>
        Object.values(element).some((value) =>
          value.toString().toLowerCase().includes(word)
        )
      );
      this.currentData = this.filteredData;
    } else {
      this.currentData = this.data;
    }
  }
}
