import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class BaseApi {

  private baseUrl: string = 'http://localhost:3000/';

  constructor(public httpClient: HttpClient) {}

  private getUrl(url: string = ''): string {
    return this.baseUrl + url
  }

  public get(url: string = ''): Observable<any> {
    return this.httpClient.get(this.getUrl(url));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.httpClient.post(this.getUrl(url), data);
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.httpClient.put(this.getUrl(url), data);
  }
}
