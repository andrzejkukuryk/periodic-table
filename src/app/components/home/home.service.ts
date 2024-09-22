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

  public editData(original: PeriodicElement, edited: PeriodicElement) {
    return this.dataProviderService.editData(original, edited);
  }

  constructor(private dataProviderService: DataProviderService) {}
}
