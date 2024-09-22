import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable, delay, map } from 'rxjs';
import { PeriodicElement } from '../models/periodic-element.model';
import { ELEMENT_DATA } from '../data/periodic';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService extends RxState<{ data: PeriodicElement[] }> {
  private delayTime = 300 + Math.floor(Math.random() * 1000);

  constructor() {
    super();
    // Inicjalizujemy stan z ELEMENT_DATA
    this.set({ data: [...ELEMENT_DATA] });
  }

  // Pobieramy dane ze stanu
  public getData(filterWord: string): Observable<PeriodicElement[]> {
    return this.select('data').pipe(
      delay(this.delayTime),
      map((data: PeriodicElement[]) =>
        filterWord
          ? data.filter((element) =>
              Object.values(element).some((value) =>
                value.toString().toLowerCase().includes(filterWord)
              )
            )
          : data
      )
    );
  }

  // Edytujemy dane w stanie
  public editData(original: PeriodicElement, edited: PeriodicElement): void {
    this.set(({ data }) => {
      const index = data.findIndex((element) => element === original);
      if (index !== -1) {
        const updatedData = [...data];
        updatedData[index] = edited;
        return { data: updatedData };
      }
      return { data };
    });
  }
}
