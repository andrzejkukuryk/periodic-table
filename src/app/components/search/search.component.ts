import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  public searchText = new FormControl('');

  ngOnInit(): void {
    this.watchForChanges();
  }

  private watchForChanges(): void {
    this.searchText.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => console.log(value));
  }
}
