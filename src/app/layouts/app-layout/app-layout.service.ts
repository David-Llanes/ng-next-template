import { Injectable, computed, effect, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MediaQueryService } from '@core/services';

export interface LayoutConfig {
  preset?: string;
  primary?: string;
  surface?: string | undefined | null;
  darkTheme?: boolean;
  menuMode?: 'static' | 'overlay';
  collapse?: boolean;
  floatingMenu?: boolean;
}

interface LayoutState {
  staticMenuDesktopInactive?: boolean;
  overlayMenuActive?: boolean;
  staticMenuMobileActive?: boolean;
  menuHoverActive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppLayoutService {
  private readonly mediaQuery = inject(MediaQueryService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _defaultConfig: LayoutConfig = {
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'static',
    collapse: true,
    floatingMenu: false,
  };

  private readonly _state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  private initialized = false;

  public layoutConfig = signal<LayoutConfig>(this.loadConfig());
  public layoutState = signal<LayoutState>(this._state);

  public isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');
  public isStatic = computed(() => this.layoutConfig().menuMode === 'static');
  public isDesktop = computed(() => this.mediaQuery.isDesktop());

  public isOverlayActive = computed<boolean>(() => {
    if (this.isStatic()) {
      if (this.isDesktop()) {
        return false;
      }

      return !!this.layoutState().staticMenuMobileActive;
    } else if (this.isOverlay()) {
      return !!this.layoutState().overlayMenuActive;
    } else {
      return false;
    }
  });

  public isSidebarCollapsed = computed(
    () =>
      this.layoutState().staticMenuDesktopInactive &&
      this.layoutConfig().menuMode === 'static' &&
      this.layoutConfig().collapse &&
      this.isDesktop()
  );

  public theme = computed(() => (this.layoutConfig().darkTheme ? 'light' : 'dark'));
  public isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  public getPrimary = computed(() => this.layoutConfig().primary);
  public getSurface = computed(() => this.layoutConfig().surface);
  public transitionComplete = signal<boolean>(false);

  constructor() {
    effect(() => {
      const config = this.layoutConfig();

      // Sale antes de llamar a handleDarkModeTransition si no esta inicializado
      if (!this.initialized || !config) {
        this.initialized = true;
        return;
      }

      this.handleDarkModeTransition(config);
    });

    // Guardar en el localStorage la configuracion SOLO en el navegador
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const config = this.layoutConfig();

        if (config) {
          localStorage.setItem('layoutConfig', JSON.stringify(config));
        }
      }
    });
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

  public onMenuToggle() {
    if (this.isOverlay()) {
      // Si esta en modo overlay,
      this.layoutState.update(prev => ({
        ...prev,
        overlayMenuActive: !this.layoutState().overlayMenuActive,
      }));
    }

    if (this.isStatic()) {
      if (this.isDesktop()) {
        // Si esta en modo static y es desktop
        this.layoutState.update(prev => ({
          ...prev,
          staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive,
        }));
      } else {
        // Si esta en modo static y es mobile
        this.layoutState.update(prev => ({
          ...prev,
          staticMenuMobileActive: !this.layoutState().staticMenuMobileActive,
        }));
      }
    }
  }

  public reset() {
    this.layoutConfig.set(this._defaultConfig);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('layoutConfig'); // Clear local storage on reset SOLO en el navegador
    }
  }

  public setStaticMenuMode() {
    this.layoutConfig.update(prev => ({ ...prev, menuMode: 'static' }));
  }

  public setOverlayMenuMode() {
    this.layoutConfig.update(prev => ({ ...prev, menuMode: 'overlay' }));
  }

  public setCollapse(value: boolean) {
    this.layoutConfig.update(prev => ({ ...prev, collapse: value }));
  }

  public setFloatingMenu(value: boolean) {
    this.layoutConfig.update(prev => ({ ...prev, floatingMenu: value }));
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
