import { Observable } from 'rxjs';
import { DataProviderService } from '../../fake-api/data-provider.service';
import { PeriodicElement } from '../../models/periodic-element.model';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public getData(): Observable<PeriodicElement[]> {
    return this.dataProviderService.getData();
  }
  constructor(
    @Inject(DataProviderService)
    private dataProviderService: DataProviderService
  ) {}
}
