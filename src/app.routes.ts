import { Routes } from "@angular/router";
import { AppLayout } from "./app/layout/app.layout";
import { Dashboard } from "./app/pages/dashboard/dashboard";
import { Notfound } from "./app/shared/components/notfound/notfound";
import { authGuard } from "./app/core/guards/auth.guard";

export const appRoutes: Routes = [
  {
    path: "",
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: "", component: Dashboard },
      {
        path: "pages",
        loadChildren: () => import("./app/pages/pages.routes"),
      },
      {
        path: "company-management",
        children: [
          {
            path: "company",
            loadComponent: () =>
              import("./app/pages/company-management/company/company.component"),
          },
          {
            path: "company-services",
            loadComponent: () =>
              import("./app/pages/company-management/company-services/company-services"),
          },
        ],
      },
      {
        path: "streaming-management",
        children: [
          {
            path: "services",
            loadComponent: () =>
              import("./app/pages/streaming-management/service-list/service-list.component"),
          },
          {
            path: "modules",
            loadComponent: () =>
              import("./app/pages/streaming-management/modules/modules.component"),
          },
        ],
      },
      {
        path: "funeral-halls-management",
        children: [
          {
            path: "services",
            loadComponent: () =>
              import("./app/pages/funeral-halls-management/service-list/funeral-hall-service-list.component"),
          },
          {
            path: "funeral-halls",
            loadComponent: () =>
              import("./app/pages/funeral-halls-management/funeral-halls/funeral-halls.component"),
          },
        ],
      },
      {
        path: "account-management",
        children: [
          {
            path: "murals-list",
            loadComponent: () =>
              import("./app/pages/account-management/mural-list/mural-list.component"),
          },
          {
            path: "accounts",
            loadComponent: () =>
              import("./app/pages/account-management/accounts/accounts.component"),
          },
          {
            path: "digital-heir",
            loadComponent: () =>
              import("./app/pages/account-management/digital-heir/digital-heir.component"),
          },
        ],
      },
    ],
  },
  { path: "notfound", component: Notfound },
  {
    path: "auth",
    loadChildren: () => import("./app/pages/auth/auth.routes"),
  },
  { path: "**", redirectTo: "/notfound" },
];
