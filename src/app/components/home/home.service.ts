import { Observable } from 'rxjs';
import { DataProviderService } from '../../fake-api/data-provider.service';
import { PeriodicElement } from '../../models/periodic-element.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public getData(filterWord: string): Observable<PeriodicElement[]> {
    return this.dataProviderService.getData(filterWord);
  }

  public filterData(
    elements: PeriodicElement[],
    word: string
  ): PeriodicElement[] {
    if (word !== '') {
      return elements.filter((element) =>
        Object.values(element).some((value) =>
          value.toString().toLowerCase().includes(word)
        )
      );
    }
    return elements;
  }

  constructor(private dataProviderService: DataProviderService) {}
}
