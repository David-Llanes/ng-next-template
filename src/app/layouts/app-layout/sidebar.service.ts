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
  mobileActive?: boolean;
  overlayActive?: boolean;
}

interface SidebarConfig {
  mode?: 'static' | 'overlay';
  canCollapse?: boolean;
  rail?: boolean;
  initialStaticDesktopActive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly mediaQueryService = inject(MediaQueryService);

  readonly #defaultConfig: SidebarConfig = {
    mode: 'static',
    canCollapse: true,
    rail: true,
    initialStaticDesktopActive: false,
  };

  readonly #state: SidebarState = {
    staticDesktopActive: this.loadConfig().initialStaticDesktopActive,
    mobileActive: false,
    overlayActive: false,
  };

  public sidebarState = signal<SidebarState>(this.#state);
  public sidebarConfig = signal<SidebarConfig>(this.loadConfig());

  public isDesktop = computed(() => this.mediaQueryService.isDesktop());
  public isOverlay = computed(() => this.sidebarConfig().mode === 'overlay');
  public isStatic = computed(() => this.sidebarConfig().mode === 'static');

  public currentSidebarState = computed(() => {
    const { canCollapse } = this.sidebarConfig();
    const { staticDesktopActive, mobileActive, overlayActive } = this.sidebarState();
    const isDesktop = this.isDesktop();

    return untracked(() => {
      const isStaticMode = this.isStatic();
      const isOverlayMode = this.isOverlay();

      const staticInactive =
        !canCollapse && !staticDesktopActive && isStaticMode && isDesktop;
      const isMobile = isStaticMode && !isDesktop;

      return {
        isDesktopActive: isStaticMode && isDesktop && staticDesktopActive,
        isDesktopInactive: staticInactive,
        isDesktopCollapsed:
          canCollapse && !staticDesktopActive && isStaticMode && isDesktop,
        isMobile,
        isMobileActive: mobileActive && isMobile,
        isMobileInactive: !mobileActive && isMobile,
        isOverlay: isOverlayMode,
        isOverlayActive: isOverlayMode && overlayActive,
        isOverlayInactive: isOverlayMode && !overlayActive,
      };
    });
  });

  public isCollapsed = computed(() => this.currentSidebarState().isDesktopCollapsed);

  public isSidebarClosed = computed(() => {
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
              mobileActive: !this.sidebarState().mobileActive,
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

    this.sidebarState.update(prev => ({ ...prev, overlayActive: false }));
  }

  public setCollapseIntoIcons(value: boolean) {
    this.sidebarConfig.update(
      prev => ({ ...prev, canCollapse: value, mode: 'static' }) satisfies SidebarConfig
    );
  }

  public setInitialStaticDesktopActive(value: boolean) {
    this.sidebarConfig.update(
      prev =>
        ({
          ...prev,
          mode: 'static',
          initialStaticDesktopActive: value,
        }) satisfies SidebarConfig
    );
    this.sidebarState.update(prev => ({ ...prev, staticDesktopActive: value }));
  }

  public resetSidebarConfig() {
    this.sidebarConfig.set(this.#defaultConfig);
    this.sidebarState.set({
      staticDesktopActive: this.#defaultConfig.initialStaticDesktopActive,
      mobileActive: false,
      overlayActive: false,
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
      return this.#defaultConfig;
    }
  }
}
