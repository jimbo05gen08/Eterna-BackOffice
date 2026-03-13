import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from "@angular/core";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from "@angular/router";
import Aura from "@primeuix/themes/aura";
import { providePrimeNG } from "primeng/config";
import { appRoutes } from "./app.routes";
import { definePreset } from "@primeuix/themes";
import { MessageService } from "primeng/api";
import { authInterceptor } from "./app/core/interceptors/auth.interceptor";
import { errorInterceptor } from "./app/core/interceptors/error.interceptor";

const MiTemaPersonalizado = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#e6ebe9",
      100: "#cdd7d2",
      200: "#9bafa5",
      300: "#698779",
      400: "#385f4c",
      500: "#073620",
      600: "#06311d",
      700: "#052b19",
      800: "#042013",
      900: "#03160d",
      950: "#020b06",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.500}",
          inverseColor: "#ffffff",
          hoverColor: "{primary.600}",
          activeColor: "{primary.700}",
          highlightColor: "{primary.500}",
          highlightInverseColor: "#ffffff",
          contrastColor: "#ffffff",
        },
        surface: {
          50: "#f4f6f5",
          100: "#e9edea",
          200: "#d3dcd7",
          300: "#bdcbc4",
          400: "#a7bab1",
          500: "#91a99e",
          600: "#738a7f",
          700: "#566860",
          800: "#3a4540",
          900: "#1d2320",
          950: "#0e1110",
        },
      },
      dark: {
        primary: {
          color: "#eefbf2",
          inverseColor: "#ffffff",
          hoverColor: "{primary.300}",
          activeColor: "{primary.200}",
          highlightColor: "{primary.400}",
          highlightInverseColor: "#000000",
          contrastColor: "#000000",
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, authInterceptor]),
    ),
    provideZonelessChangeDetection(),
    providePrimeNG({
      theme: {
        preset: MiTemaPersonalizado,
        options: { darkModeSelector: ".app-dark" },
      },
    }),
  ],
};
