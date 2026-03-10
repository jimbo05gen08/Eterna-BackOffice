import { provideHttpClient, withFetch } from "@angular/common/http";
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

const MiTemaPersonalizado = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#e6ebe9",
      100: "#cdd7d2",
      200: "#9bafa5",
      300: "#698779",
      400: "#385f4c",
      500: "#073620", // Tu color principal
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
          contrastColor: "#ffffff", // <-- Esto asegura el texto blanco en botones
        },
        surface: {
          50: "#f4f6f5", // Fondos de página muy claros
          100: "#e9edea", // Fondos de componentes
          200: "#d3dcd7", // Bordes de inputs
          300: "#bdcbc4",
          400: "#a7bab1",
          500: "#91a99e",
          600: "#738a7f", // Texto secundario
          700: "#566860",
          800: "#3a4540",
          900: "#1d2320", // Texto principal (casi negro pero con matiz verde)
          950: "#0e1110", // Fondos en modo oscuro
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
          contrastColor: "#000000", // Texto blanco también en modo oscuro
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    providePrimeNG({
      theme: {
        preset: MiTemaPersonalizado,
        options: { darkModeSelector: ".app-dark" },
      },
    }),
  ],
};
