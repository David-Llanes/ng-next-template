import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppLayoutService } from '../app-layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  template: `
    <aside class="relative z-100 size-full bg-slate-100">
      @if (isSidebarCollapsed()) {
        <div class="font-bold text-red-500">Icons Here</div>
      } @else {
        <div class="text-nowrap">Sidebar Content Here</div>
      }
      <a routerLink="settings" class="cursor-pointer font-bold text-nowrap"
        >IR A SETTINGS</a
      >
    </aside>

    @if (isOpen) {
      <button class="fixed inset-0 -z-10 size-full bg-black/15" (click)="closeMenu()">
        <div></div>
      </button>
    }
  `,
  styles: `
    .sidebar-overlay {
      position: fixed;
      inset: 0;

      background-color: hsla(0, 0%, 0%, 0.5);

      @media (min-width: 768px) {
        display: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'isolate relative' },
})
export class SidebarComponent {
  private layoutService = inject(AppLayoutService);

  get isOpen() {
    return this.layoutService.isOverlayActive();
  }

  closeMenu() {
    this.layoutService.onMenuToggle();
    console.log(this.layoutService.layoutState());
  }

  isSidebarCollapsed = computed(() => this.layoutService.isSidebarCollapsed());
}
