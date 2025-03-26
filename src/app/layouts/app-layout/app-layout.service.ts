import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';

export interface LayoutConfig {
  preset?: string;
  primary?: string;
  surface?: string | undefined | null;
  darkTheme?: boolean;
  stickyHeader?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppLayoutService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _defaultConfig: LayoutConfig = {
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    stickyHeader: false,
  };

  private initialized = false;

  public layoutConfig = signal<LayoutConfig>(this.loadConfig());
  public transitionComplete = signal<boolean>(false);

  public theme = computed(() => (this.layoutConfig().darkTheme ? 'light' : 'dark'));
  public isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  public getPrimary = computed(() => this.layoutConfig().primary);
  public getSurface = computed(() => this.layoutConfig().surface);
  public stickyHeader = computed(() => this.layoutConfig().stickyHeader);

  constructor() {
    effect(() => {
      this.isDarkTheme();

      untracked(() => {
        const config = this.layoutConfig();

        // Sale antes de llamar a handleDarkModeTransition si no esta inicializado
        if (!this.initialized || !config) {
          this.toggleDarkMode(config);
          this.initialized = true;
          return;
        }

        this.handleDarkModeTransition(config);
      });
    });

    // Guardar en el localStorage la configuracion SOLO en el navegador
    effect(() => {
      const config = this.layoutConfig();

      untracked(() => {
        if (isPlatformBrowser(this.platformId)) {
          if (config) {
            localStorage.setItem('layoutConfig', JSON.stringify(config));
          }
        }
      });
    });
  }

  // public setFloatingMode(value: FloatingMode) {
  //   this.layoutConfig.update(
  //     prev => ({ ...prev, floatingMode: value }) satisfies LayoutConfig
  //   );
  // }

  public setStickyHeader(value: boolean) {
    this.layoutConfig.update(
      prev => ({ ...prev, stickyHeader: value }) satisfies LayoutConfig
    );
  }

  public setDarkTheme() {
    this.layoutConfig.update(
      prev => ({ ...prev, darkTheme: true }) satisfies LayoutConfig
    );
  }

  public setLightTheme() {
    this.layoutConfig.update(
      prev => ({ ...prev, darkTheme: false }) satisfies LayoutConfig
    );
  }

  private loadConfig(): LayoutConfig {
    if (isPlatformBrowser(this.platformId)) {
      const storedConfig = localStorage.getItem('layoutConfig');
      return storedConfig ? JSON.parse(storedConfig) : this._defaultConfig;
    } else {
      // En el servidor, devuelve la configuración por defecto
      return this._defaultConfig;
    }
  }

  public reset() {
    this.layoutConfig.set(this._defaultConfig);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('layoutConfig');
    }
  }

  public toggleDarkMode(config?: LayoutConfig): void {
    const _config = config || this.layoutConfig();

    if (isPlatformBrowser(this.platformId)) {
      if (_config.darkTheme) {
        document.documentElement.classList.add('app-dark');
      } else {
        document.documentElement.classList.remove('app-dark');
      }
    }
  }

  private handleDarkModeTransition(config: LayoutConfig): void {
    if (isPlatformBrowser(this.platformId)) {
      if ((document as any).startViewTransition) {
        this.startViewTransition(config);
      } else {
        this.toggleDarkMode(config);
        this.onTransitionEnd();
      }
    } else {
      // No hacer nada en el servidor
      this.toggleDarkMode(config); // Aplicar la clase aunque sea en el servidor para evitar inconsistencias iniciales
      this.onTransitionEnd();
    }
  }

  private startViewTransition(config: LayoutConfig): void {
    if (isPlatformBrowser(this.platformId)) {
      const transition = (document as any).startViewTransition(() => {
        this.toggleDarkMode(config);
      });

      transition.ready
        .then(() => {
          this.onTransitionEnd();
        })
        .catch(() => {});
    }
  }

  private onTransitionEnd() {
    this.transitionComplete.set(true);

    setTimeout(() => {
      this.transitionComplete.set(false);
    });
  }
}
