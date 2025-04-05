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

import { MediaQueryService } from '@core/services/media-query.service';

export type DataState = 'collapsed' | 'expanded';
export type DataCollapsible = 'icon' | 'offcanvas' | '';
export type Variant = 'sidebar' | 'inset' | 'floating';
export type Side = 'left' | 'right';
export type Mode = 'static' | 'overlay';

interface SidebarState {
  staticDesktopActive?: boolean;
  overlayActive?: boolean;
}

interface SidebarConfig {
  mode?: Mode;
  variant?: Variant;
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
    variant: 'sidebar',
    canCollapse: true,
    rail: true,
    initialStaticDesktopActive: true,
  };

  readonly #state: SidebarState = {
    staticDesktopActive: this.loadConfig().initialStaticDesktopActive,
    overlayActive: false,
  };

  public sidebarState = signal<SidebarState>(this.#state);
  public sidebarConfig = signal<SidebarConfig>(this.loadConfig());

  public isDesktop = computed(() => this.mediaQueryService.isDesktop());

  // CONFIG SIGNALS
  public isStaticMode = computed(() => this.sidebarConfig().mode === 'static');
  public isOverlayMode = computed(() => this.sidebarConfig().mode === 'overlay');
  public variant = computed(() => this.sidebarConfig().variant);
  public canCollapse = computed(() => this.sidebarConfig().canCollapse);
  public initiallyOpen = computed(() => this.sidebarConfig().initialStaticDesktopActive);

  // SIDEBAR STATE SIGALS (START)
  public isStatic = computed(() => this.isStaticMode() && this.isDesktop());
  public isOverlay = computed(() => this.isOverlayMode() || !this.isDesktop());

  public isStaticActive = computed(
    () => this.isStatic() && this.sidebarState().staticDesktopActive
  );

  public isStaticOffCanvas = computed(
    () =>
      this.isStatic() &&
      !this.sidebarState().staticDesktopActive &&
      !this.sidebarConfig().canCollapse
  );

  public isStaticCollapsed = computed(
    () =>
      this.isStatic() &&
      !this.sidebarState().staticDesktopActive &&
      this.sidebarConfig().canCollapse
  );

  public isOverlayActive = computed(
    () => this.isOverlay() && this.sidebarState().overlayActive
  );

  public isOverlayOffCanvas = computed(
    () => this.isOverlay() && !this.sidebarState().overlayActive
  );
  // SIDEBAR STATE SIGALS (END)

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
    // OVERLAY MODE O EN PANTALLAS CHICAS
    if (this.isOverlay()) {
      this.sidebarState.update(
        prev =>
          ({
            ...prev,
            overlayActive: !this.sidebarState().overlayActive,
          }) satisfies SidebarState
      );
    }

    // DESKTOP EN STATIC MODE
    if (this.isStatic()) {
      this.sidebarState.update(
        prev =>
          ({
            ...prev,
            staticDesktopActive: !this.sidebarState().staticDesktopActive,
          }) satisfies SidebarState
      );
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

  public setVariant(value: Variant) {
    this.sidebarConfig.update(
      prev => ({ ...prev, variant: value }) satisfies SidebarConfig
    );
  }

  public setCollapseIntoIcons(value: boolean) {
    this.sidebarConfig.update(
      prev => ({ ...prev, canCollapse: value, mode: 'static' }) satisfies SidebarConfig
    );

    if (this.sidebarState().staticDesktopActive && this.sidebarConfig().canCollapse) {
      this.sidebarState.update(prev => ({ ...prev, staticDesktopActive: false }));
    }
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
      overlayActive: false,
    });
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
