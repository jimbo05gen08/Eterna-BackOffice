import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ToastMessageService } from "../services/toast-message.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastMessageService = inject(ToastMessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const body = error.error;
      const message =
        body?.error?.mensaje ||
        body?.message ||
        error.statusText ||
        "Error inesperado";

      toastMessageService.showError(message);

      return throwError(() => error);
    }),
  );
};
