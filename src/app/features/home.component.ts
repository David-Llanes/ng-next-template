import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppLayoutService, SidebarService } from '@layouts/index';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="wrapper grid gap-6 py-6 text-black">
      <!-- LAYOUT MODE -->
      <section class="relative flex flex-col gap-6 rounded-lg border p-4">
        <button
          class="bg-destructive/50 ring-destructive absolute top-4 right-4 size-16 cursor-pointer rounded-lg text-xs font-semibold text-white ring-2 disabled:opacity-30"
          (click)="layoutService.resetConfig()"
        >
          RESET
        </button>

        <div>
          <h2 class="mb-4 font-semibold">Layout Mode</h2>
          <div class="flex items-center gap-3">
            <button
              class="size-16 cursor-pointer rounded-lg bg-teal-300 text-xs font-semibold ring-2 ring-teal-500 disabled:opacity-30"
              [disabled]="layoutService.layoutMode() === 'row'"
              (click)="layoutService.setLayoutMode('row')"
            >
              Row
            </button>
            <button
              class="size-16 cursor-pointer rounded-lg bg-pink-300 text-xs font-semibold ring-2 ring-pink-500 disabled:opacity-30"
              [disabled]="layoutService.layoutMode() === 'col'"
              (click)="layoutService.setLayoutMode('col')"
            >
              Col
            </button>
          </div>
        </div>
        <div>
          <h2 class="mb-4 font-semibold">Theme</h2>
          <div class="flex items-center gap-3">
            <button
              class="size-16 cursor-pointer rounded-lg bg-gray-300 text-xs font-semibold ring-2 ring-gray-500 disabled:opacity-30"
              [disabled]="layoutService.isDarkTheme()"
              (click)="layoutService.setDarkTheme()"
            >
              Dark
            </button>
            <button
              class="size-16 cursor-pointer rounded-lg bg-yellow-300 text-xs font-semibold ring-2 ring-yellow-500 disabled:opacity-30"
              [disabled]="!layoutService.isDarkTheme()"
              (click)="layoutService.setLightTheme()"
            >
              Light
            </button>
          </div>
        </div>
      </section>

      <!-- SIDEBAR CONFIG -->
      <section class="relative flex flex-col gap-6 rounded-lg border p-4">
        <button
          class="bg-destructive/50 ring-destructive absolute top-4 right-4 size-16 cursor-pointer rounded-lg text-xs font-semibold text-white ring-2 disabled:opacity-30"
          (click)="sidebarService.resetSidebarConfig()"
        >
          RESET
        </button>

        <!-- SIDEBAR MODE -->
        <div>
          <h2 class="mb-4 font-semibold">Sidebar Mode</h2>
          <div class="flex items-center gap-3">
            <button
              class="size-16 cursor-pointer rounded-lg bg-purple-300 text-xs font-semibold ring-2 ring-purple-500 disabled:opacity-30"
              [disabled]="sidebarService.isStaticMode()"
              (click)="sidebarService.setStaticMode()"
            >
              Static
            </button>
            <button
              class="size-16 cursor-pointer rounded-lg bg-orange-300 text-xs font-semibold ring-2 ring-orange-500 disabled:opacity-30"
              [disabled]="sidebarService.isOverlayMode()"
              (click)="sidebarService.setOverlayMode()"
            >
              Overlay
            </button>
          </div>
        </div>

        <!-- SIDEBAR VARIANTS -->
        <div>
          <h2 class="mb-4 font-semibold">Sidebar Variants</h2>
          <div class="flex items-center gap-3">
            <button
              class="size-16 cursor-pointer rounded-lg bg-blue-300 text-xs font-semibold ring-2 ring-blue-500 disabled:opacity-30"
              [disabled]="sidebarService.variant() === 'sidebar'"
              (click)="sidebarService.setVariant('sidebar')"
            >
              Sidebar
            </button>
            <button
              class="size-16 cursor-pointer rounded-lg bg-red-300 text-xs font-semibold ring-2 ring-red-500 disabled:opacity-30"
              [disabled]="sidebarService.variant() === 'floating'"
              (click)="sidebarService.setVariant('floating')"
            >
              Floating
            </button>
            <button
              class="size-16 cursor-pointer rounded-lg bg-green-300 text-xs font-semibold ring-2 ring-green-500 disabled:opacity-30"
              [disabled]="sidebarService.variant() === 'inset'"
              (click)="sidebarService.setVariant('inset')"
            >
              Inset
            </button>
          </div>
        </div>

        <!-- SIDEBAR CONFIG -->
        <div>
          <h2 class="mb-4 font-semibold">Sidebar Confg</h2>
          <div>
            <div class="flex items-center gap-3">
              <button
                class="size-16 cursor-pointer rounded-lg bg-yellow-300 text-xs font-semibold ring-2 ring-yellow-500 disabled:opacity-30"
                [disabled]="sidebarService.canCollapse()"
                (click)="sidebarService.setCollapseIntoIcons(true)"
              >
                Collapse into icons
              </button>
              <button
                class="size-16 cursor-pointer rounded-lg bg-gray-300 text-xs font-semibold ring-2 ring-gray-500 disabled:opacity-30"
                [disabled]="!sidebarService.canCollapse()"
                (click)="sidebarService.setCollapseIntoIcons(false)"
              >
                Collapse none
              </button>
              <button
                class="size-16 cursor-pointer rounded-lg bg-slate-300 text-xs font-semibold ring-2 ring-slate-500 disabled:opacity-30"
                [disabled]="sidebarService.initiallyOpen()"
                (click)="sidebarService.setInitialStaticDesktopActive(true)"
              >
                Initially Open
              </button>
              <button
                class="size-16 cursor-pointer rounded-lg bg-zinc-300 text-xs font-semibold ring-2 ring-zinc-500 disabled:opacity-30"
                [disabled]="!sidebarService.initiallyOpen()"
                (click)="sidebarService.setInitialStaticDesktopActive(false)"
              >
                Initially Closed
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  layoutService = inject(AppLayoutService);
  sidebarService = inject(SidebarService);
}
