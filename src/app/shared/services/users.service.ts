import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {super(http); }
  // getUserByEmail(email: string): Observable<User> {
  //       return this.http.get(`http://localhost:3000/users?email=${email}`)
  //         .pipe(map(res => res))
  //         .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
  // }
  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
  }

  // createNewUser(user: User) {
  //   return this.http.post('http://localhost:3000/users', user)
  //    .pipe(map(res => res));
  // }
  createNewUser(user: User) {
    return this.post(`users`, user);
  }
}
