import { HttpClient } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "@/environment/environment";
import { ApiResponse } from "@/app/shared/models/api/api.response";
import { AuthTokens } from "@/app/shared/models/api/auth-tokens";
import { User } from "@/app/shared/models/user";
import { ToastMessageService } from "./toast-message.service";

export abstract class BaseService {
  protected httpClient = inject(HttpClient);
  protected platformId = inject(PLATFORM_ID);
  protected baseApiUrl = `${environment.baseApiUrl}`;
  protected toastMessageService = inject(ToastMessageService);
  private readonly ApiToken = "api_token";
  private readonly RefreshToken = "refresh_token";
  private readonly ExpiricyTokenTime = "expiricy_token";
  private readonly CurrentUser = "current_user";

  constructor({ controller }: { controller: string }) {
    this.baseApiUrl += controller;
  }

  protected buildFormDataFromEntity(
    entity: any,
    additionalFields: { key: string; value: any }[] = [],
    appendUserInfo: boolean = false,
  ): FormData {
    const formData = new FormData();
    Object.entries(entity).forEach((property) =>
      appendIfHasValue(property[0], property[1]),
    );

    if (additionalFields?.length != 0) {
      additionalFields.forEach((property) =>
        appendIfHasValue(property.key, property.value),
      );
    }

    if (appendUserInfo) {
      const currentUser = this.getCurrentUser();
    }

    return formData;

    function appendIfHasValue(key: string, value: any) {
      if (value) {
        formData.append(key, value);
      }
    }
  }

  protected handleAndGetData<T>(
    apiResponse: ApiResponse<T>,
    ignoreMessage: boolean = false,
  ): T {
    return this.handleApiResponse(
      apiResponse,
      ignoreMessage,
      this.getDataFromApiResponse,
    ) as T;
  }

  protected handleAndGetSuccess<T>(
    apiResponse: ApiResponse<T>,
    ignoreMessage: boolean = false,
  ): boolean {
    return this.handleApiResponse(
      apiResponse,
      ignoreMessage,
      this.getSuccessFromApiResponse,
    ) as boolean;
  }

  protected storeApiToken(tokens: AuthTokens) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.ApiToken, tokens.accessToken);
      localStorage.setItem(this.RefreshToken, tokens.refreshToken);
      const payload = JSON.parse(atob(tokens.accessToken.split(".")[1]));
      const expiricyTime = payload.exp * 1000;
      localStorage.setItem(this.ExpiricyTokenTime, expiricyTime.toString());
    }
  }

  protected removeApiToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.ApiToken);
      localStorage.removeItem(this.RefreshToken);
      localStorage.removeItem(this.ExpiricyTokenTime);
      localStorage.removeItem("current_user");
      localStorage.removeItem("muralExists");
    }
  }

  protected getCurrentUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.CurrentUser) ?? "null");
    }
    return null;
  }

  protected persistCurrentUser = (user: User) => {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.CurrentUser, JSON.stringify(user));
    }
  };

  protected removeCurrentUser = () => {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.CurrentUser);
    }
  };

  private handleApiResponse<T>(
    apiResponse: ApiResponse<T>,
    ignoreMessage: boolean,
    fn:
      | typeof this.getDataFromApiResponse
      | typeof this.getSuccessFromApiResponse,
  ): T | boolean {
    if (!ignoreMessage && apiResponse.success?.mensaje) {
      this.showNotification("success", apiResponse.success.mensaje);
    }

    return fn(apiResponse);
  }

  private showNotification(
    type: "success" | "error" | "info",
    message: string,
  ) {
    const actions: Record<string, (msg: string) => void> = {
      success: (msg) => this.toastMessageService.showSuccess(msg),
      error: (msg) => this.toastMessageService.showError(msg),
      info: (msg) => this.toastMessageService.showInfo(msg),
    };

    actions[type](message);
  }

  private getDataFromApiResponse<T>(apiResponse: ApiResponse<T>): T {
    return apiResponse.data;
  }

  private getSuccessFromApiResponse<T>(apiResponse: ApiResponse<T>): boolean {
    return apiResponse?.success != undefined;
  }

  protected saveToLocalStorage<TModel>(key: string, data: TModel) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  protected getFromLocalStorage<TModel>(key: string): TModel | null {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(key) ?? "null") as TModel;
    }
    return null;
  }
}
