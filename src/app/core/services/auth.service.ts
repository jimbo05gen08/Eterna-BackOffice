import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private httpClient = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(
      "https://apidev.eternamemorias.com/BackOffice/Auth/login",
      {
        email,
        password,
      },
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post(
      "https://apidev.eternamemorias.com/BackOffice/Auth/forgot",
      {
        email,
      },
    );
  }
}
