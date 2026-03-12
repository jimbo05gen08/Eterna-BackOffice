import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutService } from "@/app/core/services/layout.service";

@Component({
  selector: "app-auth-layout",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./auth-layout.component.html",
  styleUrl: "./auth-layout.component.scss",
})
export class AuthLayoutComponent {
  @Input() title = "Bienvenido a Eterna BackOffice";
  @Input() subtitle = "";

  layoutService = inject(LayoutService);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
