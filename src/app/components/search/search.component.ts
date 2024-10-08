import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  public searchText = new FormControl('');

  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();

  public showTimer: boolean = false;
  public startTimer: boolean = false;

  ngOnInit(): void {
    this.observeForChanges();
  }

  private observeForChanges(): void {
    this.searchText.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => {
        if (value != null) {
          this.searchValue.next(value.trim());
        } else {
          this.searchValue.next('');
        }
        this.showTimer = false;
        this.startTimer = false;
      });

    this.searchText.valueChanges.subscribe((value) => {
      this.resetTimerAnimation();
    });
  }

  private resetTimerAnimation(): void {
    this.showTimer = true;
    this.startTimer = false;
    setTimeout(() => {
      this.startTimer = true;
    }, 10);
  }
}
