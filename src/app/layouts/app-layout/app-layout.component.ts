import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayoutService } from './app-layout.service';
import { CommonModule, NgClass } from '@angular/common';
import { SidebarTogglerComponent } from './components/sidebar-toggler.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, NgClass, CommonModule, SidebarTogglerComponent],
  template: `
    <header class="topbar-area">
      <app-sidebar-toggler />
    </header>
    <aside
      class="sidebar-area bg-slate-200 outline outline-slate-300"
      [ngClass]="sidebarClass()"
    >
      <div *ngIf="!isSidebarCollapsed()">Sidebar Content Here</div>
      <div *ngIf="isSidebarCollapsed()" class="font-bold text-red-500">Icons Here</div>
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
        width: 250px;
        grid-area: sidebar;

        position: relative;
        overflow: hidden;

        transition: width 0.3s;

        &.static {
          width: 250px;
        }

        &.overlay {
          width: 0;

          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
        }

        &.overlay-active {
          width: 250px;
        }

        &.static-inactive {
          width: 0;
        }

        &.static-inactive.collapsed {
          width: 60px;
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

          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;

          transition: width 0.3s;

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

  isSidebarCollapsed = computed(
    () =>
      this.layoutState().staticMenuDesktopInactive &&
      this.layoutService.layoutConfig().menuMode === 'static'
  );

  sidebarClass = computed(() => {
    const { menuMode } = this.layoutConfig();
    const { overlayMenuActive, staticMenuDesktopInactive, staticMenuMobileActive } =
      this.layoutState();
    const isDesktop = this.layoutService.isDesktop();
    const isStatic = menuMode === 'static';

    return {
      overlay: menuMode === 'overlay',
      'overlay-active': overlayMenuActive,
      static: isStatic,
      'static-inactive': staticMenuDesktopInactive && isStatic && isDesktop,
      'mobile-active': staticMenuMobileActive && isStatic && !isDesktop,
      'mobile-inactive': !staticMenuMobileActive && isStatic && !isDesktop,
      collapsed: staticMenuDesktopInactive && isStatic && isDesktop,
    };
  });
}
