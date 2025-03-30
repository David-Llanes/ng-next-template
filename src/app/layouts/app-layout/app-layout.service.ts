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

export type LayoutMode = 'col' | 'row';

export interface LayoutConfig {
  preset?: string;
  primary?: string;
  surface?: string | undefined | null;
  darkTheme?: boolean;
  layoutMode?: LayoutMode;
}

@Injectable({
  providedIn: 'root',
})
export class AppLayoutService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly #defaultConfig: LayoutConfig = {
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    layoutMode: 'row',
  };

  private initialized = false;

  public layoutConfig = signal<LayoutConfig>(this.loadConfig());
  public transitionComplete = signal<boolean>(false);

  public getPrimary = computed(() => this.layoutConfig().primary);
  public getSurface = computed(() => this.layoutConfig().surface);
  public isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  public layoutMode = computed(() => this.layoutConfig().layoutMode);

  constructor() {
    effect(() => {
      this.isDarkTheme();

      untracked(() => {
        const config = this.layoutConfig();

        // Si no se ha inicializado, no se hace la transicion
        if (!this.initialized || !config) {
          this.toggleDarkMode(config);
          this.initialized = true;
          return;
        }

        this.handleDarkModeTransition(config);
      });
    });

    // Guardar en el localStorage la configuracion
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

  public setLayoutMode(mode: LayoutMode) {
    this.layoutConfig.update(
      prev => ({ ...prev, layoutMode: mode }) satisfies LayoutConfig
    );
  }

  private loadConfig(): LayoutConfig {
    if (isPlatformBrowser(this.platformId)) {
      const storedConfig = localStorage.getItem('layoutConfig');
      return storedConfig ? JSON.parse(storedConfig) : this.#defaultConfig;
    } else {
      return this.#defaultConfig;
    }
  }

  public resetConfig() {
    this.layoutConfig.set(this.#defaultConfig);

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
      this.toggleDarkMode(config);
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
