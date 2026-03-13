import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { UserService } from "../services/user.service";
import { MenuNode } from "@/app/shared/models/user";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem("api_token");

    if (token) {
      return true;
    }
  }

  router.navigate(["/auth/login"]);
  return false;
};

export const permissionGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const user = userService.getCurrentStoredUser();
  if (!user) {
    router.navigate(["/auth/login"]);
    return false;
  }

  const fullPath =
    "/" +
    route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.path).join("/"))
      .filter((p) => p)
      .join("/");

  const allNodes = [
    ...(user.menu.menu_items ?? []),
    ...(user.menu.config_items ?? []),
  ];
  const hasPermission = allNodes.some((node) => hasRoute(node, fullPath));

  if (!hasPermission) {
    router.navigate(["/forbidden"]);
    return false;
  }

  return true;
};

function hasRoute(node: MenuNode, path: string): boolean {
  if (node.ruta === path) return true;
  return node.children?.some((child) => hasRoute(child, path)) ?? false;
}
