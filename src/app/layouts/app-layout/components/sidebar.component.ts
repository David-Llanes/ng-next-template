import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  template: `
    <aside class="bg-sidebar relative z-10 size-full">
      @if (isSidebarCollapsed()) {
        <div class="font-bold text-red-500">Icons Here</div>
      } @else {
        <div class="text-nowrap">Sidebar Content Here</div>
      }
      <a routerLink="settings" class="cursor-pointer font-bold text-nowrap"
        >IR A SETTINGS</a
      >
    </aside>

    @if (isOverlayActive()) {
      <button class="fixed inset-0 -z-10 bg-black/20" (click)="closeMenu()">
        <div></div>
      </button>
    }
  `,
  styles: `
    :root {
      --sidebar-width: 250px;
      --sidebar-collapsed-width: 60px;
      --sidebar-transition: all 0.3s ease-out;
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
      visibility: visible;
    }

    .mobile-active {
    }

    :is(.static-inactive, .overlay.overlay-inactive, .mobile.mobile-inactive) {
      width: 0 !important;
      visibility: hidden;
    }

    .static-collapsed {
      width: var(--sidebar-collapsed-width);
      visibility: visible;
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
    class: 'isolate relative overflow-hidden',
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
    console.log('INICIALIZAO');
  }

  get isOverlayActive() {
    return this.sidebarService.isOverlayActive;
  }

  get isSidebarCollapsed() {
    return this.sidebarService.isSidebarCollapsed;
  }

  get sidebarClass() {
    return this.sidebarService.sidebarClass;
  }

  closeMenu() {
    this.sidebarService.toggleSidebar();
    console.log(this.sidebarService.sidebarState());
  }
}
