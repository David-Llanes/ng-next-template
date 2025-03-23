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
          class="cursor-pointer rounded-lg bg-blue-300 p-1"
          (click)="this.sidebarService.setStaticMode()"
        >
          STATIC
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 p-1"
          (click)="this.sidebarService.setOverlayMode()"
        >
          OVERLAY
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 p-1"
          (click)="
            this.sidebarService.setCollapseIntoIcons(
              !this.sidebarService.sidebarConfig().collapse
            )
          "
        >
          COLLAPSE
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 p-1"
          (click)="
            this.sidebarService.setFloatingSidebar(
              !this.sidebarService.sidebarConfig().floating
            )
          "
        >
          FLOATING
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 p-1"
          (click)="this.sidebarService.setInitialStaticDesktopActive(true)"
        >
          I-OPEN
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 p-1"
          (click)="this.sidebarService.setInitialStaticDesktopActive(false)"
        >
          I-CLOSE
        </button>
        <button
          class="cursor-pointer rounded-lg bg-red-500 p-1 text-white"
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
