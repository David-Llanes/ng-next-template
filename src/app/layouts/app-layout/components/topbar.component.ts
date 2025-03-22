import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarTogglerComponent } from './sidebar-toggler.component';
import { AppLayoutService } from '../app-layout.service';

@Component({
  selector: 'app-topbar',
  imports: [SidebarTogglerComponent],
  template: `
    <header class="flex h-full items-center justify-end px-4 py-2">
      <div class="mr-2 flex items-center gap-2">
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="this.layoutService.setStaticMenuMode()"
        >
          STATIC
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="this.layoutService.setOverlayMenuMode()"
        >
          OVERLAY
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="
            this.layoutService.setCollapse(!this.layoutService.layoutConfig().collapse!)
          "
        >
          TOGGLE COLLAPSE
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-300 px-4 py-2"
          (click)="
            this.layoutService.setFloatingMenu(
              !this.layoutService.layoutConfig().floatingMenu!
            )
          "
        >
          TOGGLE FLOATING
        </button>
        <button
          class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white"
          (click)="this.layoutService.reset()"
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
  layoutService = inject(AppLayoutService);
}
