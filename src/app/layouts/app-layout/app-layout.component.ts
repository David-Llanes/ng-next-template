import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AppLayoutService } from './app-layout.service';
import { SidebarTogglerComponent } from './components/sidebar-toggler.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, NgClass, CommonModule, SidebarTogglerComponent, RouterLink],
  template: `
    <header class="topbar-area px-4 py-2">
      <app-sidebar-toggler />
    </header>
    <aside class="sidebar-area bg-slate-200" [ngClass]="sidebarClass()">
      <div *ngIf="!isSidebarCollapsed()">Sidebar Content Here</div>
      <div *ngIf="isSidebarCollapsed()" class="font-bold text-red-500">Icons Here</div>
      <a routerLink="settings" class="cursor-pointer font-bold text-nowrap"
        >IR A SETTINGS</a
      >
    </aside>
    <main class="main-area scrollbar-thin">
      <router-outlet />
    </main>
  `,
  styles: `
    .app-layout {
      display: grid;
      grid-template-areas:
        'sidebar topbar'
        'sidebar main';
      grid-template-rows: 60px 1fr;
      grid-template-columns: auto 1fr;

      .sidebar-area {
        grid-area: sidebar;

        width: 250px;
        margin: 0.5rem;
        border-radius: 0.5rem;

        position: relative;
        overflow: hidden;

        transition: all 0.3s;

        &.static {
          width: 250px;

          &.static-inactive {
            width: 0;
            margin: 0;
            border-radius: 0;
          }

          &.static-collapse {
            width: 60px;
          }
        }

        &.overlay {
          width: 0;
          margin: 0;
          border-radius: 0;

          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;

          &.overlay-active {
            width: 250px;
          }
        }
      }

      .topbar-area {
        grid-area: topbar;
      }

      .main-area {
        grid-area: main;
        overflow-x: hidden;
        overflow-y: auto;
      }
    }

    @media (width < 48rem) {
      .app-layout {
        grid-template-areas:
          'topbar'
          'sidebar'
          'main';
        grid-template-rows: 80px auto 1fr;
        grid-template-columns: unset;

        .sidebar-area {
          width: 0;
          margin: 0;
          border-radius: 0;

          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;

          transition: all 0.3s;

          &.mobile-active {
            width: 250px;
          }

          &.mobile-inactive {
            width: 0;
          }
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-layout h-svh max-h-svh overflow-hidden relative' },
})
export class AppLayoutComponent {
  private layoutService = inject(AppLayoutService);

  private layoutState = computed(() => this.layoutService.layoutState());
  private layoutConfig = computed(() => this.layoutService.layoutConfig());
  isSidebarCollapsed = computed(() => this.layoutService.isSidebarCollapsed());

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
