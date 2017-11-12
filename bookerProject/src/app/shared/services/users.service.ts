import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Response} from "@angular/http";
import {BaseApi} from "../core/base-api";

@Injectable()
export class UserService extends BaseApi {
  private url: string = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
