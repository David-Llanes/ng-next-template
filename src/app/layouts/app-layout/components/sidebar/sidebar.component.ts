import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  template: `
    <!-- This is what handles the sidebar gap on desktop  -->
    <div
      class="relative h-full w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:w-0 group-data-[mode=overlay]:fixed"
    ></div>
    <div
      class="fixed top-0 bottom-0 left-0 z-10 h-svh w-[var(--sidebar-width)] transition-[left,right,width,padding] duration-200 ease-linear *:overflow-hidden group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[layout=col]:top-[var(--topbar-height)] group-data-[layout=col]:h-[calc(100svh-var(--topbar-height))] group-data-[mode=overlay]:top-0 group-data-[mode=overlay]:h-full group-data-[mode=static]:group-data-[side=left]:border-r group-data-[layout=row]:group-data-[state=expanded]:group-data-[variant=floating]:border-none group-data-[layout=row]:group-data-[variant=inset]:border-none md:group-data-[layout=col]:!p-0 md:group-data-[mode=overlay]:!p-0 md:group-data-[state=collapsed]:!p-0 md:group-data-[state=expanded]:group-data-[variant=floating]:p-2 md:group-data-[variant=inset]:p-2"
    >
      <aside
        data-sidebar="sidebar"
        class="bg-sidebar flex size-full flex-col group-data-[layout=row]:group-data-[state=expanded]:group-data-[variant=floating]:shadow group-data-[layout=row]:group-data-[mode=static]:group-data-[state=expanded]:group-data-[variant=floating]:rounded-lg group-data-[layout=row]:group-data-[mode=static]:group-data-[state=expanded]:group-data-[variant=floating]:outline group-data-[layout=row]:group-data-[mode=static]:group-data-[state=expanded]:group-data-[variant=inset]:rounded-lg"
      >
        <!-- SIDEBAR (header, content y footer) -->
        <ng-content />

        <!-- OVERLAY BUTTON -->
        <button
          data-sidebar="overlay"
          aria-label="Close sidebar"
          [tabindex]="-1"
          title="Close sidebar"
          class="fixed inset-0 -z-10 hidden bg-black/50 group-data-[mode=overlay]:group-data-[state=expanded]:block"
          (click)="toggleSidebar()"
        ></button>

        <!-- RAIL BUTTON -->
        <button
          data-sidebar="rail"
          aria-label="Toggle sidebar"
          [tabindex]="-1"
          title="Toggle sidebar"
          class="hover:after:bg-sidebar-border group-data-[collapsible=offcanvas]:hover:bg-sidebar absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[collapsible=offcanvas]:translate-x-0 group-data-[side=left]:-right-4 group-data-[state=expanded]:-z-10 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[collapsible=offcanvas]:after:left-full sm:flex [[data-side=left]_&]:cursor-w-resize [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=left][data-state=collapsed]_&]:cursor-e-resize"
          (click)="toggleSidebar()"
        ></button>
      </aside>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: '--sidebar-padding-collapsed: 0.25rem; --sidebar-padding-expanded: 0.5rem;',
    '[style.--sidebar-padding]':
      'isCollapsed() ? "var(--sidebar-padding-collapsed)" : "var(--sidebar-padding-expanded)"',
    '[style.--icon-size]': 'isCollapsed()? "1.25rem" : "1.25rem"',
    '(document:keydown.escape)': 'onEscapeKey()',
  },
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);

  isCollapsed = this.sidebarService.isStaticCollapsed;

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  onEscapeKey() {
    if (this.sidebarService.isOverlay() && this.sidebarService.isOverlayActive()) {
      this.toggleSidebar();
    }
  }
}
