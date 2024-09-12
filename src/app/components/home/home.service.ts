import { Observable } from 'rxjs';
import { DataProviderService } from '../../fake-api/data-provider.service';
import { PeriodicElement } from '../../models/periodic-element.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public getData(): Observable<PeriodicElement[]> {
    return this.dataProviderService.getData();
  }

  constructor(private dataProviderService: DataProviderService) {}
}
