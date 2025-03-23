import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  template: `
    <aside class="relative z-10 size-full bg-slate-100">
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
      <button class="fixed inset-0 bg-blue-500/50" (click)="closeMenu()">
        <div></div>
      </button>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'isolate relative',
    '[class.static-active]': 'sidebarClass()["static-active"]',
    '[class.static-inactive]': 'sidebarClass()["static-inactive"]',
    '[class.static-collapsed]': 'sidebarClass()["static-collapsed"]',
    '[class.static-floating]': 'sidebarClass()["static-floating"]',
    '[class.mobile-active]': 'sidebarClass()["mobile-active"]',
    '[class.mobile-inactive]': 'sidebarClass()["mobile-inactive"]',
    '[class.overlay]': 'sidebarClass()["overlay"]',
    '[class.overlay-active]': 'sidebarClass()["overlay-active"]',
    '[class.overlay-inactive]': 'sidebarClass()["overlay-inactive"]',
  },
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);

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
