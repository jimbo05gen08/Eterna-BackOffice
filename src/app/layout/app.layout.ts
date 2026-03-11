import { Component, computed, effect, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppTopbar } from "./app.topbar/app.topbar.component";
import { AppFooter } from "./app.footer";
import { LayoutService } from "@/app/core/services/layout.service";
import { AppSidebar } from "./app.sidebar";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppFooter],
  template: `
    <div class="layout-wrapper" [ngClass]="containerClass()">
      <div class="layout-main-container">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>
        <div class="layout-main">
          <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
      </div>
    </div>
  `,
})
export class AppLayout {
  layoutService = inject(LayoutService);

  constructor() {
    effect(() => {
      const state = this.layoutService.layoutState();
      if (state.mobileMenuActive) {
        document.body.classList.add("blocked-scroll");
      } else {
        document.body.classList.remove("blocked-scroll");
      }
    });
  }

  containerClass = computed(() => {
    const config = this.layoutService.layoutConfig();
    const state = this.layoutService.layoutState();
    return {
      "layout-overlay": config.menuMode === "overlay",
      "layout-static": config.menuMode === "static",
      "layout-static-inactive":
        state.staticMenuDesktopInactive && config.menuMode === "static",
      "layout-overlay-active": state.overlayMenuActive,
      "layout-mobile-active": state.mobileMenuActive,
      "layout-sidebar-slim":
        !this.layoutService.layoutState().staticMenuDesktopInactive,
    };
  });
}
