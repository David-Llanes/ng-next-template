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

export type Variant = 'sidebar' | 'inset' | 'floating';
export type Side = 'left' | 'right';
export type Mode = 'static' | 'overlay';

interface SidebarState {
  staticDesktopActive?: boolean;
  overlayActive?: boolean;
}

interface SidebarConfig {
  mode?: Mode;
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
    overlayActive: false,
  };

  public sidebarState = signal<SidebarState>(this.#state);
  public sidebarConfig = signal<SidebarConfig>(this.loadConfig());

  public isDesktop = computed(() => this.mediaQueryService.isDesktop());
  public isOverlay = computed(
    () => this.sidebarConfig().mode === 'overlay' || !this.isDesktop()
  );
  public isStatic = computed(
    () => this.sidebarConfig().mode === 'static' && this.isDesktop()
  );

  // STATE WHEN IS DESKTOP (STATIC)
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

  // STATE WHEN ITS OVERLAY OR MOBILE
  public isOverlayActive = computed(
    () => this.isOverlay() && this.sidebarState().overlayActive
  );
  public isOverlayOffCanvas = computed(
    () => this.isOverlay() && !this.sidebarState().overlayActive
  );

  constructor() {
    effect(() => {
      console.log('CONFIG', this.sidebarConfig());
    });

    effect(() => {
      console.log('STATE', this.sidebarState());
    });

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
      // Si esta en modo static y es desktop
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

  public setCollapseIntoIcons(value: boolean) {
    this.sidebarConfig.update(
      prev => ({ ...prev, canCollapse: value, mode: 'static' }) satisfies SidebarConfig
    );

    if (this.sidebarState().staticDesktopActive) {
      console.log('LA CERRE PARA QUE SE VEA COLAPSADA XD');
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
