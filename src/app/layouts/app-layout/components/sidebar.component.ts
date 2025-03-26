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
    <aside class="bg-sidebar relative z-10 size-full overflow-hidden">
      @if (isCollapsed()) {
        <div class="font-bold text-red-500">Icons Here</div>
      } @else {
        <div class="text-nowrap">Sidebar Content Here</div>
      }
      <a routerLink="settings" class="cursor-pointer font-bold text-nowrap"
        >IR A SETTINGS</a
      >
    </aside>

    <button
      class="group absolute inset-y-0 left-full w-2.5 cursor-e-resize bg-transparent"
      [ngClass]="{ 'hover:bg-muted': isClosed() }"
      aria-details="Resize Sidebar"
      (click)="toggleSidebar()"
      aria-label="Alternar menu"
      title="Alternar menu"
    >
      <div
        class="group-hover:bg-border h-full w-px bg-transparent group-hover:w-[2px]"
      ></div>
    </button>

    @if (isOverlayActive()) {
      <button
        class="fixed inset-0 -z-10"
        (click)="toggleSidebar()"
        aria-label="Sidebar Overlay"
      >
        <div class="size-full bg-black/20"></div>
      </button>
    }
  `,
  styles: `
    :root {
      --sidebar-width: 250px;
      --sidebar-collapsed-width: 60px;
      --sidebar-transition: width 0.3s ease-out;
    }

    app-sidebar {
      transition: var(--sidebar-transition);
    }

    :is(.overlay, .sidebar-area, .static-inactive) {
      margin: 0;
      border-radius: 0;
    }

    :is(.static-active, .overlay.overlay-active, .mobile.mobile-active) {
      width: var(--sidebar-width) !important;
    }

    .mobile-active {
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
    class: 'isolate relative size-full',
    '[class.static-active]': 'sidebarClass()["static-active"]',
    '[class.static-inactive]': 'sidebarClass()["static-inactive"]',
    '[class.static-collapsed]': 'sidebarClass()["static-collapsed"]',
    '[class.static-floating]': 'sidebarClass()["static-floating"]',
    '[class.mobile]': 'sidebarClass()["mobile"]',
    '[class.mobile-active]': 'sidebarClass()["mobile-active"]',
    '[class.mobile-inactive]': 'sidebarClass()["mobile-inactive"]',
    '[class.overlay]': 'sidebarClass()["overlay"]',
    '[class.overlay-active]': 'sidebarClass()["overlay-active"]',
    '[class.overlay-inactive]': 'sidebarClass()["overlay-inactive"]',
  },
})
export class SidebarComponent implements OnInit {
  private sidebarService = inject(SidebarService);

  ngOnInit(): void {
    console.log('Sidebar initialized');
  }

  get isClosed() {
    return this.sidebarService.isClosed;
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
    console.log(this.sidebarService.sidebarState());
  }
}
