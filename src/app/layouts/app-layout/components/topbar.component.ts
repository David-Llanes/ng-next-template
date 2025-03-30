import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { AppLayoutService } from '../app-layout.service';
import { SidebarService } from '../sidebar.service';
import { SidebarTogglerComponent } from './sidebar-toggler.component';

@Component({
  selector: 'app-topbar',
  imports: [SidebarTogglerComponent],
  template: `
    <header
      class="bg-background flex h-full items-center justify-between gap-4 px-4 py-2"
    >
      <div class="mr-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <button
          class="bg-primary cursor-pointer rounded-lg p-1"
          (click)="this.sidebarService.setStaticMode()"
        >
          STATIC
        </button>
        <button
          class="bg-primary cursor-pointer rounded-lg p-1"
          (click)="this.sidebarService.setOverlayMode()"
        >
          OVERLAY
        </button>
        <button
          class="bg-primary cursor-pointer rounded-lg p-1"
          (click)="
            this.sidebarService.setCollapseIntoIcons(
              !this.sidebarService.sidebarConfig().canCollapse
            )
          "
        >
          COLLAPSE
        </button>
        <button
          class="bg-primary cursor-pointer rounded-lg p-1"
          (click)="this.sidebarService.setInitialStaticDesktopActive(true)"
        >
          I-OPEN
        </button>
        <button
          class="bg-primary cursor-pointer rounded-lg p-1"
          (click)="this.sidebarService.setInitialStaticDesktopActive(false)"
        >
          I-CLOSE
        </button>
        <button
          class="bg-destructive cursor-pointer rounded-lg p-1"
          (click)="this.sidebarService.resetSidebarConfig()"
        >
          RESET
        </button>
        <button
          class="cursor-pointer rounded-lg bg-green-600 p-1 text-white"
          (click)="this.layoutService.setLayoutMode('col')"
        >
          COL
        </button>
        <button
          class="cursor-pointer rounded-lg bg-blue-700 p-1 text-white"
          (click)="this.layoutService.setLayoutMode('row')"
        >
          ROW
        </button>
        <button
          class="cursor-pointer rounded-lg bg-slate-700 p-1 text-white"
          (click)="this.layoutService.setDarkTheme()"
        >
          DARK
        </button>
        <button
          class="cursor-pointer rounded-lg bg-yellow-600 p-1 text-white"
          (click)="this.layoutService.setLightTheme()"
        >
          LIGHT
        </button>
        <app-sidebar-toggler />
      </div>
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'bg-background flex h-[var(--topbar-height)] w-full shrink-0 items-center border-b',
  },
})
export class TopbarComponent implements OnInit {
  sidebarService = inject(SidebarService);
  layoutService = inject(AppLayoutService);

  ngOnInit(): void {
    console.log('Topbar initialized');
  }
}
