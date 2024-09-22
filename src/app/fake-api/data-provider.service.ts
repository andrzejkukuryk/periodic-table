import { Observable, delay, of } from 'rxjs';
import { PeriodicElement } from '../models/periodic-element.model';
import { ELEMENT_DATA } from '../data/periodic';
import { Injectable } from '@angular/core';

const currentData: PeriodicElement[] = [...ELEMENT_DATA];

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  public getData(filterWord: string): Observable<PeriodicElement[]> {
    if (filterWord != '') {
      const filteredData = currentData.filter((element) =>
        Object.values(element).some((value) =>
          value.toString().toLowerCase().includes(filterWord)
        )
      );

      return of(filteredData).pipe(delay(1500));
    }
    return of(currentData).pipe(delay(1500));
  }

  public editData(orginal: PeriodicElement, edited: PeriodicElement): void {
    const index = currentData.indexOf(orginal);

    if (index !== -1) {
      currentData[index] = edited;
    }
  }
}
