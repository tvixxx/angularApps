import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseApi} from "../../../shared/core/base-api";
import {Observable} from "rxjs";

import {CategoryEvent} from "../models/event.model";

@Injectable()
export class EventsService extends BaseApi {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  addEvent(event: CategoryEvent): Observable<CategoryEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<CategoryEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<CategoryEvent> {
    return this.get(`events/${id}`);
  }
}
