import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SidebarService } from '../sidebar.service';
import { SidebarTogglerComponent } from './sidebar-toggler.component';

@Component({
  selector: 'app-topbar',
  imports: [SidebarTogglerComponent],
  template: `
    <header class="flex h-full items-center justify-end px-4 py-2">
      <div class="mr-2 flex items-center gap-2 text-xs font-semibold">
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="this.sidebarService.setStaticMode()"
        >
          STATIC
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="this.sidebarService.setOverlayMode()"
        >
          OVERLAY
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="
            this.sidebarService.setCollapseIntoIcons(
              !this.sidebarService.sidebarConfig().collapse
            )
          "
        >
          TOGGLE COLLAPSE
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="
            this.sidebarService.setFloatingSidebar(
              !this.sidebarService.sidebarConfig().floating
            )
          "
        >
          TOGGLE FLOATING
        </button>
        <button
          class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white"
          (click)="this.sidebarService.resetSidebarConfig()"
        >
          RESET
        </button>
      </div>
      <app-sidebar-toggler />
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  sidebarService = inject(SidebarService);
}
