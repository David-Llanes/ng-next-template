import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppLayoutService } from './app-layout.service';
import { SidebarComponent } from './components/sidebar.component';
import { TopbarComponent } from './components/topbar.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, NgClass, CommonModule, SidebarComponent, TopbarComponent],
  template: `
    <app-topbar class="topbar-area" />
    <app-sidebar class="sidebar-area bg-sky-100" [ngClass]="sidebarClass()" />
    <main class="main-area scrollbar-thin">
      <router-outlet />
    </main>
  `,
  styleUrl: './app-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-layout h-svh max-h-svh overflow-hidden relative isolate' },
})
export class AppLayoutComponent {
  private layoutService = inject(AppLayoutService);

  private layoutState = computed(() => this.layoutService.layoutState());
  private layoutConfig = computed(() => this.layoutService.layoutConfig());

  sidebarClass = computed(() => {
    const { menuMode, collapse } = this.layoutConfig();
    const { overlayMenuActive, staticMenuDesktopInactive, staticMenuMobileActive } =
      this.layoutState();
    const isDesktop = this.layoutService.isDesktop();
    const isStatic = menuMode === 'static';

    return {
      overlay: menuMode === 'overlay',
      'overlay-active': overlayMenuActive,
      static: isStatic && isDesktop,
      'static-inactive': !collapse && staticMenuDesktopInactive && isStatic && isDesktop,
      'static-collapse': collapse && staticMenuDesktopInactive && isStatic && isDesktop,
      'mobile-active': staticMenuMobileActive && isStatic && !isDesktop,
      'mobile-inactive': !staticMenuMobileActive && isStatic && !isDesktop,
    };
  });
}
