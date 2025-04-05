import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '@layouts/app-layout/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  template: `
    <div
      class="relative h-full w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:w-0 group-data-[mode=overlay]:fixed"
    ></div>
    <div
      class="fixed top-0 bottom-0 left-0 z-10 h-svh w-[var(--sidebar-width)] transition-[left,right,width,padding] duration-200 ease-linear *:overflow-hidden group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[layout=col]:top-[var(--topbar-height)] group-data-[layout=col]:h-[calc(100svh-var(--topbar-height))] group-data-[mode=overlay]:top-0 group-data-[mode=overlay]:h-full group-data-[mode=static]:group-data-[side=left]:border-r group-data-[mode=static]:group-data-[layout=row]:group-data-[state=expanded]:group-data-[variant=floating]:border-none group-data-[mode=static]:group-data-[layout=row]:group-data-[variant=inset]:border-none group-data-[layout=col]:md:!p-0 group-data-[mode=overlay]:md:!p-0 group-data-[state=collapsed]:md:!p-0 md:group-data-[state=expanded]:group-data-[variant=floating]:p-2 group-data-[variant=inset]:md:p-2"
    >
      <div
        data-sidebar="sidebar"
        class="bg-sidebar flex h-full w-full flex-col group-data-[layout=row]:group-data-[variant=floating]:group-data-[state=expanded]:shadow group-data-[layout=row]:group-data-[mode=static]:group-data-[state=expanded]:group-data-[variant=floating]:rounded-lg group-data-[layout=row]:group-data-[mode=static]:group-data-[state=expanded]:group-data-[variant=floating]:border"
      >
        <!-- HEADER -->
        <ng-content select="app-sidebar-header" />

        <!-- CONTENT -->
        <ng-content select="app-sidebar-content" />

        <!-- FOOTER -->
        <ng-content select="app-sidebar-footer" />

        <!-- OVERLAY BUTTON -->
        <button
          data-sidebar="overlay"
          aria-label="Close sidebar"
          tabindex="-1"
          title="Close sidebar"
          class="fixed -z-10 bg-black/50 group-data-[mode=overlay]:inset-0 group-data-[state=collapsed]:hidden"
          (click)="toggleSidebar()"
        ></button>

        <!-- RAIL BUTTON -->
        <button
          data-sidebar="rail"
          aria-label="Toggle sidebar"
          tabindex="-1"
          title="Toggle sidebar"
          class="hover:after:bg-sidebar-border group-data-[collapsible=offcanvas]:hover:bg-sidebar absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[collapsible=offcanvas]:translate-x-0 group-data-[side=left]:-right-4 group-data-[state=expanded]:-z-10 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[collapsible=offcanvas]:after:left-full sm:flex [[data-side=left]_&]:cursor-w-resize [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=left][data-state=collapsed]_&]:cursor-e-resize"
          (click)="toggleSidebar()"
        ></button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscapeKey()',
  },
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  onEscapeKey() {
    if (this.sidebarService.isOverlay() && this.sidebarService.isOverlayActive()) {
      this.toggleSidebar();
    }
  }
}
