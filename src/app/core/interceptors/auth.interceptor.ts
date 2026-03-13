import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap, catchError, EMPTY, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { User } from "@/app/shared/models/user";

const authSection = "Auth";

function getEmpresaId(): string | null {
  const raw = localStorage.getItem("current_user");
  if (!raw) return null;
  const user: User = JSON.parse(raw);
  return user.empresas?.[0]?.id?.toString() ?? null;
}

function buildHeaders(token: string): Record<string, string> {
  const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
  const empresaId = getEmpresaId();
  if (empresaId) {
    headers["X-Empresa-Id"] = empresaId;
  }
  return headers;
}

function clearTokensAndRedirect(router: Router) {
  localStorage.removeItem("api_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expiricy_token");
  router.navigate(["/auth/login"]);
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuthEndpoint = req.url.includes(authSection);

  if (isAuthEndpoint) {
    return next(req);
  }

  const token = localStorage.getItem("api_token");
  const expiricyTime = localStorage.getItem("expiricy_token");

  if (token && expiricyTime && Date.now() < Number(expiricyTime)) {
    const clonedReq = req.clone({
      setHeaders: buildHeaders(token),
    });
    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((tokens) => {
              const retryReq = req.clone({
                setHeaders: buildHeaders(tokens.accessToken),
              });
              return next(retryReq);
            }),
            catchError(() => {
              clearTokensAndRedirect(router);
              return EMPTY;
            }),
          );
        }
        return throwError(() => error);
      }),
    );
  }

  const refreshToken = localStorage.getItem("refresh_token");

  if (refreshToken) {
    return authService.refreshToken().pipe(
      switchMap((tokens) => {
        const clonedReq = req.clone({
          setHeaders: buildHeaders(tokens.accessToken),
        });
        return next(clonedReq);
      }),
      catchError(() => {
        clearTokensAndRedirect(router);
        return EMPTY;
      }),
    );
  }

  router.navigate(["/auth/login"]);
  return EMPTY;
};
