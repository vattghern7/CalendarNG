import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventViewModel} from '../save-event/save-event.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private ALL_EVENTS_URL = 'http://localhost:8080/events/all';
  private ONE_EVENT_BY_ID_URL = 'http://localhost:8080/events/';
  private SAVE_EVENT_URL = 'http://localhost:8080/events/save';
  private REMOVE_EVENT_URL = 'http://localhost:8080/events/remove/';

  title: string;
  start: Date;
  end: Date;
  eventAllDay: boolean;

  addFlag = false;
  changeFlag = false;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.ALL_EVENTS_URL, this.httpOptions);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(this.ONE_EVENT_BY_ID_URL + id, this.httpOptions);
  }

  addEvent(event: EventViewModel): Observable<any> {
    return this.http.post(this.SAVE_EVENT_URL, event, this.httpOptions);
  }

  removeEvent(id: string): Observable<any> {
    return this.http.delete(this.REMOVE_EVENT_URL + id, this.httpOptions);
  }

  getAddFlag(): boolean {
    return this.addFlag;
  }

  setAddFlag(flag: boolean): void {
    this.addFlag = flag;
  }

  getChangeFlag(): boolean {
    return this.changeFlag;
  }

  setChangeFlag(value: boolean) {
    this.changeFlag = value;
  }
}
