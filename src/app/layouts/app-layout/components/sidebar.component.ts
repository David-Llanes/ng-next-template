import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  template: `
    <div
      class="relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180"
    ></div>
    <div
      class="fixed top-0 bottom-0 left-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear *:overflow-hidden group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[mode=col]:!top-[var(--topbar-height)] group-data-[mode=col]:h-[calc(100svh-var(--topbar-height))] group-data-[side=left]:border-r group-data-[side=right]:border-l md:flex"
    >
      <div
        data-sidebar="sidebar"
        class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
      >
        <header data-sidebar="header" class="flex flex-col gap-2 p-2">HEADER</header>
        <nav
          data-sidebar="content"
          class="flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
        >
          NAV
        </nav>
        <button
          data-sidebar="rail"
          aria-label="Toggle Sidebar"
          tabindex="-1"
          title="Toggle Sidebar"
          class="hover:after:bg-sidebar-border group-data-[collapsible=offcanvas]:hover:bg-sidebar absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[collapsible=offcanvas]:translate-x-0 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[collapsible=offcanvas]:after:left-full sm:flex [[data-side=left]_&]:cursor-w-resize [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right]_&]:cursor-e-resize [[data-side=right][data-collapsible=offcanvas]_&]:-left-2 [[data-side=right][data-state=collapsed]_&]:cursor-w-resize"
          (click)="toggleSidebar()"
        ></button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group peer text-foreground hidden md:block',
    '[attr.data-variant]': 'dataVariant()',
    '[attr.data-side]': 'dataSide()',
    '[attr.data-state]': 'dataState()',
    '[attr.data-collapsible]': 'dataCollapsible()',
  },
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);

  // TODO: INCLUIR LOGICA PARA CONTROLAR ESTO DINAMICAMENTE
  dataVariant = computed(() => {
    return 'sidebar';
  });

  // TODO: INCLUIR LOGICA PARA CONTROLAR ESTO DINAMICAMENTE
  dataSide = computed(() => {
    return 'left';
  });

  dataState = computed(() => {
    const isExpanded = this.sidebarService.currentSidebarState().isDesktopActive;

    return isExpanded ? 'expanded' : 'collapsed';
  });

  dataCollapsible = computed(() => {
    const { isDesktopCollapsed, isDesktopInactive } =
      this.sidebarService.currentSidebarState();

    if (isDesktopCollapsed) return 'icon';

    if (isDesktopInactive) return 'offcanvas';

    return '';
  });

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
