import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap, catchError, EMPTY } from "rxjs";
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
    return next(clonedReq);
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
        localStorage.removeItem("api_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expiricy_token");
        router.navigate(["/auth/login"]);
        return EMPTY;
      }),
    );
  }

  router.navigate(["/auth/login"]);
  return EMPTY;
};
