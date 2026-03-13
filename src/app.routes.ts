import { Routes } from "@angular/router";
import { AppLayout } from "./app/layout/app.layout";
import { Notfound } from "./app/shared/components/notfound/notfound";
import { Forbidden } from "./app/shared/components/forbidden/forbidden";
import { authGuard, permissionGuard } from "./app/core/guards/auth.guard";

export const appRoutes: Routes = [
  {
    path: "",
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        canActivate: [permissionGuard],
        loadComponent: () => import("./app/pages/dashboard/dashboard"),
      },
      {
        path: "admin-servicios",
        children: [
          {
            path: "empresas",
            canActivate: [permissionGuard],
            loadComponent: () =>
              import("./app/pages/services-admin/company-management/company/company.component"),
          },
        ],
      },
      {
        path: "gestion-servicios",
        children: [
          {
            path: "transmisiones",
            children: [
              {
                path: "servicios",
                canActivate: [permissionGuard],
                loadComponent: () =>
                  import("./app/pages/services-management/streaming-management/service-list/service-list.component"),
              },
              {
                path: "camaras",
                canActivate: [permissionGuard],
                loadComponent: () =>
                  import("./app/pages/services-management/streaming-management/modules/modules.component"),
              },
            ],
          },
          {
            path: "salones-velatorios",
            children: [
              {
                path: "servicios",
                canActivate: [permissionGuard],
                loadComponent: () =>
                  import("./app/pages/services-management/funeral-halls-management/service-list/funeral-hall-service-list.component"),
              },
              {
                path: "salones",
                canActivate: [permissionGuard],
                loadComponent: () =>
                  import("./app/pages/services-management/funeral-halls-management/funeral-halls/funeral-halls.component"),
              },
            ],
          },
          {
            path: "cuentas-eterna",
            canActivate: [permissionGuard],
            loadComponent: () =>
              import("./app/pages/services-management/account-management/accounts/accounts.component"),
          },
        ],
      },
      {
        path: "configuracion",
        children: [
          {
            path: "gestion-perfil",
            canActivate: [permissionGuard],
            loadComponent: () =>
              import("./app/pages/configuration/profile-management/profile-management"),
          },
          {
            path: "gestion-usuario",
            canActivate: [permissionGuard],
            loadComponent: () =>
              import("./app/pages/configuration/user-management/user-management"),
          },
        ],
      },
      {
        path: "forbidden",
        component: Forbidden,
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () => import("./app/pages/auth/auth.routes"),
  },
  { path: "notfound", component: Notfound },
  { path: "**", redirectTo: "/notfound" },
];
