import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BaseService } from "./base.service";
import { ApiResponse } from "@/app/shared/models/api/api.response";
import { User } from "@/app/shared/models/user";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService {
  constructor() {
    super({ controller: "Users" });
  }

  private getMe(): Observable<User> {
    return this.httpClient
      .get<ApiResponse<User>>(`${this.baseApiUrl}/me`)
      .pipe(map((response) => this.handleAndGetData(response)));
  }

  getAndStoreCurrentUser(): Observable<User> {
    return this.getMe().pipe(
      map((user) => {
        this.persistCurrentUser(user);
        return user;
      }),
    );
  }
}
