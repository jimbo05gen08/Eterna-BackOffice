import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BaseService } from "./base.service";
import { ApiResponse } from "@/app/shared/models/api/api.response";
import { AuthTokens } from "@/app/shared/models/api/auth-tokens";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseService {
  constructor() {
    super({ controller: "Auth" });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.httpClient
      .post<ApiResponse<AuthTokens>>(`${this.baseApiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          const tokens = this.handleAndGetData(response);
          if (tokens) {
            this.storeApiToken(tokens);
          }
          return true;
        }),
      );
  }

  requestPasswordReset(email: string): Observable<{ forgotlink: string }> {
    return this.httpClient
      .post<ApiResponse<{ forgotlink: string }>>(`${this.baseApiUrl}/forgot`, {
        email,
      })
      .pipe(map((response) => this.handleAndGetData(response)));
  }

  resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Observable<boolean> {
    return this.httpClient
      .post<ApiResponse<null>>(`${this.baseApiUrl}/reset`, {
        email,
        token,
        newPassword,
      })
      .pipe(map((response) => this.handleAndGetSuccess(response)));
  }

  refreshToken(): Observable<AuthTokens> {
    const refreshToken = localStorage.getItem("refresh_token") ?? "";
    return this.httpClient
      .post<ApiResponse<AuthTokens>>(`${this.baseApiUrl}/refresh`, {
        refreshToken,
      })
      .pipe(
        map((response) => {
          const tokens = this.handleAndGetData(response, true);
          if (tokens) {
            this.storeApiToken(tokens);
          }
          return tokens;
        }),
      );
  }

  logout(): Observable<boolean> {
    const refreshToken = localStorage.getItem("refresh_token") ?? "";
    return this.httpClient
      .post<ApiResponse<null>>(`${this.baseApiUrl}/logout`, {
        refreshToken,
      })
      .pipe(
        map((response) => {
          this.removeApiToken();
          return this.handleAndGetSuccess(response);
        }),
      );
  }
}
