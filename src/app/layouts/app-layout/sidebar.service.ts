import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';

import { MediaQueryService } from '@core/services';

interface SidebarState {
  staticDesktopActive?: boolean;
  staticMobileActive?: boolean;
  overlayActive?: boolean;
  hoverActive?: boolean;
}

interface SidebarConfig {
  mode?: 'static' | 'overlay';
  collapse?: boolean;
  rail?: boolean;
  initialStaticDesktopActive?: boolean;
  initialHoverActive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly mediaQueryService = inject(MediaQueryService);

  readonly #defaultConfig: SidebarConfig = {
    mode: 'static',
    collapse: true,
    rail: false,
    initialStaticDesktopActive: false,
    initialHoverActive: false,
  };

  readonly #state: SidebarState = {
    staticDesktopActive: this.loadConfig().initialStaticDesktopActive,
    staticMobileActive: false,
    overlayActive: false,
    hoverActive: this.loadConfig().initialHoverActive,
  };

  public sidebarState = signal<SidebarState>(this.#state);
  public sidebarConfig = signal<SidebarConfig>(this.loadConfig());

  public isDesktop = computed(() => this.mediaQueryService.isDesktop());
  public isOverlay = computed(() => this.sidebarConfig().mode === 'overlay');
  public isStatic = computed(() => this.sidebarConfig().mode === 'static');

  // DE AQUI SE SACA EL ESTADO ACTUAL DEL SIDEBAR PARA SUS DIFERENTES VARIANTES
  public currentSidebarState = computed(() => {
    const { mode, collapse } = this.sidebarConfig();
    const { overlayActive, staticDesktopActive, staticMobileActive } =
      this.sidebarState();
    const isDesktop = this.isDesktop();
    const isStaticMode = mode === 'static';
    const isOverlayMode = mode === 'overlay';

    const staticInactive = !collapse && !staticDesktopActive && isStaticMode && isDesktop;
    const isMobile = isStaticMode && !isDesktop;

    return {
      isDesktopActive: isStaticMode && isDesktop && staticDesktopActive,
      isDesktopInactive: staticInactive,
      isDesktopCollapsed: collapse && !staticDesktopActive && isStaticMode && isDesktop,
      isMobile,
      isMobileActive: staticMobileActive && isMobile,
      isMobileInactive: !staticMobileActive && isMobile,
      isOverlay: isOverlayMode,
      isOverlayActive: isOverlayMode && overlayActive,
      isOverlayInactive: isOverlayMode && !overlayActive,
    };
  });

  public isCollapsed = computed(() => this.currentSidebarState().isDesktopCollapsed);

  public isClosed = computed(() => {
    const { isDesktopActive, isDesktopCollapsed, isMobileActive, isOverlayActive } =
      this.currentSidebarState();

    return !isDesktopActive && !isDesktopCollapsed && !isMobileActive && !isOverlayActive;
  });

  public isOverlayActive = computed<boolean>(() => {
    const { isMobileActive, isOverlayActive } = this.currentSidebarState();

    return isMobileActive! || isOverlayActive!;
  });

  constructor() {
    // Guardar en el localStorage la configuracion SOLO en el navegador
    effect(() => {
      const config = this.sidebarConfig();

      untracked(() => {
        if (isPlatformBrowser(this.platformId)) {
          if (config) {
            localStorage.setItem('sidebarConfig', JSON.stringify(config));
          }
        }
      });
    });
  }

  public toggleSidebar() {
    if (this.isOverlay()) {
      // Si esta en modo overlay,
      this.sidebarState.update(
        prev =>
          ({
            ...prev,
            overlayActive: !this.sidebarState().overlayActive,
          }) satisfies SidebarState
      );
    }

    if (this.isStatic()) {
      if (this.isDesktop()) {
        // Si esta en modo static y es desktop
        this.sidebarState.update(
          prev =>
            ({
              ...prev,
              staticDesktopActive: !this.sidebarState().staticDesktopActive,
            }) satisfies SidebarState
        );
      } else {
        // Si esta en modo static y es mobile
        this.sidebarState.update(
          prev =>
            ({
              ...prev,
              staticMobileActive: !this.sidebarState().staticMobileActive,
            }) satisfies SidebarState
        );
      }
    }
  }

  public setStaticMode() {
    this.sidebarConfig.update(
      prev => ({ ...prev, mode: 'static' }) satisfies SidebarConfig
    );
  }

  public setOverlayMode() {
    this.sidebarConfig.update(
      prev => ({ ...prev, mode: 'overlay' }) satisfies SidebarConfig
    );
  }

  public setCollapseIntoIcons(value: boolean) {
    this.sidebarConfig.update(
      prev => ({ ...prev, collapse: value }) satisfies SidebarConfig
    );
  }

  public setInitialStaticDesktopActive(value: boolean) {
    this.sidebarConfig.update(
      prev => ({ ...prev, initialStaticDesktopActive: value }) satisfies SidebarConfig
    );
    this.sidebarState.update(prev => ({ ...prev, staticDesktopActive: value }));
  }

  public setInitialHoverActive(value: boolean) {
    this.sidebarConfig.update(
      prev => ({ ...prev, initialHoverActive: value }) satisfies SidebarConfig
    );
    this.sidebarState.update(prev => ({ ...prev, hoverActive: value }));
  }

  public resetSidebarConfig() {
    this.sidebarConfig.set(this.#defaultConfig);
    this.sidebarState.set({
      staticDesktopActive: this.#defaultConfig.initialStaticDesktopActive,
      staticMobileActive: false,
      overlayActive: false,
      hoverActive: this.#defaultConfig.initialHoverActive,
    });

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('sidebarConfig');
    }
  }

  private loadConfig(): SidebarConfig {
    if (isPlatformBrowser(this.platformId)) {
      const storedConfig = localStorage.getItem('sidebarConfig');
      return storedConfig ? JSON.parse(storedConfig) : this.#defaultConfig;
    } else {
      // En el servidor, devuelve la configuración por defecto
      return this.#defaultConfig;
    }
  }
}
