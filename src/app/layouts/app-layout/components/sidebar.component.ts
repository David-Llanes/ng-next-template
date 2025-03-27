import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgClass } from '@angular/common';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, NgClass],
  template: `
    <div
      id="sidebar"
      class="relative isolate size-full text-nowrap"
      [ngClass]="sidebarClass()"
    >
      <aside class="bg-sidebar flex size-full flex-col overflow-hidden">
        <header class="space-x-2 overflow-hidden p-2">HEADER XD</header>
        <div class="grow space-y-2 overflow-x-hidden overflow-y-auto p-2">
          @if (isCollapsed()) {
            <div class="font-bold text-red-500">Icons Here</div>
          } @else {
            @for (item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; track $index) {
              <div class="bg-muted h-20 w-full content-center rounded-2xl text-center">
                {{ item }}
              </div>
            }
          }
          <a routerLink="settings" class="cursor-pointer font-bold">IR A SETTINGS</a>
        </div>
        <footer class="space-x-2 overflow-hidden p-2">FOOTER</footer>
      </aside>

      <!-- SIDEBAR RAIL -->
      <button
        class="group absolute inset-y-0 left-full w-2.5 cursor-e-resize bg-transparent"
        [ngClass]="{ 'hover:bg-muted': isSidebarClosed() }"
        aria-details="Resize Sidebar"
        (click)="toggleSidebar()"
        aria-label="Alternar menu"
        title="Alternar menu"
      >
        <div
          class="group-hover:bg-border h-full w-px bg-transparent group-hover:w-[2px]"
        ></div>
      </button>

      <!-- SIDEBAR OVERLAY -->
      @if (isOverlayActive()) {
        <button
          class="fixed inset-0 -z-10"
          (click)="toggleSidebar()"
          aria-label="Sidebar Overlay"
        >
          <div class="size-full bg-black/20"></div>
        </button>
      }
    </div>
  `,
  styles: `
    :root {
      --sidebar-width: 250px;
      --sidebar-collapsed-width: 60px;
      --sidebar-transition: width 0.3s ease-out;
    }

    #sidebar {
      transition: var(--sidebar-transition);
    }

    :is(.overlay, .sidebar-area, .static-inactive) {
      margin: 0;
      border-radius: 0;
    }

    :is(.static-active, .overlay.overlay-active, .mobile.mobile-active) {
      width: var(--sidebar-width) !important;
    }

    :is(.static-inactive, .overlay.overlay-inactive, .mobile.mobile-inactive) {
      width: 0 !important;
    }

    .static-collapsed {
      width: var(--sidebar-collapsed-width);
    }

    .overlay,
    .mobile {
      width: 0 !important;
      position: fixed;
      inset-block: 0;
      left: 0;

      transition: var(--sidebar-transition);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'isolate relative block',
  },
})
export class SidebarComponent implements OnInit {
  private sidebarService = inject(SidebarService);

  ngOnInit(): void {
    console.log('Sidebar initialized');
  }

  get isSidebarClosed() {
    return this.sidebarService.isSidebarClosed;
  }

  get isOverlayActive() {
    return this.sidebarService.isOverlayActive;
  }

  get isCollapsed() {
    return this.sidebarService.isCollapsed;
  }

  public sidebarClass = computed(() => {
    const {
      isDesktopActive,
      isDesktopInactive,
      isDesktopCollapsed,
      isMobile,
      isMobileActive,
      isMobileInactive,
      isOverlay,
      isOverlayActive,
      isOverlayInactive,
    } = this.sidebarService.currentSidebarState();

    return {
      'static-active': isDesktopActive,
      'static-inactive': isDesktopInactive,
      'static-collapsed': isDesktopCollapsed,
      mobile: isMobile,
      'mobile-active': isMobileActive,
      'mobile-inactive': isMobileInactive,
      overlay: isOverlay,
      'overlay-active': isOverlayActive,
      'overlay-inactive': isOverlayInactive,
    };
  });

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
