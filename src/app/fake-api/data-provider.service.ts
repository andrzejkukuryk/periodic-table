import { Observable, delay, of } from 'rxjs';
import { PeriodicElement } from '../models/periodic-element.model';
import { ELEMENT_DATA } from '../data/periodic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  public getData(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(1500));
  }
}
