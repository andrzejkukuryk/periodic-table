import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public loading: boolean = true;
  public handleLoading(loading: boolean): void {
    this.loading = loading;
  }
}
